// src/app/workspace/lib/tools.ts
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'
import type { AccessTier } from './types'

const DATA_DIR = join(process.cwd(), 'src/data')
const CONTRIBUTIONS_DIR = join(process.cwd(), 'contributions')
const SESSIONS_DIR = join(CONTRIBUTIONS_DIR, 'sessions')

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

const saveIdeaDef = {
  type: 'function' as const,
  function: {
    name: 'save_idea',
    description: 'Save an idea from the current brainstorming session to a session file',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Short name for the idea (e.g. "Workshop on prompt engineering")',
        },
        description: { type: 'string', description: '1-3 sentences explaining the idea' },
        category: {
          type: 'string',
          enum: ['event', 'project', 'content', 'outreach', 'improvement', 'other'],
          description: 'Idea category',
        },
      },
      required: ['title', 'description', 'category'],
    },
  },
}

const registerContributorDef = {
  type: 'function' as const,
  function: {
    name: 'register_contributor',
    description: 'Add a new contributor to the contributors list',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Full name of the contributor' },
        email: { type: 'string', description: 'Email address' },
        interests: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of interests (e.g. ["machine learning", "web development"])',
        },
      },
      required: ['name', 'email', 'interests'],
    },
  },
}

export function getToolDefinitions(tier: AccessTier) {
  const tools = [addAgentDef, addToolDef, readDataDef, saveIdeaDef, registerContributorDef]
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
    case 'save_idea':
      return saveIdea(args as { title: string; description: string; category: string })
    case 'register_contributor':
      return registerContributor(args as { name: string; email: string; interests: string[] })
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

function getUsername(): string {
  try {
    return execSync('git config user.name', { encoding: 'utf-8' })
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
  } catch {
    return 'contributor'
  }
}

function getDisplayName(): string {
  try {
    return execSync('git config user.name', { encoding: 'utf-8' }).trim()
  } catch {
    return 'Contributor'
  }
}

function getTodayString(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function saveIdea(args: { title: string; description: string; category: string }): string {
  const categories = ['event', 'project', 'content', 'outreach', 'improvement', 'other']
  validate(
    categories.includes(args.category),
    `Category must be one of: ${categories.join(', ')}. Got: ${args.category}`
  )
  validate(args.title.trim().length > 0, 'Title is required')
  validate(args.description.trim().length > 0, 'Description is required')

  const username = getUsername()
  const displayName = getDisplayName()
  const today = getTodayString()
  const filename = `${today}-${username}.md`

  if (!existsSync(SESSIONS_DIR)) {
    mkdirSync(SESSIONS_DIR, { recursive: true })
  }

  const filePath = join(SESSIONS_DIR, filename)
  const ideaBlock = `### ${args.title}
**Category:** ${args.category}

${args.description}

---

`

  if (existsSync(filePath)) {
    // Append to existing session file
    const existing = readFileSync(filePath, 'utf-8')
    writeFileSync(filePath, existing + ideaBlock, 'utf-8')
  } else {
    // Create new session file with frontmatter
    const content = `---
contributor: ${displayName}
date: ${today}
session_id: ${Date.now()}
---

# Session: ${displayName}

## Ideas

${ideaBlock}`
    writeFileSync(filePath, content, 'utf-8')
  }

  return `Saved idea "${args.title}" (${args.category}) to session file.`
}

function registerContributor(args: { name: string; email: string; interests: string[] }): string {
  validate(args.name.trim().length > 0, 'Name is required')
  validate(args.email.trim().length > 0, 'Email is required')

  const filePath = join(CONTRIBUTIONS_DIR, 'contributors.md')

  if (!existsSync(filePath)) {
    // Create the file if it doesn't exist
    const header = `# Applied AI Contributors

Everyone who has contributed to Applied AI through the workspace.

| Name | Email | Date Joined | Interests |
|------|-------|-------------|-----------|
`
    writeFileSync(filePath, header, 'utf-8')
  }

  const content = readFileSync(filePath, 'utf-8')

  // Check for duplicate email
  if (content.includes(args.email)) {
    return `${args.name} is already registered as a contributor.`
  }

  const today = getTodayString()
  const interestsStr = args.interests.join(', ')
  const newRow = `| ${args.name} | ${args.email} | ${today} | ${interestsStr} |\n`

  writeFileSync(filePath, content + newRow, 'utf-8')
  return `Registered ${args.name} as a contributor. Welcome to Applied AI.`
}
