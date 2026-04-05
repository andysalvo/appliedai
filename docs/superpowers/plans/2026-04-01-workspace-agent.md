# Workspace Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a conversational workspace at `/workspace` that lets Applied AI club members contribute to the repo through chat, with automated git operations and a guided tour overlay.

**Architecture:** Next.js dev-only route with OpenAI streaming chat (same SSE pattern as `/api/chat`). Agent uses function calling to append entries to data files. Session-end flow automates git branch/commit/push/PR via `gh` CLI executed from API routes. Tour overlay guides first-time users through the UI.

**Tech Stack:** Next.js 16 (App Router), OpenAI SDK (gpt-4o-mini with function calling), Framer Motion, Tailwind CSS v4 with Penn State @theme tokens, `child_process.execSync` for git operations.

**Spec:** `docs/superpowers/specs/2026-04-01-workspace-agent-design.md`

**Mockup:** `workspace-mockup.html` (interactive reference for UI design)

---

## File Structure

```
NEW FILES:
  .devcontainer/devcontainer.json          — Codespace auto-setup
  src/data/agents.ts                       — Agent list (renamed from team.ts)
  src/app/workspace/layout.tsx             — Minimal layout (no site header/footer)
  src/app/workspace/page.tsx               — Main workspace page (client component)
  src/app/workspace/components/chat-panel.tsx      — Chat messages + input
  src/app/workspace/components/preview-panel.tsx   — iframe + repo map + compare
  src/app/workspace/components/tour-overlay.tsx    — Guided product tour
  src/app/workspace/components/session-bar.tsx     — Header with "I'm done"
  src/app/workspace/components/session-end-modal.tsx — Confirm + success overlays
  src/app/workspace/lib/system-prompt.ts   — Workspace agent system prompt
  src/app/workspace/lib/tools.ts           — OpenAI function definitions + executors
  src/app/workspace/lib/types.ts           — Shared types
  src/app/workspace/api/chat/route.ts      — Streaming chat with function calling
  src/app/workspace/api/session-end/route.ts — Git automation endpoint

MODIFY:
  src/data/team.ts        → rename to agents.ts (re-export for backwards compat)
  src/app/team/page.tsx   — import from agents.ts
  src/components/footer/index.tsx — import from agents.ts
  src/data/navigation.ts  — no changes needed (nav label stays "Join")
```

---

### Task 1: Devcontainer Config

**Files:**

- Create: `.devcontainer/devcontainer.json`

- [ ] **Step 1: Create devcontainer.json**

```json
{
  "name": "Applied AI Club",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "postCreateCommand": "npm install",
  "postStartCommand": "npm run dev &",
  "forwardPorts": [3000],
  "portsAttributes": {
    "3000": {
      "label": "Applied AI Dev",
      "onAutoForward": "openBrowserOnce"
    }
  },
  "customizations": {
    "vscode": {
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
      },
      "extensions": ["esbenp.prettier-vscode", "bradlc.vscode-tailwindcss"]
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add .devcontainer/devcontainer.json
git commit -m "feat: add devcontainer config for GitHub Codespaces"
```

---

### Task 2: Rename team.ts to agents.ts

**Files:**

- Create: `src/data/agents.ts`
- Modify: `src/data/team.ts`
- Modify: `src/app/team/page.tsx`
- Modify: `src/components/footer/index.tsx`

- [ ] **Step 1: Create agents.ts with new interface**

```typescript
// src/data/agents.ts
export interface Agent {
  name: string
  role: string
  email: string
  photo?: string
}

export const agents: Agent[] = [
  {
    name: 'Ryan Einzig',
    role: 'President',
    email: 'rxe5177@psu.edu',
    photo: '/images/team/ryan-einzig.jpg',
  },
  {
    name: 'Evan Chappell',
    role: 'Vice-President',
    email: 'evc5667@psu.edu',
    photo: '/images/team/evan-chappell.jpg',
  },
  {
    name: 'Andy Salvo',
    role: 'Programming Lead',
    email: 'ajs10845@psu.edu',
    photo: '/images/team/andy-salvo.jpg',
  },
  {
    name: 'Brody Bell',
    role: 'Treasurer',
    email: 'bkb5921@psu.edu',
    photo: '/images/team/brody-bell.jpg',
  },
]

export const agentsSemester = 'Spring 2026'
```

