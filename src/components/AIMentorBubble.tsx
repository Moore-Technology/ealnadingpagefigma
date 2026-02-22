import { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';

export function AIMentorBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I\'m your EA Mentor AI. Ready to ace your exam? Ask me anything!' }
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'I\'m here to help! Let me guide you through this topic.'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[500px] bg-gradient-to-br from-[#1a1a1a]/95 to-[#121212]/95 backdrop-blur-2xl rounded-[24px] border border-white/10 shadow-2xl flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-gradient-to-r from-[#FF8C00]/20 to-[#BD93F9]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="p-2 bg-[#FF8C00]/20 rounded-xl border border-[#FF8C00]/30">
                    <Sparkles className="w-5 h-5 text-[#FF8C00]" />
                  </div>
                  {/* Pulse indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#50FA7B] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white/90 font-semibold">EA Mentor AI</h3>
                  <p className="text-slate-400 text-xs">Active & Ready</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-[#FF8C00] to-[#FFA500] text-white shadow-lg shadow-[#FF8C00]/20'
                      : 'bg-white/[0.08] text-slate-100 border border-white/10 backdrop-blur-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-[#1a1a1a]/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your mentor..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 focus:border-[#FF8C00]/50"
              />
              <button
                onClick={handleSend}
                className="p-2.5 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating chat bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] rounded-full shadow-2xl shadow-[#FF8C00]/40 hover:shadow-[#FF8C00]/60 transition-all duration-300 flex items-center justify-center group z-50 hover:scale-110"
      >
        <Sparkles className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full bg-[#FF8C00] opacity-75 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-[#FF8C00] opacity-50 animate-pulse" />
        
        {/* Active indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#50FA7B] rounded-full border-2 border-[#121212] animate-pulse" />
      </button>
    </>
  );
}
