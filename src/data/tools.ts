export interface Tool {
  name: string
  maker: string
  description: string
  capabilities: string[]
  url: string
  category: 'assistant' | 'developer' | 'research'
}

export const categories = {
  assistant: { label: 'AI Assistants', accent: 'border-t-navy', bg: 'bg-navy/[0.06]' },
  research: { label: 'Research', accent: 'border-t-beaver-blue', bg: 'bg-beaver-blue/[0.06]' },
  developer: { label: 'Developer Tools', accent: 'border-t-pugh-blue', bg: 'bg-pugh-blue/[0.12]' },
}

export const tools: Tool[] = [
  {
    name: 'ChatGPT',
    maker: 'OpenAI',
    description: 'The most widely used AI chat assistant.',
    capabilities: [
      'General Q&A and research',
      'Writing and editing help',
      'Code generation and debugging',
      'Image generation with DALL-E',
    ],
    url: 'https://chat.openai.com',
    category: 'assistant',
  },
  {
    name: 'Claude',
    maker: 'Anthropic',
    description: 'An AI assistant built for nuanced, trustworthy reasoning and long-form writing.',
    capabilities: [
      'Long document analysis',
      'Careful, nuanced reasoning',
      'Code generation and review',
      'Research synthesis',
    ],
    url: 'https://claude.ai',
    category: 'assistant',
  },
  {
    name: 'Perplexity',
    maker: 'Perplexity AI',
    description: 'The search engine built for research. Every answer comes with sources.',
    capabilities: [
      'Source-backed research answers',
      'Academic and news search',
      'Follow-up question threads',
      'Collections for organizing research',
    ],
    url: 'https://perplexity.ai',
    category: 'research',
  },
  {
    name: 'Openclaw',
    maker: 'Openclaw',
    description: 'Open source AI framework for building agents that connect to real tools.',
    capabilities: [
      'Build custom AI agents',
      'Connect agents to APIs and databases',
      'Chain multiple AI models together',
      'Run agents locally or in the cloud',
    ],
    url: 'https://openclaw.com',
    category: 'developer',
  },
  {
    name: 'Ollama',
    maker: 'Ollama',
    description: 'Run AI models on your own computer. No cloud, no API keys, no cost.',
    capabilities: [
      'Run LLMs locally (Llama, Mistral, Gemma)',
      'Complete privacy for sensitive work',
      'No usage limits or costs',
      'Fine-tune models on your data',
    ],
    url: 'https://ollama.com',
    category: 'developer',
  },
  {
    name: 'Cursor',
    maker: 'Anysphere',
    description: 'An AI-native code editor. Understands your whole codebase.',
    capabilities: [
      'AI-powered code editing and completion',
      'Codebase-aware suggestions',
      'Natural language to code changes',
      'Built-in chat with your code as context',
    ],
    url: 'https://cursor.com',
    category: 'developer',
  },
  {
    name: 'v0',
    maker: 'Vercel',
    description: 'Generate UI components and full pages from text descriptions.',
    capabilities: [
      'Generate React components from prompts',
      'Create full page layouts',
      'Export production-ready code',
      'Iterate on designs conversationally',
    ],
    url: 'https://v0.dev',
    category: 'developer',
  },
  {
    name: 'Codex',
    maker: 'OpenAI',
    description: 'An agentic coding tool by OpenAI that writes, tests, and fixes code.',
    capabilities: [
      'Write entire features from specifications',
      'Run and test code in a sandbox',
      'Fix bugs by reading error messages',
      'Generate pull requests automatically',
    ],
    url: 'https://openai.com/codex',
    category: 'developer',
  },
]