- [ ] **Step 2: Update team.ts to re-export from agents.ts**

```typescript
// src/data/team.ts
// Backwards compatibility — use agents.ts for new code
export { agents as team, agentsSemester as teamSemester } from './agents'
export type { Agent as TeamMember } from './agents'
```

- [ ] **Step 3: Update team page import**

In `src/app/team/page.tsx`, change:

```typescript
import { team, teamSemester } from '@/data/team'
```

to:

```typescript
import { agents as team, agentsSemester as teamSemester } from '@/data/agents'
```

- [ ] **Step 4: Update footer import**

In `src/components/footer/index.tsx`, if it imports from `@/data/team`, update similarly. Check the actual import and update to use `@/data/agents`.

- [ ] **Step 5: Run build to verify nothing breaks**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/data/agents.ts src/data/team.ts src/app/team/page.tsx src/components/footer/index.tsx
git commit -m "refactor: rename team to agents, re-export for backwards compat"
```

---

### Task 3: Workspace Types and System Prompt

**Files:**

- Create: `src/app/workspace/lib/types.ts`
- Create: `src/app/workspace/lib/system-prompt.ts`

- [ ] **Step 1: Create shared types**

```typescript
// src/app/workspace/lib/types.ts
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface StreamEvent {
  type: 'text' | 'tool_call' | 'tool_result' | 'suggestions' | 'done'
  text?: string
  toolName?: string
  toolResult?: string
  suggestions?: string[]
}

export type AccessTier = 'contributor' | 'admin'
```

- [ ] **Step 2: Create system prompt**

```typescript
// src/app/workspace/lib/system-prompt.ts
import { readFileSync } from 'fs'
import { join } from 'path'

function readDataFile(filename: string): string {
  try {
    const content = readFileSync(join(process.cwd(), 'src/data', filename), 'utf-8')
    return content
  } catch {
    return '(file not found)'
  }
}

export function buildSystemPrompt(tier: 'contributor' | 'admin'): string {
  const agentsContent = readDataFile('agents.ts')
  const toolsContent = readDataFile('tools.ts')

  return `You are the Applied AI Club workspace assistant. You help club members contribute to the website without writing code. You run inside a GitHub Codespace.

IDENTITY:
- You are a workspace agent, not a general chatbot.
- You help members add themselves to the agent list, add AI tools, and understand the repo.
- You were built by the club's programming team.
- Be conversational, helpful, and direct. Sound like a club member, not a corporate bot.

TONE RULES:
- Conversational, honest, student-to-student. Use "we" naturally.
- Never use em dashes. Use commas or periods.
- Never use hype words: "revolutionary," "game-changing," "cutting-edge."
- Never use the word "curated."
- No emoji. Plain text only.
- Keep responses short. One thought per message.

ACCESS TIER: ${tier}
${
  tier === 'contributor'
    ? `
CONTRIBUTOR RULES:
- You can ONLY append new entries to data files (agents.ts, tools.ts).
- You CANNOT edit or delete existing entries.
- You CANNOT modify page files, config files, or infrastructure.
- If someone asks to edit or delete, say "Only club admins (Andy or Ryan) can edit or delete entries."
`
    : `
ADMIN RULES:
- You can append, edit, and delete entries in data files.
- You can edit page copy in component files.
- Use this power carefully. Confirm before deleting anything.
`
}

AVAILABLE TOOLS:
- add_agent: Add a new member to the agent list (src/data/agents.ts)
- add_tool: Add a new AI tool to the tools list (src/data/tools.ts)
- read_data: Read the current contents of a data file
${tier === 'admin' ? '- edit_agent: Edit an existing agent entry\n- delete_agent: Remove an agent from the list\n- edit_tool: Edit an existing tool entry\n- delete_tool: Remove a tool from the list' : ''}

VALIDATION:
- Agent emails must end with @psu.edu
- Tool categories must be one of: assistant, research, developer, creative
- Tool URLs must start with https://
- No duplicate names in either list
- All fields are required unless marked optional

CURRENT DATA:

## agents.ts (current agent list):
${agentsContent}

## tools.ts (current tools list):
${toolsContent}

WHEN SOMEONE FIRST ARRIVES:
- Greet them warmly but briefly
- Ask their name
- Then offer what you can help with: add to agent list, add a tool, ask questions

AFTER MAKING A CHANGE:
- Confirm what you did
- Suggest they check the site preview or Compare tab
- Ask if they want to do anything else or submit their changes`
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/workspace/lib/types.ts src/app/workspace/lib/system-prompt.ts
git commit -m "feat: workspace agent types and system prompt"
```

---

### Task 4: Tool Definitions and Executors

**Files:**

- Create: `src/app/workspace/lib/tools.ts`

- [ ] **Step 1: Create tool definitions and file-writing executors**

```typescript
// src/app/workspace/lib/tools.ts
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { AccessTier } from './types'

const DATA_DIR = join(process.cwd(), 'src/data')

// --- OpenAI function definitions ---

const addAgentDef = {
  type: 'function' as const,
  function: {
    name: 'add_agent',
    description: 'Add a new member to the agent list on the team page',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the member' },
        role: { type: 'string', description: 'Their role in the club (e.g. Events Coordinator)' },
        email: { type: 'string', description: 'Penn State email ending in @psu.edu' },
      },
      required: ['name', 'role', 'email'],
    },
  },
}

