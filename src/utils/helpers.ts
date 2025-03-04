import { Message, Conversation } from '../types';

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Create a new conversation
export function createNewConversation(title: string = 'New Conversation'): Conversation {
  const now = new Date();
  return {
    id: generateId(),
    title,
    messages: [],
    createdAt: now,
    updatedAt: now
  };
}

// Add a message to a conversation
export function addMessageToConversation(conversation: Conversation, role: 'user' | 'assistant' | 'system', content: string): Conversation {
  const newMessage: Message = {
    id: generateId(),
    role,
    content,
    timestamp: new Date()
  };
  
  return {
    ...conversation,
    messages: [...conversation.messages, newMessage],
    updatedAt: new Date()
  };
}

// Extract code blocks from markdown
export function extractCodeBlocks(markdown: string): { language: string; code: string }[] {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const codeBlocks: { language: string; code: string }[] = [];
  
  let match;
  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    codeBlocks.push({
      language: match[1] || 'text',
      code: match[2].trim()
    });
  }
  
  return codeBlocks;
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}