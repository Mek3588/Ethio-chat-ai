import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import FeaturePanel from './components/FeaturePanel';
import { Conversation, Message } from './types';
import { createNewConversation, addMessageToConversation } from './utils/helpers';
import { generateAIResponse } from './utils/openai';
import { Code } from 'lucide-react';

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with a new conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      const newConversation = createNewConversation();
      setConversations([newConversation]);
      setActiveConversation(newConversation);
    }
  }, [conversations]);

  const handleNewConversation = () => {
    const newConversation = createNewConversation();
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation);
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversation) return;

    // Add user message to conversation
    const updatedConversation = addMessageToConversation(
      activeConversation,
      'user',
      content
    );

    // Update state with user message
    setActiveConversation(updatedConversation);
    setConversations(
      conversations.map((conv) =>
        conv.id === updatedConversation.id ? updatedConversation : conv
      )
    );

    // Generate AI response
    setIsLoading(true);
    try {
      const aiResponse = await generateAIResponse(updatedConversation.messages);
      
      // Add AI response to conversation
      const finalConversation = addMessageToConversation(
        updatedConversation,
        'assistant',
        aiResponse.text
      );

      // Update conversation title if it's the first message
      let conversationToUpdate = finalConversation;
      if (finalConversation.messages.length === 2) {
        // This is the first exchange, generate a title based on the user's message
        const title = content.length > 30 
          ? content.substring(0, 30) + '...' 
          : content;
        
        conversationToUpdate = {
          ...finalConversation,
          title
        };
      }

      // Update state with AI response
      setActiveConversation(conversationToUpdate);
      setConversations(
        conversations.map((conv) =>
          conv.id === conversationToUpdate.id ? conversationToUpdate : conv
        )
      );
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message to conversation
      const errorConversation = addMessageToConversation(
        updatedConversation,
        'assistant',
        'ይቅርታ፣ ጥያቄዎን በማስኬድ ላይ ችግር አጋጥሞኛል። እባክዎ እንደገና ይሞክሩ።'
      );
      
      setActiveConversation(errorConversation);
      setConversations(
        conversations.map((conv) =>
          conv.id === errorConversation.id ? errorConversation : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFeature = (feature: string) => {
    let prompt = '';
    
    if (feature === 'generate') {
      prompt = 'ለዚህ ኮድ እንዲፈጠርልኝ እፈልጋለሁ: ';
    } else if (feature === 'debug') {
      prompt = 'ይህን ኮድ ለማስተካከል እርዳታ እፈልጋለሁ: ';
    } else if (feature === 'explain') {
      prompt = 'ይህ ኮድ እንዴት እንደሚሰራ ልታብራራልኝ ትችላለህ? ';
    } else if (feature === 'database') {
      prompt = 'ለዚህ የዳታቤዝ ኩዌሪ እርዳታ እፈልጋለሁ: ';
    } else if (feature === 'api') {
      prompt = 'ለዚህ API እንድገነባልኝ እፈልጋለሁ: ';
    } else if (feature === 'test') {
      prompt = 'ለዚህ ኮድ የዩኒት ቴስቶች እፈልጋለሁ: ';
    } else if (feature === 'review') {
      prompt = 'ይህን ኮድ ገምግመህ ማሻሻያዎችን ልታመለክትልኝ ትችላለህ? ';
    } else if (feature === 'learn') {
      prompt = 'የዚህን ፅንሰ-ሀሳብ ልታብራራልኝ ትችላለህ: ';
    } else if (feature.startsWith('language:')) {
      const language = feature.split(':')[1];
      prompt = `በ${language} ቋንቋ ለዚህ ኮድ እርዳታ እፈልጋለሁ: `;
    } else if (feature.startsWith('framework:')) {
      const framework = feature.split(':')[1];
      prompt = `በ${framework} ፍሬምወርክ ላይ እርዳታ እፈልጋለሁ። በተለይም፣ ማድረግ የምፈልገው: `;
    }
    
    // Set the prompt in the chat input
    const chatInput = document.querySelector('textarea');
    if (chatInput) {
      (chatInput as HTMLTextAreaElement).value = prompt;
      (chatInput as HTMLTextAreaElement).focus();
    }
  };

  return (
    <div className="flex h-screen bg-yellow-50">
      <Sidebar
        conversations={conversations}
        activeConversation={activeConversation}
        onNewConversation={handleNewConversation}
        onSelectConversation={handleSelectConversation}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-yellow-200 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code size={20} className="text-green-600" />
            <h1 className="text-xl font-semibold text-green-800">ኮድ አሲስት AI</h1>
          </div>
          <div className="text-sm text-yellow-800">
            የኢትዮጵያ ዲጂታል ልማት አጋር
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-white">
          {activeConversation && activeConversation.messages.length > 0 ? (
            <div className="flex flex-col divide-y divide-yellow-100">
              {activeConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-yellow-50 to-white">
              <div className="max-w-2xl w-full">
                <FeaturePanel onSelectFeature={handleSelectFeature} />
              </div>
            </div>
          )}
        </main>
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;