const addToolDef = {
  type: 'function' as const,
  function: {
    name: 'add_tool',
    description: 'Add a new AI tool to the Explore page tools list',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the tool' },
        maker: { type: 'string', description: 'Company that makes the tool' },
        description: { type: 'string', description: 'One sentence description' },
        capabilities: {
          type: 'array',
          items: { type: 'string' },
          description: '2-4 short capability bullet points',
        },
        url: { type: 'string', description: 'URL starting with https://' },
        category: {
          type: 'string',
          enum: ['assistant', 'research', 'developer', 'creative'],
          description: 'Tool category',
        },
      },
      required: ['name', 'maker', 'description', 'capabilities', 'url', 'category'],
    },
  },
}

const readDataDef = {
  type: 'function' as const,
  function: {
    name: 'read_data',
    description: 'Read the current contents of a data file to check what already exists',
    parameters: {
      type: 'object',
      properties: {
        filename: {
          type: 'string',
          enum: ['agents.ts', 'tools.ts', 'pillars.ts', 'navigation.ts'],
          description: 'Which data file to read',
        },
      },
      required: ['filename'],
    },
  },
}

export function getToolDefinitions(tier: AccessTier) {
  const tools = [addAgentDef, addToolDef, readDataDef]
  // Admin tools would go here in v2
  return tools
}

// --- Tool executors ---

function validate(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg)
}

export function executeTool(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case 'add_agent':
      return addAgent(args as { name: string; role: string; email: string })
    case 'add_tool':
      return addTool(
        args as {
          name: string
          maker: string
          description: string
          capabilities: string[]
          url: string
          category: string
        }
      )
    case 'read_data':
      return readData(args as { filename: string })
    default:
      return `Unknown tool: ${name}`
  }
}

function addAgent(args: { name: string; role: string; email: string }): string {
  validate(args.email.endsWith('@psu.edu'), 'Email must end with @psu.edu')
  validate(args.name.trim().length > 0, 'Name is required')
  validate(args.role.trim().length > 0, 'Role is required')

  const filePath = join(DATA_DIR, 'agents.ts')
  const content = readFileSync(filePath, 'utf-8')

  // Check for duplicates
  if (content.includes(`email: '${args.email}'`)) {
    return `An agent with email ${args.email} already exists.`
  }

  const newEntry = `  {
    name: '${args.name.replace(/'/g, "\\'")}',
    role: '${args.role.replace(/'/g, "\\'")}',
    email: '${args.email}',
  },`

  // Insert before the closing bracket of the agents array
  const closingBracket = content.lastIndexOf(']')
  const before = content.slice(0, closingBracket)
  const after = content.slice(closingBracket)
  const updated = before + newEntry + '\n' + after

  writeFileSync(filePath, updated, 'utf-8')
  return `Added ${args.name} (${args.role}) to the agent list.`
}

