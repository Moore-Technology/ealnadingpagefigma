import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function AIMentorSidebar() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your EA Mentor. I'm here to help you master tax concepts and prepare for your Enrolled Agent exam. What would you like to study today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Great question! Let me break that down for you...",
        "That's an important concept for the EA exam. Here's what you need to know:",
        "I can help with that! Let's review the key points:",
        "Excellent topic to focus on. The IRS emphasizes this in Publication 17..."
      ];
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[24px] border border-white/10 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-gradient-to-r from-[#007AFF]/20 to-[#30d158]/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#007AFF]/20 rounded-xl border border-[#007AFF]/30">
            <Sparkles className="w-5 h-5 text-[#0A84FF]" />
          </div>
          <div>
            <h3 className="text-white/90">EA Mentor AI</h3>
            <p className="text-slate-400 text-xs mt-0.5">Your intelligent study assistant</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-[#007AFF] to-[#0A84FF] text-white shadow-lg shadow-[#007AFF]/20'
                  : 'bg-white/10 text-slate-100 border border-white/10 backdrop-blur-sm'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Suggested Questions */}
      <div className="px-6 pb-3">
        <div className="text-xs text-slate-500 mb-2">Suggested questions:</div>
        <div className="flex flex-wrap gap-2">
          {['Circular 230', 'Tax Credits', 'Deductions'].map((topic) => (
            <button
              key={topic}
              onClick={() => setInputValue(`Explain ${topic}`)}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-slate-300 transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input */}
      <div className="p-6 border-t border-white/10 bg-black/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your EA Mentor..."
            className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 focus:border-[#007AFF]/50 backdrop-blur-sm"
          />
          <button
            onClick={handleSend}
            className="p-3 bg-gradient-to-br from-[#007AFF] to-[#0A84FF] hover:from-[#0A84FF] hover:to-[#007AFF] rounded-xl transition-all shadow-lg shadow-[#007AFF]/20 hover:shadow-[#007AFF]/30"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}