import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Book, Scale } from 'lucide-react';

interface Scenario {
  id: number;
  clientName: string;
  clientAvatar: string;
  situation: string;
  shadyRequest: string;
  choices: {
    text: string;
    isEthical: boolean;
    circular230Reference: string;
    outcome: string;
    practiceRightsImpact: number; // -30 to +10
  }[];
}

export function EthicsRoleplayRPG() {
  const [practiceRights, setPracticeRights] = useState(100);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [scenariosCompleted, setScenariosCompleted] = useState(0);

  const scenarios: Scenario[] = [
    {
      id: 1,
      clientName: 'Marcus Chen',
      clientAvatar: '👨‍💼',
      situation: 'A successful restaurant owner comes to you during tax season. He mentions that he keeps two sets of books - one for the bank and one for "reality."',
      shadyRequest: '"Can you just use the bank version for my tax return? The real numbers would make my taxes too high, and besides, the IRS will never know."',
      choices: [
        {
          text: 'Prepare the return using the "bank version" to keep the client happy. After all, it\'s his business.',
          isEthical: false,
          circular230Reference: '§10.22 - Diligence as to Accuracy',
          outcome: 'CENSURED - You have been suspended from practice before the IRS for 2 years. You failed to exercise due diligence. When you know or should know that information is incorrect, you cannot rely on it.',
          practiceRightsImpact: -30
        },
        {
          text: 'Explain that you cannot prepare a return you know contains false information. Request the accurate books or decline the engagement.',
          isEthical: true,
          circular230Reference: '§10.22 - Diligence as to Accuracy',
          outcome: 'EXCELLENT CHOICE - You protected your license and upheld your ethical duty. Under §10.22, you must make reasonable inquiries if information appears incorrect. The client leaves upset, but your practice rights remain intact.',
          practiceRightsImpact: 10
        },
        {
          text: 'Agree to prepare the return but add a disclaimer saying "prepared based on client-provided information."',
          isEthical: false,
          circular230Reference: '§10.22 - Diligence as to Accuracy',
          outcome: 'REPRIMAND - A disclaimer does not absolve you of responsibility. You had actual knowledge of incorrect information. Your practice rights are placed on probation.',
          practiceRightsImpact: -15
        }
      ]
    },
    {
      id: 2,
      clientName: 'Sarah Mitchell',
      clientAvatar: '👩‍🦰',
      situation: 'A long-time client calls in a panic. The IRS is auditing her 2021 return. She asks if you can help her prepare an amended return to "fix some issues" before the auditor finds them.',
      shadyRequest: '"I\'ll pay you 25% of whatever tax you save me. This is worth $50,000 to me if you can make this go away."',
      choices: [
        {
          text: 'Accept the 25% contingency fee offer. She\'s desperate and willing to pay well.',
          isEthical: false,
          circular230Reference: '§10.27 - Fees',
          outcome: 'DISBARRED - Contingent fees are PROHIBITED for preparing original tax returns. While they ARE allowed for amended returns and audits, this situation involves preparing an amended return DURING an audit, which is not permitted under the exception.',
          practiceRightsImpact: -30
        },
        {
          text: 'Explain you can help with the audit representation for a contingent fee, but the amended return must be billed hourly.',
          isEthical: true,
          circular230Reference: '§10.27(b)(2) - Fees Exception',
          outcome: 'CORRECT - Contingent fees ARE allowed for representing clients in IRS examinations. However, if you need to prepare an amended return as part of the examination, that specific service should be billed separately at a fixed or hourly rate.',
          practiceRightsImpact: 10
        },
        {
          text: 'Decline the engagement entirely to avoid any appearance of impropriety.',
          isEthical: true,
          circular230Reference: '§10.27 - Fees',
          outcome: 'ACCEPTABLE - While overly cautious, declining is always an option. However, you missed an opportunity to help the client ethically. Contingent fees ARE allowed for audit representation.',
          practiceRightsImpact: 5
        }
      ]
    },
    {
      id: 3,
      clientName: 'David Rodriguez',
      clientAvatar: '🧔',
      situation: 'A potential client asks you to represent him in Tax Court. During the consultation, he mentions that his previous EA "disappeared" and took all his tax records.',
      shadyRequest: '"Can you represent me without a power of attorney? I don\'t have time to deal with IRS Form 2848. Just tell the court you\'re my EA."',
      choices: [
        {
          text: 'Agree to represent him in Tax Court without a power of attorney. You are an EA, so you have the right.',
          isEthical: false,
          circular230Reference: '§10.3 - Who May Practice',
          outcome: 'CENSURED - While EAs can practice before the IRS without a POA for INFORMAL matters, Tax Court representation REQUIRES a written power of attorney (Form 2848). You attempted unauthorized practice.',
          practiceRightsImpact: -20
        },
        {
          text: 'Explain that Tax Court requires Form 2848, but offer to help him complete it and obtain necessary records from the IRS.',
          isEthical: true,
          circular230Reference: '§10.3 & Tax Court Rule 60',
          outcome: 'EXCELLENT - You correctly identified the POA requirement and offered a solution. Tax Court has strict rules. Helping him obtain transcripts and reconstruct records shows competence and client service.',
          practiceRightsImpact: 10
        },
        {
          text: 'Tell him you can provide informal advice but cannot formally represent him in Tax Court without proper documentation.',
          isEthical: true,
          circular230Reference: '§10.7 - Communications',
          outcome: 'ACCEPTABLE - You avoided unauthorized practice. However, you could have been more helpful by explaining the POA process and offering to assist with it.',
          practiceRightsImpact: 5
        }
      ]
    }
  ];

  const currentSc = scenarios[currentScenario];

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowOutcome(true);
    
    const choice = currentSc.choices[choiceIndex];
    setPracticeRights(Math.max(0, Math.min(100, practiceRights + choice.practiceRightsImpact)));
    
    if (choice.isEthical) {
      setScenariosCompleted(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setShowOutcome(false);
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    }
  };

  const getPracticeStatus = () => {
    if (practiceRights >= 80) return { text: 'Good Standing', color: '#50FA7B', icon: CheckCircle };
    if (practiceRights >= 50) return { text: 'Probation', color: '#FFD700', icon: AlertTriangle };
    if (practiceRights >= 20) return { text: 'Suspended', color: '#FF8C00', icon: AlertTriangle };
    return { text: 'Disbarred', color: '#EF4444', icon: XCircle };
  };

  const status = getPracticeStatus();
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Ethics Roleplay: Circular 230</h1>
              <p className="text-slate-400">Make the right choices to maintain your practice rights</p>
            </div>
            
            {/* Practice Rights Meter */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 min-w-[300px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#BD93F9]" />
                  <span className="text-white font-semibold">Practice Rights</span>
                </div>
                <StatusIcon className="w-5 h-5" style={{ color: status.color }} />
              </div>
              
              <div className="mb-2">
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${practiceRights}%`,
                      backgroundColor: status.color
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold" style={{ color: status.color }}>{practiceRights}%</span>
                <span className="text-slate-400">{status.text}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Client Interrogation */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{currentSc.clientAvatar}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{currentSc.clientName}</h2>
              <div className="inline-flex px-3 py-1 bg-[#BD93F9]/20 border border-[#BD93F9]/30 rounded-full text-[#BD93F9] text-sm">
                Scenario {currentScenario + 1} of {scenarios.length}
              </div>
            </div>

            {/* Situation */}
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Book className="w-4 h-4 text-[#50FA7B]" />
                Situation
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{currentSc.situation}</p>
            </div>

            {/* Shady Request */}
            <div className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl border-2 border-red-500/40">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Client Request
              </h3>
              <p className="text-red-200 italic leading-relaxed">"{currentSc.shadyRequest}"</p>
            </div>

            {/* Stats */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-[#50FA7B] text-2xl font-bold">{scenariosCompleted}</div>
                  <div className="text-slate-400 text-sm">Ethical Choices</div>
                </div>
                <div>
                  <div className="text-[#BD93F9] text-2xl font-bold">{scenarios.length - currentScenario}</div>
                  <div className="text-slate-400 text-sm">Scenarios Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Your Response */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">How do you respond?</h2>

            {!showOutcome ? (
              <div className="space-y-4">
                {currentSc.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(idx)}
                    disabled={selectedChoice !== null}
                    className="w-full p-5 bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#FF8C00]/50 rounded-xl text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#FF8C00]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF8C00]/30 transition-colors">
                        <span className="text-[#FF8C00] font-bold">{String.fromCharCode(65 + idx)}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed flex-1">{choice.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Outcome */}
                <div className={`p-6 rounded-xl border-2 ${
                  currentSc.choices[selectedChoice!].isEthical
                    ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/40'
                    : 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/40'
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    {currentSc.choices[selectedChoice!].isEthical ? (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <h3 className="text-2xl font-bold text-green-400">Ethical Choice</h3>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 text-red-400" />
                        <h3 className="text-2xl font-bold text-red-400">Violation Detected</h3>
                      </>
                    )}
                  </div>
                  
                  <p className="text-white leading-relaxed mb-4">{currentSc.choices[selectedChoice!].outcome}</p>
                  
                  <div className="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
                    <Shield className="w-5 h-5 text-[#BD93F9]" />
                    <div>
                      <div className="text-[#BD93F9] text-sm font-semibold">Circular 230 Reference</div>
                      <div className="text-slate-300 text-sm">{currentSc.choices[selectedChoice!].circular230Reference}</div>
                    </div>
                  </div>
                </div>

                {/* Practice Rights Impact */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-slate-400 text-sm mb-2">Practice Rights Impact</div>
                  <div className={`text-3xl font-bold ${
                    currentSc.choices[selectedChoice!].practiceRightsImpact > 0 ? 'text-[#50FA7B]' : 'text-red-400'
                  }`}>
                    {currentSc.choices[selectedChoice!].practiceRightsImpact > 0 ? '+' : ''}
                    {currentSc.choices[selectedChoice!].practiceRightsImpact}%
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl font-semibold transition-all shadow-lg"
                >
                  {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'Complete Training'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