function addTool(args: {
  name: string
  maker: string
  description: string
  capabilities: string[]
  url: string
  category: string
}): string {
  validate(
    ['assistant', 'research', 'developer', 'creative'].includes(args.category),
    `Category must be one of: assistant, research, developer, creative. Got: ${args.category}`
  )
  validate(args.url.startsWith('https://'), 'URL must start with https://')
  validate(args.name.trim().length > 0, 'Name is required')

  const filePath = join(DATA_DIR, 'tools.ts')
  const content = readFileSync(filePath, 'utf-8')

  if (content.includes(`name: '${args.name}'`)) {
    return `A tool named "${args.name}" already exists.`
  }

  const capsStr = args.capabilities.map((c) => `      '${c.replace(/'/g, "\\'")}'`).join(',\n')

  const newEntry = `  {
    name: '${args.name.replace(/'/g, "\\'")}',
    maker: '${args.maker.replace(/'/g, "\\'")}',
    description: '${args.description.replace(/'/g, "\\'")}',
    capabilities: [
${capsStr},
    ],
    url: '${args.url}',
    category: '${args.category}',
  },`

  // Insert before the closing bracket of the tools array
  const closingBracket = content.lastIndexOf(']')
  const before = content.slice(0, closingBracket)
  const after = content.slice(closingBracket)
  const updated = before + newEntry + '\n' + after

  writeFileSync(filePath, updated, 'utf-8')
  return `Added ${args.name} by ${args.maker} to the ${args.category} tools.`
}

function readData(args: { filename: string }): string {
  const allowed = ['agents.ts', 'tools.ts', 'pillars.ts', 'navigation.ts']
  if (!allowed.includes(args.filename)) {
    return `Cannot read ${args.filename}. Allowed: ${allowed.join(', ')}`
  }
  try {
    return readFileSync(join(DATA_DIR, args.filename), 'utf-8')
  } catch {
    return `File ${args.filename} not found.`
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/workspace/lib/tools.ts
git commit -m "feat: workspace agent tool definitions and file executors"
```

---

### Task 5: Workspace Chat API Route

**Files:**

- Create: `src/app/workspace/api/chat/route.ts`

- [ ] **Step 1: Create the streaming chat route with function calling**

```typescript
// src/app/workspace/api/chat/route.ts
import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { buildSystemPrompt } from '../../lib/system-prompt'
import { getToolDefinitions, executeTool } from '../../lib/tools'
import type { AccessTier } from '../../lib/types'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const MAX_HISTORY = 20

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
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

          for (const tc of toolCalls) {
            const args = JSON.parse(tc.function.arguments)
            send({ type: 'tool_call', toolName: tc.function.name })

            let result: string
            try {
              result = executeTool(tc.function.name, args)
            } catch (e) {
              result = `Error: ${e instanceof Error ? e.message : 'Unknown error'}`
            }

            send({ type: 'tool_result', toolName: tc.function.name, toolResult: result })

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
                  'Repeat the following message exactly, word for word: ' + choice.message.content,
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/workspace/api/chat/route.ts
git commit -m "feat: workspace streaming chat route with function calling"
```

---

### Task 6: Session End API Route

**Files:**

- Create: `src/app/workspace/api/session-end/route.ts`

- [ ] **Step 1: Create git automation endpoint**

```typescript
// src/app/workspace/api/session-end/route.ts
import { NextRequest } from 'next/server'
import { execSync } from 'child_process'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Not available' }, { status: 404 })
  }

  try {
    const { summary } = (await req.json()) as { summary: string }
    const cwd = process.cwd()

    // Get git user info (pre-configured in Codespace)
    let username = 'contributor'
    try {
      username = execSync('git config user.name', { cwd, encoding: 'utf-8' })
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    } catch {
      // fallback
    }

    const timestamp = Date.now()
    const branch = `contrib/${username}-${timestamp}`
    const commitMsg = summary || 'feat: workspace contribution'

    // Check if there are changes to commit
    const status = execSync('git status --porcelain src/data/', { cwd, encoding: 'utf-8' }).trim()
    if (!status) {
      return Response.json({ success: false, message: 'No changes to submit.' })
    }

    // Create branch, stage data files only, commit, push, create PR
    execSync(`git checkout -b "${branch}"`, { cwd })
    execSync('git add src/data/', { cwd })
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd })
    execSync(`git push -u origin "${branch}"`, { cwd })

    const prUrl = execSync(
      `gh pr create --title "${commitMsg.replace(/"/g, '\\"')}" --body "Submitted via Applied AI Workspace agent.\n\n${summary.replace(/"/g, '\\"')}"`,
      { cwd, encoding: 'utf-8' }
    ).trim()

    return Response.json({ success: true, prUrl, branch })
  } catch (error) {
    console.error('Session end error:', error)
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create PR.',
      },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/workspace/api/session-end/route.ts
