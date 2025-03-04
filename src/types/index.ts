export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CodeSnippet {
  language: string;
  code: string;
}

export interface AIResponse {
  text: string;
  codeSnippets?: CodeSnippet[];
}

export type SupportedLanguage = 
  | 'javascript' 
  | 'typescript' 
  | 'python' 
  | 'java' 
  | 'c' 
  | 'cpp' 
  | 'csharp' 
  | 'go' 
  | 'ruby' 
  | 'php' 
  | 'swift' 
  | 'kotlin' 
  | 'rust'
  | 'html'
  | 'css'
  | 'sql';

export type SupportedFramework = 
  | 'react' 
  | 'vue' 
  | 'angular' 
  | 'svelte' 
  | 'express' 
  | 'django' 
  | 'flask' 
  | 'spring' 
  | 'laravel' 
  | 'rails';