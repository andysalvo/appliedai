export interface Tool {
  name: string
  maker: string
  description: string
  capabilities: string[]
  url: string
  category: 'assistant' | 'developer' | 'research' | 'creative'
}

export const categories = {
  assistant: { label: 'AI Assistants', accent: 'border-t-navy', bg: 'bg-navy/[0.06]' },
  research: { label: 'Research', accent: 'border-t-beaver-blue', bg: 'bg-beaver-blue/[0.06]' },
  developer: { label: 'Developer Tools', accent: 'border-t-pugh-blue', bg: 'bg-pugh-blue/[0.12]' },
  creative: { label: 'Creative', accent: 'border-t-pa-sky', bg: 'bg-pa-sky/[0.08]' },
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
    name: 'Gemini',
    maker: 'Google',
    description: "Google's AI assistant with multimodal capabilities.",
    capabilities: [
      'Understands text, images, audio, and video together',
      'Deep integration with Google Workspace apps',
      'Long context window for large documents',
      'Real-time web search built in',
    ],
    url: 'https://gemini.google.com',
    category: 'assistant',
  },
  {
    name: 'GitHub Copilot',
    maker: 'GitHub/Microsoft',
    description: 'AI pair programmer that suggests code as you type.',
    capabilities: [
      'Inline code completions in your editor',
      'Chat interface for explaining and refactoring code',
      'Works across most languages and frameworks',
      'Free tier available for students',
    ],
    url: 'https://github.com/features/copilot',
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
    name: 'NotebookLM',
    maker: 'Google',
    description: 'AI research assistant that works with your documents.',
    capabilities: [
      'Upload PDFs, slides, and websites as sources',
      'Ask questions grounded in your materials',
      'Auto-generate study guides and summaries',
      'Creates audio overviews of your sources',
    ],
    url: 'https://notebooklm.google.com',
    category: 'research',
  },
  {
    name: 'Elicit',
    maker: 'Elicit',
    description: 'AI research assistant for finding and analyzing academic papers.',
    capabilities: [
      'Search across millions of academic papers',
      'Extract key findings and methods automatically',
      'Summarize and compare results across studies',
      'Organize papers into structured literature reviews',
    ],
    url: 'https://elicit.com',
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
  {
    name: 'Claude Code',
    maker: 'Anthropic',
    description: 'Agentic coding tool that lives in your terminal.',
    capabilities: [
      'Reads and edits files across your whole project',
      'Runs commands, tests, and builds directly',
      'Works with git to commit and create PRs',
      'Understands large codebases through search and context',
    ],
    url: 'https://claude.ai/code',
    category: 'developer',
  },
  {
    name: 'Replit',
    maker: 'Replit',
    description: 'Browser-based IDE with AI that builds full apps from prompts.',
    capabilities: [
      'Go from idea to deployed app in one conversation',
      'Runs code in the browser with no local setup',
      'Built-in hosting and database support',
      'Supports most languages and frameworks',
    ],
    url: 'https://replit.com',
    category: 'developer',
  },
  {
    name: 'Windsurf',
    maker: 'Codeium',
    description: 'AI-native code editor with deep codebase understanding.',
    capabilities: [
      'Flows that combine chat and inline editing',
      'Indexes your full codebase for accurate suggestions',
      'Multi-file edits from a single prompt',
      'Built on VS Code so extensions still work',
    ],
    url: 'https://windsurf.com',
    category: 'developer',
  },
  {
    name: 'Midjourney',
    maker: 'Midjourney',
    description: 'Generate high quality images from text descriptions.',
    capabilities: [
      'Create detailed images from text prompts',
      'Upscale and vary generated images',
      'Style control through parameters and references',
      'Consistent character and style generation across images',
    ],
    url: 'https://midjourney.com',
    category: 'creative',
  },
  {
    name: 'ElevenLabs',
    maker: 'ElevenLabs',
    description: 'AI voice generation and text-to-speech platform.',
    capabilities: [
      'Generate natural-sounding speech in many languages',
      'Clone voices from short audio samples',
      'Control emotion, pacing, and tone',
      'Real-time voice conversion and dubbing',
    ],
    url: 'https://elevenlabs.io',
    category: 'creative',
  },
  {
    name: 'Suno',
    maker: 'Suno',
    description: 'Generate original music from text descriptions.',
    capabilities: [
      'Create full songs with vocals and instruments from a prompt',
      'Choose genres, moods, and styles',
      'Write or provide your own lyrics',
      'Extend and remix generated tracks',
    ],
    url: 'https://suno.com',
    category: 'creative',
  },
]