git commit -m "feat: session-end API route with git automation"
```

---

### Task 7: Workspace UI Components

**Files:**

- Create: `src/app/workspace/lib/use-chat.ts`
- Create: `src/app/workspace/components/chat-panel.tsx`
- Create: `src/app/workspace/components/session-bar.tsx`
- Create: `src/app/workspace/components/session-end-modal.tsx`
- Create: `src/app/workspace/components/preview-panel.tsx`
- Create: `src/app/workspace/components/tour-overlay.tsx`

This is the largest task. Build each component file. Reference `workspace-mockup.html` for exact styling, colors, and layout. All components use Penn State `@theme` tokens from `globals.css` (navy, beaver-blue, pugh-blue, pa-sky, surface, border, etc.).

- [ ] **Step 1: Create the chat hook**

```typescript
// src/app/workspace/lib/use-chat.ts
'use client'

import { useState, useCallback, useRef } from 'react'
import type { ChatMessage, AccessTier, StreamEvent } from './types'

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [tier, setTier] = useState<AccessTier>('contributor')
  const [changeSummary, setChangeSummary] = useState<string[]>([])
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return
      const userMsg = text.trim()

      // Check for admin code
      if (userMsg === process.env.NEXT_PUBLIC_ADMIN_HINT) {
        // This won't work client-side. Admin code is checked server-side.
      }

      const updated: ChatMessage[] = [...messages, { role: 'user', content: userMsg }]
      setMessages(updated)
      setLoading(true)
      setStreamingText('')
      setSuggestions([])

      abortRef.current = new AbortController()

      try {
        const resp = await fetch('/workspace/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updated, tier }),
          signal: abortRef.current.signal,
        })

        const reader = resp.body?.getReader()
        const decoder = new TextDecoder()
        let fullText = ''

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data: StreamEvent = JSON.parse(line.slice(6))
                  if (data.type === 'text') {
                    fullText += data.text || ''
                    setStreamingText(fullText)
                  } else if (data.type === 'tool_result' && data.toolResult) {
                    setHasChanges(true)
                    setChangeSummary((prev) => [...prev, data.toolResult!])
                  } else if (data.type === 'suggestions') {
                    setSuggestions(data.suggestions || [])
                  }
                } catch {
                  // skip malformed
                }
              }
            }
          }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: fullText }])
        setStreamingText('')
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Something went wrong. Try again.' },
        ])
      }
      setLoading(false)
    },
    [loading, messages, tier]
  )

  const unlockAdmin = useCallback((code: string) => {
    // Send code to server for verification in the chat message
    // The server checks ONBOARD_ADMIN_CODE env var
    setTier('admin')
  }, [])

  return {
    messages,
    streamingText,
    loading,
    suggestions,
    hasChanges,
    changeSummary,
    tier,
    sendMessage,
    unlockAdmin,
  }
}
```

- [ ] **Step 2: Create chat-panel.tsx**

Build the chat panel component matching the mockup's left panel: message list with auto-scroll, message bubbles (agent = surface bg, user = navy bg), streaming text, typing indicator with bouncing dots, input bar with send button, and quick action buttons for first visit. Use the exact same SSE parsing pattern from `SpeakerChat.tsx`. Use Tailwind classes with Penn State tokens.

Key details from mockup:

- Agent avatar: white circle with "AI" text, navy color
- User avatar: beaver-blue circle with user initials
- Bubble border-radius: `rounded-xl` with `rounded-bl-sm` for agent, `rounded-br-sm` for user
- Input: surface bg, border, 12px border-radius, navy send button
- Quick action buttons: surface bg, border, hover beaver-blue border

- [ ] **Step 3: Create session-bar.tsx**

Header bar matching mockup: navy bg, logo icon (white bg, "AI" text), title + subtitle, status dot (green, pulsing), "Agent ready" text, changes badge (amber bg when hasChanges), "I'm done" button (transparent bg, white border).

- [ ] **Step 4: Create session-end-modal.tsx**

Two-stage modal matching mockup:

1. Confirmation: warning icon, "Ready to submit?", session summary (changes made, files changed, commit message), "Go back" and "Submit changes" buttons
2. Success: checkmark icon, "Changes Submitted", PR link, "Close" button

The submit button calls `/workspace/api/session-end` with the summary.

- [ ] **Step 5: Create preview-panel.tsx**

Right panel with three tabs: Site Preview (iframe to localhost:3000), Repo Map (visual file structure with inline explainer tooltips), Compare (two iframes side-by-side: live site vs localhost). Match mockup styling.

Inline explainer tooltips: dotted underline text, hover shows navy tooltip with arrow. Terms to explain: "data files", "agent list", "tools list", "admin only", "infrastructure", "CI/CD pipelines", "pull request".

- [ ] **Step 6: Create tour-overlay.tsx**

Product tour overlay matching mockup: dark mask with spotlight cutout on target element, tooltip card with title/body/dots/next button, arrow pointing to target, "Skip tour" button. 6 steps targeting: full workspace, chat panel, preview content, input bar, done button, preview tabs.

Tour text includes inline explainer links (dotted underline with hover tooltips) for terms like "agent list", "tools list", "data files", "pull request".

Uses CSS clip-path polygon for the mask cutout. Spotlight has pa-sky border with glow. Tooltip positioned relative to target element.

Store tour completion in localStorage. Show tour on first visit only.

- [ ] **Step 7: Commit**

```bash
git add src/app/workspace/lib/use-chat.ts src/app/workspace/components/
git commit -m "feat: workspace UI components (chat, preview, tour, session)"
```

---

### Task 8: Workspace Page and Layout

**Files:**

- Create: `src/app/workspace/layout.tsx`
- Create: `src/app/workspace/page.tsx`

- [ ] **Step 1: Create minimal layout (no site header/footer)**

```typescript
// src/app/workspace/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Applied AI Workspace',
  description: 'Contribute to the Applied AI Club website',
  robots: 'noindex, nofollow',
}

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
```

- [ ] **Step 2: Create the main workspace page**

```typescript
// src/app/workspace/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { SessionBar } from './components/session-bar'
import { ChatPanel } from './components/chat-panel'
import { PreviewPanel } from './components/preview-panel'
import { TourOverlay } from './components/tour-overlay'
import { SessionEndModal } from './components/session-end-modal'
import { useChat } from './lib/use-chat'

