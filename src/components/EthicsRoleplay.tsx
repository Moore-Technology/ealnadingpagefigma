import { useState } from 'react';
import { MessageCircle, TrendingUp, TrendingDown, BookOpen, AlertCircle } from 'lucide-react';

interface Scenario {
  id: number;
  clientName: string;
  clientAvatar: string;
  situation: string;
  question: string;
  responses: {
    text: string;
    isCorrect: boolean;
    explanation: string;
    circular230Reference: string;
  }[];
}

export function EthicsRoleplay() {
  const [reputation, setReputation] = useState(50);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      clientName: 'Mr. Johnson',
      clientAvatar: '👨‍💼',
      situation: 'A new client comes to you with a large cash business. He seems nervous and uncomfortable.',
      question: '"Listen, I made about $50K in cash tips this year that I didn\'t report. Can we just... you know... leave that off? Nobody will know."',
      responses: [
        {
          text: 'Agree to omit the cash income to keep the client happy',
          isCorrect: false,
          explanation: 'This violates your duty to advise clients on the importance of compliance. You cannot knowingly prepare a false return.',
          circular230Reference: 'Circular 230 § 10.22 - Diligence as to accuracy'
        },
        {
          text: 'Explain that all income must be reported and offer to help correct past returns',
          isCorrect: true,
          explanation: 'Correct! You must advise the client of their obligation to report all income. You can also inform them about the Voluntary Disclosure Program.',
          circular230Reference: 'Circular 230 § 10.34 - Standards for advising with respect to tax return positions'
        },
        {
          text: 'Report the client to the IRS immediately',
          isCorrect: false,
          explanation: 'While you cannot assist in fraud, you are not required to report the client. Your duty is to refuse to prepare an inaccurate return.',
          circular230Reference: 'Circular 230 § 10.21 - Knowledge of client\'s omission'
        },
        {
          text: 'Tell him to find another tax preparer who will do it',
          isCorrect: false,
          explanation: 'This fails to meet your standard of care. You should educate the client about their obligations, not pass them to someone else.',
          circular230Reference: 'Circular 230 § 10.33 - Best practices for tax advisors'
        }
      ]
    },
    {
      id: 2,
      clientName: 'Ms. Martinez',
      clientAvatar: '👩‍💼',
      situation: 'A long-time client wants to claim a charitable deduction for clothing donations.',
      question: '"I donated about $5,000 worth of clothes to Goodwill. I don\'t have any receipts, but can you just put down $5,000?"',
      responses: [
        {
          text: 'Enter $5,000 since it\'s below the threshold requiring receipts',
          isCorrect: false,
          explanation: 'Even though receipts aren\'t required for amounts under $250 per item, you must have a reasonable basis for the valuation.',
          circular230Reference: 'Circular 230 § 10.34 - Tax return positions must have a realistic possibility of success'
        },
        {
          text: 'Explain the substantiation requirements and help her estimate fair market value',
          isCorrect: true,
          explanation: 'Correct! You should educate the client on proper documentation and valuation methods for donated items.',
          circular230Reference: 'Circular 230 § 10.22 - Due diligence in preparing returns'
        },
        {
          text: 'Refuse to prepare the return unless she gets receipts',
          isCorrect: false,
          explanation: 'While documentation is important, receipts aren\'t required for every donation. You can help the client properly substantiate the deduction.',
          circular230Reference: 'Circular 230 § 10.33 - Best practices'
        },
        {
          text: 'Reduce the amount to $1,000 to be "safe"',
          isCorrect: false,
          explanation: 'Arbitrary adjustments without basis are not appropriate. You should help the client determine the actual fair market value.',
          circular230Reference: 'Circular 230 § 10.22 - Diligence as to accuracy'
        }
      ]
    }
  ];

  const scenario = scenarios[currentScenario];
  const maxReputation = 100;

  const handleResponse = (responseIndex: number) => {
    setSelectedResponse(responseIndex);
    setShowFeedback(true);
    
    const response = scenario.responses[responseIndex];
    if (response.isCorrect) {
      setReputation(Math.min(maxReputation, reputation + 10));
    } else {
      setReputation(Math.max(0, reputation - 15));
    }
  };

  const nextScenario = () => {
    setCurrentScenario((currentScenario + 1) % scenarios.length);
    setSelectedResponse(null);
    setShowFeedback(false);
  };

  const getReputationColor = () => {
    if (reputation >= 70) return 'from-[#50FA7B] to-[#6AFFB8]';
    if (reputation >= 40) return 'from-[#FF8C00] to-[#FFA500]';
    return 'from-[#ff3b30] to-[#ff453a]';
  };

  const getReputationLabel = () => {
    if (reputation >= 70) return 'Excellent Standing';
    if (reputation >= 40) return 'Good Standing';
    return 'At Risk';
  };

  return (
    <div className="min-h-screen bg-[#121212] dark p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-white text-3xl mb-2">IRS Ethics Roleplay</h1>
              <p className="text-slate-400">Navigate real-world ethical scenarios using Circular 230 principles</p>
            </div>
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-4">
              <div className="text-slate-400 text-sm mb-2">Scenario {currentScenario + 1} of {scenarios.length}</div>
              <div className="text-white text-2xl font-semibold">Circular 230 Training</div>
            </div>
          </div>

          {/* Reputation Meter */}
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#50FA7B]" />
                <div>
                  <div className="text-white font-semibold">Professional Reputation</div>
                  <div className="text-slate-400 text-sm">{getReputationLabel()}</div>
                </div>
              </div>
              <div className="text-white text-3xl font-bold">{reputation}/100</div>
            </div>
            <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getReputationColor()} rounded-full transition-all duration-500 shadow-lg`}
                style={{ width: `${reputation}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content - Split Screen */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Client Avatar & Situation */}
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-full flex items-center justify-center text-4xl shadow-lg shadow-[#FF8C00]/30">
                {scenario.clientAvatar}
              </div>
              <div>
                <div className="text-white text-xl font-semibold">{scenario.clientName}</div>
                <div className="text-slate-400 text-sm">New Client</div>
              </div>
            </div>

            {/* Situation Card */}
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-[#FF8C00]" />
                <span className="text-slate-300 font-semibold">Situation</span>
              </div>
              <p className="text-slate-400 leading-relaxed">{scenario.situation}</p>
            </div>

            {/* Client Question - Speech Bubble */}
            <div className="relative bg-gradient-to-br from-[#FF8C00]/20 to-[#FFA500]/10 border border-[#FF8C00]/30 rounded-2xl p-6">
              <div className="absolute -top-3 left-8 w-6 h-6 bg-gradient-to-br from-[#FF8C00]/20 to-[#FFA500]/10 border-l border-t border-[#FF8C00]/30 rotate-45" />
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#FF8C00] flex-shrink-0 mt-1" />
                <p className="text-white/90 leading-relaxed italic">"{scenario.question}"</p>
              </div>
            </div>

            {/* Visual Cue */}
            <div className="mt-6 flex items-center gap-2 text-slate-500 text-sm">
              <div className="w-2 h-2 bg-[#FF8C00] rounded-full animate-pulse" />
              <span>Awaiting your professional response...</span>
            </div>
          </div>

          {/* Right: Response Options */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
              <h3 className="text-white text-xl mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#BD93F9]" />
                Your Response Options
              </h3>

              <div className="space-y-3">
                {scenario.responses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleResponse(index)}
                    disabled={showFeedback}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                      selectedResponse === index
                        ? response.isCorrect
                          ? 'border-[#50FA7B] bg-[#50FA7B]/10'
                          : 'border-[#ff3b30] bg-[#ff3b30]/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                        selectedResponse === index
                          ? response.isCorrect
                            ? 'border-[#50FA7B] bg-[#50FA7B] text-white'
                            : 'border-[#ff3b30] bg-[#ff3b30] text-white'
                          : 'border-white/20 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <p className="flex-1 text-white/90 leading-relaxed">{response.text}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Panel */}
            {showFeedback && selectedResponse !== null && (
              <div className={`bg-gradient-to-br ${
                scenario.responses[selectedResponse].isCorrect
                  ? 'from-[#50FA7B]/20 to-[#50FA7B]/10 border-[#50FA7B]/30'
                  : 'from-[#ff3b30]/20 to-[#ff3b30]/10 border-[#ff3b30]/30'
              } backdrop-blur-xl rounded-[24px] border p-6 animate-in slide-in-from-bottom-4`}>
                <div className="flex items-start gap-4 mb-4">
                  {scenario.responses[selectedResponse].isCorrect ? (
                    <div className="p-3 bg-[#50FA7B]/20 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-[#50FA7B]" />
                    </div>
                  ) : (
                    <div className="p-3 bg-[#ff3b30]/20 rounded-xl">
                      <TrendingDown className="w-6 h-6 text-[#ff3b30]" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className={`text-xl font-semibold mb-2 ${
                      scenario.responses[selectedResponse].isCorrect ? 'text-[#50FA7B]' : 'text-[#ff3b30]'
                    }`}>
                      {scenario.responses[selectedResponse].isCorrect ? 'Excellent Choice! +10 Reputation' : 'Incorrect Response -15 Reputation'}
                    </h4>
                    <p className="text-white/90 leading-relaxed mb-4">
                      {scenario.responses[selectedResponse].explanation}
                    </p>
                    
                    {/* Circular 230 Reference */}
                    <div className="bg-white/[0.05] border border-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-[#BD93F9]" />
                        <span className="text-[#BD93F9] font-semibold text-sm">Legal Reference</span>
                      </div>
                      <p className="text-slate-300 text-sm">{scenario.responses[selectedResponse].circular230Reference}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextScenario}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 font-semibold"
                >
                  Next Scenario →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
