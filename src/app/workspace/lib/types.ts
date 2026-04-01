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