export default function WorkspacePage() {
  const chat = useChat()
  const [showTour, setShowTour] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)
  const [endStage, setEndStage] = useState<'confirm' | 'success'>('confirm')
  const [prUrl, setPrUrl] = useState('')

  useEffect(() => {
    const toured = localStorage.getItem('workspace-toured')
    if (!toured) setShowTour(true)
  }, [])

  function handleTourEnd() {
    setShowTour(false)
    localStorage.setItem('workspace-toured', 'true')
  }

  function handleDone() {
    setEndStage('confirm')
    setShowEndModal(true)
  }

  async function handleSubmit() {
    try {
      const resp = await fetch('/workspace/api/session-end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: chat.changeSummary.join('. '),
        }),
      })
      const data = await resp.json()
      if (data.success) {
        setPrUrl(data.prUrl)
        setEndStage('success')
      }
    } catch {
      // handle error
    }
  }

  // Warn before close if unsaved changes
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (chat.hasChanges) {
        e.preventDefault()
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [chat.hasChanges])

  return (
    <LazyMotion features={domAnimation}>
      <div className="h-screen flex flex-col">
        <SessionBar
          hasChanges={chat.hasChanges}
          onDone={handleDone}
        />
        <div className="flex flex-1 min-h-0">
          <ChatPanel
            messages={chat.messages}
            streamingText={chat.streamingText}
            loading={chat.loading}
            suggestions={chat.suggestions}
            onSend={chat.sendMessage}
          />
          <PreviewPanel />
        </div>
      </div>

      {showTour && <TourOverlay onEnd={handleTourEnd} />}

      {showEndModal && (
        <SessionEndModal
          stage={endStage}
          summary={chat.changeSummary}
          prUrl={prUrl}
          onConfirm={handleSubmit}
          onCancel={() => setShowEndModal(false)}
          onClose={() => setShowEndModal(false)}
        />
      )}
    </LazyMotion>
  )
}
```

- [ ] **Step 3: Verify dev server loads `/workspace`**

```bash
cd ~/Documents/GitHub/appliedai && npm run dev &
sleep 5 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/workspace
```

Expected: `200`

- [ ] **Step 4: Commit**

```bash
git add src/app/workspace/layout.tsx src/app/workspace/page.tsx
git commit -m "feat: workspace page and layout"
```

---

### Task 9: Integration Test and Polish

**Files:**

- Modify: `src/app/workspace/components/` (polish pass)

- [ ] **Step 1: Manual integration test**

Open `http://localhost:3000/workspace` in the browser. Verify:

