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
