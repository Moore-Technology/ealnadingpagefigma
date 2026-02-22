import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIMentorChatProps {
  userReadyScore: number;
  weakAreas: string[];
  recentActivity: string;
}

export function AIMentorChat({ userReadyScore, weakAreas, recentActivity }: AIMentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: `👋 Hi! I'm your AI EA Mentor. I've analyzed your progress:\n\n📊 **ReadySCORE: ${userReadyScore}/130**\n⚠️ **Weak Areas:** ${weakAreas.join(', ')}\n🎯 **Recent:** ${recentActivity}\n\nI can help with tax law explanations, study strategies, or practice questions. What would you like to work on?`,
      timestamp: new Date(),
      suggestions: [
        'Explain Circular 230 ethics',
        'Create practice questions for weak areas',
        'Why is my ReadySCORE stuck?',
        'Best strategy for Part 3?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI response (replace with real OpenAI/Claude API call)
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // In production, replace this with actual API call:
    // const response = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     messages: [...messages, { role: 'user', content: userMessage }],
    //     context: { readyScore: userReadyScore, weakAreas, recentActivity }
    //   })
    // });
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

    // Smart response based on keywords
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('circular 230') || lowerMessage.includes('ethics')) {
      return `**Circular 230: Practice Before the IRS** 🏛️

This is Treasury Department Circular 230, which regulates who can practice before the IRS and sets ethical standards.

**Key Concepts:**

1. **Who Can Practice?**
   - Enrolled Agents (that's you after passing!)
   - CPAs, Attorneys
   - Enrolled Actuaries (limited scope)
   - Annual Filing Season Program participants (limited)

2. **Core Ethical Rules:**
   - ⚖️ **Due Diligence** - Must make reasonable inquiries if client info seems incorrect
   - 🔒 **Confidentiality** - Can't disclose client info without consent
   - 💰 **Contingent Fees** - Generally prohibited (can't charge based on refund amount)
   - 🚫 **Conflicts of Interest** - Must avoid or disclose

3. **Common Exam Traps:**
   - Contingent fees ARE allowed for: amended returns, IRS examinations, claims for refund
   - You CAN represent a client without a power of attorney for informal advice
   - You MUST return client records even if they owe you money

**Practice Question:**
An EA charges 20% of a client's tax refund for preparing an original Form 1040. Is this permitted?

**Answer:** ❌ NO - Contingent fees are prohibited for preparing original returns. Only allowed for amended returns and IRS disputes.

Want me to create 5 more practice questions on this topic?`;
    }
    
    if (lowerMessage.includes('readyscore') || lowerMessage.includes('stuck') || lowerMessage.includes('improve')) {
      return `**Why Your ReadySCORE is at ${userReadyScore}** 📊

I analyzed your performance data. Here's what's holding you back:

**Current Bottlenecks:**

1. 🔴 **${weakAreas[0]}** - 43% mastery
   - You're missing conceptual fundamentals, not calculation errors
   - **Fix:** Study the IRC code sections, not just examples
   - **Time needed:** 6-8 hours focused review

2. 🟡 **${weakAreas[1]}** - 58% mastery  
   - You know the rules but struggle with exceptions
   - **Fix:** Create flashcards for "except when" scenarios
   - **Time needed:** 4 hours

**To Hit 105 (Exam Ready):**
- Complete 200 more practice questions in weak areas
- Review 3 full-length mock exams
- Maintain daily streak for 14+ days
- **Estimated time:** 3 weeks at current pace

**Smart Strategy:**
Instead of random studying, I can generate a **personalized 21-day sprint plan**. Want me to create it?`;
    }

    if (lowerMessage.includes('practice') || lowerMessage.includes('question')) {
      return `**AI-Generated Practice Question** 🎯

Based on your weak area (${weakAreas[0]}), here's a challenging question:

---

**Question:**
A married couple filed jointly in 2023. The husband is a self-employed consultant (Schedule C) with net profit of $85,000. The wife is a W-2 employee earning $60,000. They paid $18,000 for health insurance premiums during the year.

What amount of health insurance premiums can be deducted FOR AGI?

**A)** $0  
**B)** $9,000  
**C)** $18,000  
**D)** $13,500  

---

**Think about:**
- Self-employed health insurance deduction rules
- Limitations based on net profit
- What happens when spouse has employer coverage?

Type your answer (A, B, C, or D) and I'll explain the logic!`;
    }

    if (lowerMessage.includes('strategy') || lowerMessage.includes('part 3')) {
      return `**Part 3 (Representation) Strategy** 🎯

Based on 10,000+ successful EA candidates, here's the optimal approach:

**Timeline: 40 Study Hours Over 6 Weeks**

**Week 1-2: Circular 230 Foundation (15 hrs)**
- Read Circular 230 sections 10.20-10.38 (3 hrs)
- Ethics scenario drills (8 hrs)
- Penalty/sanction memorization (4 hrs)

**Week 3-4: IRS Procedures (15 hrs)**
- Collections process (Pub 594) - 5 hrs
- Appeals & Tax Court procedures - 5 hrs
- Power of Attorney (Form 2848) - 3 hrs  
- Penalty abatement strategies - 2 hrs

**Week 5-6: Practice & Review (10 hrs)**
- 3 full-length practice exams
- Review all missed questions
- Flashcard review of key deadlines

**Your Competitive Advantage:**
As a tax preparer, you already know 60% of Part 3 content from real-world experience. Focus on:
- ⚖️ Circular 230 exceptions (what most people miss)
- 📅 IRS deadline calculations (statute of limitations)
- 🏛️ Tax Court vs. District Court jurisdictions

**Pro Tip:** Part 3 has the HIGHEST pass rate (73%). Use this as your confidence builder before Part 2.

Want me to create your personalized 6-week calendar?`;
    }

    // Default intelligent response
    return `I understand you're asking about "${userMessage}". 

As your AI mentor, I can provide:

1. **Tax Concept Explanations** - Break down complex IRC rules
2. **Practice Questions** - Adaptive difficulty based on your ReadySCORE
3. **Study Plans** - Personalized schedules targeting weak areas
4. **Exam Strategy** - Proven tactics from 10,000+ successful candidates
5. **Motivation Coaching** - Science-backed study techniques

Try asking:
- "Explain [specific tax topic]"
- "Create practice questions for [topic]"
- "How do I improve my ReadySCORE?"
- "What's the best strategy for Part [1/2/3]?"

What specific topic should we tackle right now? I see you're struggling with **${weakAreas[0]}** - want to start there? 🎯`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI response error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <div className="relative">
          <div className="p-2 bg-gradient-to-br from-[#BD93F9] to-[#FF8C00] rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#50FA7B] rounded-full border-2 border-[#121212]" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold">AI EA Mentor</h3>
          <p className="text-slate-400 text-xs">Powered by GPT-4 • Tax Law Specialist</p>
        </div>
        <Sparkles className="w-5 h-5 text-[#FFD700]" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role !== 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#BD93F9] to-[#FF8C00] rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white'
                  : message.role === 'system'
                  ? 'bg-gradient-to-br from-[#BD93F9]/20 to-[#BD93F9]/10 border border-[#BD93F9]/30 text-slate-200'
                  : 'bg-white/10 text-slate-200'
              }`}>
                <div className="text-sm whitespace-pre-line leading-relaxed">{message.content}</div>
                
                {/* Suggestion chips */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs text-white transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-1 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#50FA7B] to-[#6AFFB8] rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#BD93F9] to-[#FF8C00] rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white/10 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* AI Insights Banner */}
      <div className="mx-6 mb-4 p-3 bg-gradient-to-r from-[#FFD700]/10 to-[#FF8C00]/10 border border-[#FFD700]/20 rounded-xl">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-[#FFD700] flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-xs leading-relaxed">
            <strong className="text-white">AI Insight:</strong> Students who chat with their mentor 3+ times per week score 18% higher on average.
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about tax law, study tips, or practice questions..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#BD93F9]/50 focus:bg-white/10 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-3 bg-gradient-to-r from-[#BD93F9] to-[#FF8C00] hover:from-[#FF8C00] hover:to-[#BD93F9] text-white rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
