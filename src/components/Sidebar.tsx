import React from 'react';
import { Conversation } from '../types';
import { PlusCircle, MessageSquare, Code } from 'lucide-react';
import { formatDate } from '../utils/helpers';

interface SidebarProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onNewConversation: () => void;
  onSelectConversation: (conversation: Conversation) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversation,
  onNewConversation,
  onSelectConversation,
}) => {
  return (
    <div className="w-64 bg-gradient-to-b from-green-900 to-yellow-800 text-white flex flex-col h-full">
      <div className="p-4 border-b border-yellow-700 flex items-center gap-2">
        <Code size={24} className="text-yellow-400" />
        <h1 className="text-xl font-bold">ኮድ አሲስት</h1>
      </div>
      
      <button
        onClick={onNewConversation}
        className="mx-4 mt-4 mb-2 py-2 px-4 rounded-md bg-yellow-600 hover:bg-yellow-700 transition-colors flex items-center gap-2"
      >
        <PlusCircle size={18} />
        <span>አዲስ ውይይት</span>
      </button>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h2 className="text-xs uppercase text-yellow-300 font-semibold px-2 py-1">የቅርብ ጊዜ ውይይቶች</h2>
          <ul className="space-y-1 mt-1">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  onClick={() => onSelectConversation(conversation)}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                    activeConversation?.id === conversation.id
                      ? 'bg-yellow-800'
                      : 'hover:bg-green-800'
                  }`}
                >
                  <MessageSquare size={16} className="flex-shrink-0" />
                  <div className="flex-1 truncate">
                    <div className="text-sm font-medium truncate">{conversation.title}</div>
                    <div className="text-xs text-yellow-200">{formatDate(conversation.updatedAt)}</div>
                  </div>
                </button>
              </li>
            ))}
            {conversations.length === 0 && (
              <li className="px-3 py-2 text-sm text-yellow-200">
                ምንም ውይይት የለም
              </li>
            )}
          </ul>
        </div>
      </div>
      
      <div className="p-4 border-t border-yellow-700">
        <div className="text-center text-xs text-yellow-300 italic">
          "ዕውቀት ያለው ሰው ጥበብ ያለው ነው።" - የኢትዮጵያ ምሳሌ
        </div>
      </div>
    </div>
  );
};

export default Sidebar;