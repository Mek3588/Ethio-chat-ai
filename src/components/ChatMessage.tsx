import React from 'react';
import { Message } from '../types';
import { formatDate } from '../utils/helpers';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex gap-4 p-4 ${message.role === 'assistant' ? 'bg-green-50' : ''}`}>
      <div className="flex-shrink-0">
        {message.role === 'assistant' ? (
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-yellow-600 flex items-center justify-center text-white">
            <Bot size={18} />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-800">
            <User size={18} />
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">
            {message.role === 'assistant' ? 'ኮድ አሲስት' : 'እርስዎ'}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(message.timestamp)}
          </span>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;