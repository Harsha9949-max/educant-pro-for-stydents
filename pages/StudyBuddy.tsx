
import React, { useState, useRef, useEffect } from 'react';
import { getAiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MOCK_SUBJECTS } from '../constants';
import Card from '../components/Card';
import { PaperAirplaneIcon, MicrophoneIcon, SparklesIcon } from '../components/icons/Icons';

const StudyBuddy: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const sendMessage = async (promptText?: string) => {
    const textToSend = promptText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    let fullPrompt = textToSend;
    if (selectedSubject) {
        fullPrompt = `In the context of ${selectedSubject}, ${textToSend}`;
    }

    try {
      const aiResponseText = await getAiResponse(fullPrompt);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'ai', text: 'Sorry, I am having trouble connecting. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    if (!input.trim()) {
      // Maybe show a toast notification here
      return;
    }
    const prompt = `${action}: "${input}"`;
    sendMessage(prompt);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Subject Selection Panel */}
      <Card className="w-full md:w-1/4 flex-shrink-0 animate-slideInUp">
        <h2 className="text-xl font-bold mb-4">Select a Subject</h2>
        <div className="space-y-2">
            {MOCK_SUBJECTS.map(subject => (
                <button
                    key={subject.name}
                    onClick={() => setSelectedSubject(subject.name)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${selectedSubject === subject.name ? 'bg-primary text-white' : 'hover:bg-primary/10'}`}
                >
                    <subject.icon className="w-5 h-5" />
                    <span>{subject.name}</span>
                </button>
            ))}
             <button
                    onClick={() => setSelectedSubject(null)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${selectedSubject === null ? 'bg-secondary text-white' : 'hover:bg-secondary/10'}`}
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>General</span>
                </button>
        </div>
      </Card>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col bg-card dark:bg-card-dark rounded-2xl shadow-lg animate-fadeIn">
        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><SparklesIcon className="w-5 h-5"/></div>}
              <div className={`max-w-xs md:max-w-md lg:max-w-xl px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark rounded-bl-none'}`}>
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white flex-shrink-0"><SparklesIcon className="w-5 h-5"/></div>
              <div className="max-w-xs px-4 py-3 rounded-2xl bg-background dark:bg-background-dark text-text-primary dark:text-text-primary-dark rounded-bl-none">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
           <div className="flex gap-2 mb-2">
                <button onClick={() => handleQuickAction('Explain like a teacher')} className="text-xs px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition">Explain Like Teacher</button>
                <button onClick={() => handleQuickAction('Give examples for')} className="text-xs px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition">Give Examples</button>
                <button onClick={() => handleQuickAction('Summarize')} className="text-xs px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition">Summarize</button>
            </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={selectedSubject ? `Ask about ${selectedSubject}...` : 'Ask me anything...'}
              className="flex-grow bg-background dark:bg-background-dark border-transparent focus:ring-primary focus:border-primary rounded-full py-3 px-5 outline-none"
            />
             <button className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-text-secondary-dark hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                <MicrophoneIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className="p-3 rounded-full bg-primary text-white hover:bg-primary-dark transition disabled:bg-gray-400 disabled:cursor-not-allowed flex-shrink-0"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddy;