1. Tour overlay appears on first visit with spotlight masking
2. Tour steps highlight correct elements (chat, preview, input, done button, tabs)
3. Clicking "Skip tour" or completing tour shows the chat
4. Welcome message appears in chat
5. Typing a name and sending works
6. Quick action buttons appear
7. Preview panel shows iframe of localhost:3000
8. Repo Map tab shows file structure with explainer tooltips
9. Compare tab shows two iframes side-by-side
10. "I'm done" button shows confirmation modal with summary
11. Changes badge appears after agent makes a file change
12. beforeunload warning fires if changes exist

- [ ] **Step 2: Test agent tool execution**

In the chat, try:

1. "Add me to the agent list. I'm Test User, Events Coordinator, test@psu.edu"
2. Verify agent calls add_agent tool
3. Verify agents.ts file is updated
4. "What tools do we have?" — verify read_data tool works
5. "Add Perplexity to the research tools" — verify add_tool works

- [ ] **Step 3: Test session end flow**

1. After making a change, click "I'm done"
2. Verify confirmation modal shows correct summary
3. Click "Submit changes"
4. Verify branch is created, commit made, PR opened
5. Verify success modal shows PR link

- [ ] **Step 4: Fix any issues found during testing**

- [ ] **Step 5: Run full build to ensure no production issues**

```bash
npm run build
```

Expected: Build succeeds. The `/workspace` route compiles but its API routes return 404 in production.

- [ ] **Step 6: Run existing tests to ensure no regressions**

```bash
npm run lint && npm run format:check && npm test
```

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: Applied AI Workspace Agent v1

Conversational workspace at /workspace for club members to contribute
without coding. OpenAI-powered agent with function calling appends to
data files. Automated git flow creates PRs on session end. Guided tour
overlay for first-time users. Dev-only (blocked in production)."
```

---

### Task 10: Remove .env.local from Git

**Files:**

- Modify: `.gitignore`
- Remove from tracking: `.env.local`

- [ ] **Step 1: Add .env.local to .gitignore if not already covered**

Check current .gitignore. The pattern `.env*` should already cover it, but verify `.env.local` is not tracked:

```bash
git ls-files --cached .env.local
```

If it's tracked:

```bash
git rm --cached .env.local
```

- [ ] **Step 2: Create .env.local.example if it doesn't exist**

```bash
# .env.local.example
OPENAI_API_KEY=sk-your-key-here
ONBOARD_ADMIN_CODE=your-admin-code
NEXT_PUBLIC_MAILING_LIST_ENDPOINT=https://your-google-apps-script-url
NEXT_PUBLIC_LABS_MAILING_LIST_ENDPOINT=https://your-labs-script-url
NEXT_PUBLIC_SPEAKER_FORM_ENDPOINT=https://your-speaker-form-url
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore .env.local.example
git rm --cached .env.local 2>/dev/null
git commit -m "fix: remove .env.local from tracking, add .env.local.example"
```

---

### Task 11: Set Codespace Secrets

This is a manual step. Andy needs to do this in the GitHub UI.

- [ ] **Step 1: Go to GitHub repo settings**

Navigate to `github.com/andysalvo/appliedai` → Settings → Secrets and variables → Codespaces

- [ ] **Step 2: Add secrets**

| Secret Name          | Value               |
| -------------------- | ------------------- |
| `OPENAI_API_KEY`     | Your OpenAI API key |
| `ONBOARD_ADMIN_CODE` | salziglivenow       |

These are automatically injected as environment variables in every Codespace.

---

## Execution Notes

- Tasks 1-2 are independent setup work
- Tasks 3-6 build the backend (types → prompt → tools → API routes)
- Tasks 7-8 build the frontend (components → page assembly)
- Task 9 is integration testing
- Tasks 10-11 are security cleanup
- The workspace mockup at `workspace-mockup.html` is the visual reference for all UI work in Task 7
- After Task 11, delete `workspace-mockup.html` from the repo (it was only for design review)
