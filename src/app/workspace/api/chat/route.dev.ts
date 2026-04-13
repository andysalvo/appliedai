// src/app/workspace/api/chat/route.ts
import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { buildSystemPrompt } from '../../lib/system-prompt'
import { getToolDefinitions, executeTool } from '../../lib/tools'
import type { AccessTier } from '../../lib/types'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null
const MAX_HISTORY = 20

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production' || !openai) {
    return Response.json({ error: 'Not available' }, { status: 404 })
  }

  try {
    const { messages, tier = 'contributor' } = (await req.json()) as {
      messages: { role: string; content: string }[]
      tier?: AccessTier
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response('Please send a message.', { status: 400 })
    }

    const recentMessages = messages.slice(-MAX_HISTORY)
    const systemPrompt = buildSystemPrompt(tier)
    const tools = getToolDefinitions(tier)

    const encoder = new TextEncoder()
    let fullResponse = ''

    const readable = new ReadableStream({
      async start(controller) {
        const send = (event: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
        }

        // Initial completion with tool support
        let completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          temperature: 0.3,
          max_tokens: 600,
          stream: false,
          tools,
          messages: [
            { role: 'system', content: systemPrompt },
            ...recentMessages.map((m) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
          ],
        })

        let choice = completion.choices[0]

        // Handle tool calls in a loop (agent may call multiple tools)
        while (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
          const toolCalls = choice.message.tool_calls
          const toolMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: 'system', content: systemPrompt },
            ...recentMessages.map((m) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
            choice.message,
          ]

          for (const tc of toolCalls.filter((t) => t.type === 'function')) {
            const fn = (tc as Extract<typeof tc, { type: 'function' }>).function
            const args = JSON.parse(fn.arguments)
            send({ type: 'tool_call', toolName: fn.name })

            let result: string
            try {
              result = executeTool(fn.name, args)
            } catch (e) {
              result = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`
            }

            send({ type: 'tool_result', toolName: fn.name, toolResult: result })

            toolMessages.push({
              role: 'tool',
              tool_call_id: tc.id,
              content: result,
            })
          }

          // Get the next response after tool execution
          completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            max_tokens: 600,
            stream: false,
            tools,
            messages: toolMessages,
          })

          choice = completion.choices[0]
        }

        // Stream the final text response
        if (choice.message.content) {
          // Re-run as streaming for smooth text output
          const stream = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0.3,
            max_tokens: 600,
            stream: true,
            messages: [
              {
                role: 'system',
                content:
                  'Repeat the following message exactly, word for word. Do NOT add anything. Do NOT mention training data, cutoff dates, or model information. Output ONLY the message below:\n\n' +
                  choice.message.content,
              },
              { role: 'user', content: 'Go.' },
            ],
          })

          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content
            if (text) {
              fullResponse += text
              send({ type: 'text', text })
            }
          }
        }

        send({ type: 'done' })
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Workspace chat error:', error)
    return Response.json({ message: 'Something went wrong. Try again.' }, { status: 500 })
  }
}
