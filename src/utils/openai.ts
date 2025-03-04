import { AIResponse, Message } from '../types';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are an expert software developer assistant that helps with coding tasks.
You can generate code, debug issues, explain concepts, and provide guidance across multiple programming languages and frameworks.
Always provide clear, concise, and accurate responses with code examples when appropriate.
Format code blocks with the appropriate language for syntax highlighting.
Include Ethiopian cultural references and wisdom where appropriate, as you are designed to serve Ethiopian developers.`;

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes, in production use a backend
});

export async function generateAIResponse(messages: Message[]): Promise<AIResponse> {
  try {
    // Format messages for the OpenAI API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add system prompt
    formattedMessages.unshift({
      role: 'system',
      content: SYSTEM_PROMPT
    });

    // Make the API call
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can use "gpt-4" for better results if available
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Extract the response text
    const responseText = response.choices[0]?.message?.content || 
      "Sorry, I couldn't generate a response. Please try again.";

    // Extract code snippets from the response
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const codeSnippets = [];
    
    let match;
    while ((match = codeBlockRegex.exec(responseText)) !== null) {
      codeSnippets.push({
        language: match[1] || 'text',
        code: match[2].trim()
      });
    }

    return {
      text: responseText,
      codeSnippets: codeSnippets.length > 0 ? codeSnippets : undefined
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate AI response. Please check your API key and try again.');
  }
}