#!/usr/bin/env node

/**
 * Applied AI Club -- Document Review
 *
 * Runs a document through 3 evaluation lenses using Llama 3.3 (free via Groq):
 *   1. Student lens: Would a freshman understand this?
 *   2. Audience lens: Would the target reader (speaker, partner, etc.) act on this?
 *   3. Voice lens: Does it match our VOICE_BRIEF.md?
 *
 * Usage:
 *   node scripts/review.mjs docs/guest-speaker-program.md
 *   node scripts/review.mjs docs/guest-speaker-program.md --audience "professional considering speaking at a college club"
 *
 * Requires: GROQ_API_KEY in .env or environment
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, basename } from 'path'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

// Load API key from env or orchestrator .env
const GROQ_KEY =
  process.env.GROQ_API_KEY ||
  (() => {
    const envPaths = ['.env', '.env.local', `${process.env.HOME}/orchestrator/.env`]
    for (const p of envPaths) {
      if (existsSync(p)) {
        const match = readFileSync(p, 'utf8').match(/GROQ_API_KEY=(.+)/)
        if (match) return match[1].trim()
      }
    }
    return null
  })()

if (!GROQ_KEY) {
  console.error('No GROQ_API_KEY found. Set it in .env or environment.')
  process.exit(1)
}

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/review.mjs <path-to-markdown>')
  process.exit(1)
}

// Parse --audience flag
const audienceIdx = process.argv.indexOf('--audience')
const audienceOverride = audienceIdx !== -1 ? process.argv[audienceIdx + 1] : null

const doc = readFileSync(resolve(file), 'utf8')
const docName = basename(file, '.md')

// Load voice brief
const voiceBriefPath = resolve('content/VOICE_BRIEF.md')
const voiceBrief = existsSync(voiceBriefPath) ? readFileSync(voiceBriefPath, 'utf8') : null

async function ask(systemPrompt, userPrompt) {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 800,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || `Groq error: ${res.status}`)
  return data.choices[0].message.content
}

console.log(`\n  Applied AI Club -- Document Review`)
console.log(`  File: ${file}`)
console.log(`  Model: ${MODEL} (Groq, free tier)\n`)

// Lens 1: Student
console.log('  [1/3] Student lens...')
const studentReview = await ask(
  `You are a Penn State freshman who just joined the Applied AI Club. You are smart but new to AI. You joined because you heard AI matters for your career but you do not know much yet.

Read the document and answer honestly. Do not be polite. Be as critical as a tough professor grading a paper.

1. CLARITY (1-10): Can you understand every sentence on first read? Quote any sentence that made you re-read or that uses words you would not use yourself. A 10 means a high schooler could follow it. Most student org writing is a 5.
2. TONE (1-10): Does this sound like real students wrote it, or does it sound like AI generated it? Quote every phrase that feels fake, corporate, or performative. A 10 means it sounds like a text from a friend. Most AI-written content is a 3.
3. WHAT IS MISSING: What would you want to know that this does not tell you? Be specific.
4. WHAT SHOULD BE CUT: What sentences add nothing? What is filler?
5. ONE LINE: Your honest gut reaction in one sentence. Do not be nice.`,
  doc
)

// Lens 2: Audience
const audienceDesc =
  audienceOverride ||
  'a working professional who has been asked to speak at a college club about how they use AI in their job'

console.log('  [2/3] Audience lens...')
const audienceReview = await ask(
  `You are ${audienceDesc}. You are busy. You get a lot of requests. You will only say yes if the ask is clear, the students seem serious, and there is a reason to spend your time on this.

Read the document and answer. Be blunt. You have seen hundreds of these requests and most of them are not worth your time.

1. WOULD YOU SAY YES? (yes/maybe/no) and why in one sentence.
2. WHAT MADE YOU HESITATE: The specific sentence or gap that almost made you say no.
3. CREDIBILITY: On a scale of 1-10, how serious does this organization seem based on this document alone? What gives that impression?
4. WHAT IS MISSING: What would you need to see before committing 45 minutes of your day?
5. WHAT SHOULD CHANGE: Rewrite the single weakest paragraph in your own words to show what would actually work on you.`,
  doc
)

// Lens 3: Voice
console.log('  [3/3] Voice lens...')
const voicePrompt = voiceBrief
  ? `You are an editor checking if a document matches a specific writing style guide. Here is the style guide:\n\n${voiceBrief}\n\nNow check the document against every rule in the guide.`
  : `You are an editor checking if a student org document sounds authentic (student-to-student, no corporate speak, no hype words, no em dashes, no parallel cadence patterns).`

const voiceReview = await ask(
  `${voicePrompt}

Be ruthless. Check every sentence against every rule.

1. COMPLIANCE (1-10): How well does it follow the rules? A 10 means it sounds like a real person wrote every word. Most AI-assisted writing scores a 4.
2. VIOLATIONS: Quote every phrase that breaks a rule. Name the rule. Do not skip any.
3. AI DETECTION: Which sentences most obviously sound like they were generated by AI? Quote them. Explain why they read as artificial.
4. BEST LINE: The single most authentic sentence. The one that sounds most like a real student wrote it.
5. WORST LINE: The single most artificial sentence. The one that would make a reader think "a chatbot wrote this."`,
  doc
)

// Build report
const report = `# Review: ${docName}

> Reviewed ${new Date().toISOString().split('T')[0]}
> Model: ${MODEL} via Groq (free tier)
> Three lenses: Student, Audience, Voice

---

## Student Lens
*"Would a freshman understand this?"*

${studentReview}

---

## Audience Lens
*"Would ${audienceDesc} act on this?"*

${audienceReview}

---

## Voice Lens
*"Does it match VOICE_BRIEF.md?"*

${voiceReview}
`

// Write report
const reportPath = resolve(`docs/reviews/${docName}-review.md`)
const reviewDir = resolve('docs/reviews')
if (!existsSync(reviewDir)) {
  import('fs').then((fs) => fs.mkdirSync(reviewDir, { recursive: true }))
}
writeFileSync(reportPath, report)

console.log(`\n  Review saved: ${reportPath}\n`)
console.log(report)
