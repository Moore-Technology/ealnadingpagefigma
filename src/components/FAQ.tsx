import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQProps {
  onBack: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is EA Coach Pro?",
        answer: "EA Coach Pro is an AI‑powered study coach built specifically for the Enrolled Agent exam. It gives you a clear study path, personalized practice, and realistic exam simulations so you're not just doing random questions—you're actually getting exam‑ready."
      },
      {
        question: "Who is EA Coach Pro designed for?",
        answer: "It's made for busy tax pros, career changers, and repeat test‑takers who want structure, accountability, and data‑driven feedback instead of guessing what to study next."
      },
      {
        question: "How do I get started?",
        answer: "Create an account, set your exam goal and date, then take a short diagnostic quiz. EA Coach Pro instantly turns that into a personalized study plan and \"Today's Mission\" so you always know exactly what to do next."
      }
    ]
  },
  {
    title: "How It Works",
    items: [
      {
        question: "How does the AI coach actually help me?",
        answer: "Behind the scenes, multiple AI agents work together: one analyzes your performance, another explains tax law using IRS sources, and another generates practice questions and scenarios. The result is clear explanations, targeted drills, and smart suggestions based on your real weaknesses."
      },
      {
        question: "What is ReadyScore and why does it matter?",
        answer: "ReadyScore is a 0–100 estimate of how prepared you are for each exam part. It factors in accuracy, difficulty, recency, and mock exam performance to answer the question that really matters: \"If I sat for the exam soon, how likely am I to pass?\""
      },
      {
        question: "What are Daily Missions?",
        answer: "Daily Missions are short, AI‑curated study tasks that combine weak areas, slipping topics, and mixed review. They're designed as your minimum effective dose of studying—complete them consistently and you'll build momentum without burning out."
      },
      {
        question: "What's the difference between Topic Practice, Sprint Mode, and Exam Simulation?",
        answer: "Topic Practice lets you deep‑dive into specific units with explanations and unlimited questions. Sprint Mode gives you fast, timed sets to train focus and decision‑making under pressure. Exam Simulation recreates full Prometric‑style mock exams that feel like the real thing."
      }
    ]
  },
  {
    title: "Study Strategy & Progress",
    items: [
      {
        question: "How does EA Coach Pro find and fix my weak areas?",
        answer: "Every question you answer updates a detailed knowledge profile across 100+ tax topics. The app highlights weak areas on your dashboard, pushes them into your Daily Missions, and lets you jump straight into fix‑this‑now practice for any problem topic."
      },
      {
        question: "Do I have to follow the recommended path, or can I choose my own?",
        answer: "You can always choose your own topics and modes. That said, EA Coach Pro is optimized around a recommended flow—diagnostic → personalized plan → guided topic practice → ethics roleplay → full mock exams—so following it gives you the most efficient route to a passing score."
      },
      {
        question: "What role does Ethics Roleplay play in my prep?",
        answer: "Ethics Roleplay turns Circular 230 and practice rules into realistic scenarios and decisions. It helps you internalize how the rules apply with clients, which boosts your Part 3 score and reduces the chance of avoidable ethics mistakes on exam day."
      },
      {
        question: "Can this app guarantee that I'll pass the EA exam?",
        answer: "No app can guarantee a pass. What EA Coach Pro does is stack the odds in your favor by giving you an evidence‑based study plan, smart repetition, realistic simulations, and constant feedback so you walk into the exam confident instead of guessing."
      }
    ]
  },
  {
    title: "Exam Experience",
    items: [
      {
        question: "How realistic is the exam simulator?",
        answer: "The simulator mirrors the Prometric experience: timing, navigation, question flow, and full‑length 100‑question sessions. You'll get detailed score reports by topic so the real exam feels like just another practice run, not a surprise."
      },
      {
        question: "What's the recommended order to tackle the three EA exam parts?",
        answer: "The platform is tuned around a proven sequence of Part 1 → Part 3 → Part 2. You build a strong individual tax foundation, lock in ethics and procedures, then handle the more complex business material when you're ready."
      }
    ]
  },
  {
    title: "Account, Data & Privacy",
    items: [
      {
        question: "How is my data stored and protected?",
        answer: "Your account is managed through a secure authentication provider, and your study data lives in an encrypted PostgreSQL database behind modern access controls. All communication uses HTTPS, and your performance data is only used to power your personalized experience and anonymized analytics."
      },
      {
        question: "Do you use my study data to train the AI?",
        answer: "Your data is used primarily to personalize your plan—calculating mastery, ReadyScore, missions, and insights. Any model‑level improvements or analytics are done in ways that protect individual user privacy; for full details, refer to the app's privacy policy."
      }
    ]
  }
];

export function FAQ({ onBack }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key);
    } else {
      newOpenItems.add(key);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8C00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#50FA7B]/10 rounded-full blur-[120px]" />
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything a new student needs to know before getting started.
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-12">
            {faqData.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-3xl font-bold text-white mb-6">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => {
                    const key = `${sectionIndex}-${itemIndex}`;
                    const isOpen = openItems.has(key);
                    
                    return (
                      <div
                        key={itemIndex}
                        className="bg-white/[0.05] backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(sectionIndex, itemIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.03] transition-colors"
                        >
                          <span className="text-lg font-semibold text-white pr-4">
                            {item.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-[#FF8C00] flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-slate-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-[#FF8C00]/20 to-white/[0.08] backdrop-blur-xl rounded-2xl border border-[#FF8C00]/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                Still have questions?
              </h3>
              <p className="text-slate-300 mb-6">
                Try EA Coach Pro with a 7-day free trial and see how it works for yourself.
              </p>
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 font-semibold"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
