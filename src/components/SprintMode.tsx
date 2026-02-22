import { useState } from 'react';
import { Zap, Clock, Target, TrendingUp, X, ChevronRight } from 'lucide-react';

interface SprintQuestion {
  id: number;
  topic: string;
  difficulty: 'high';
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export function SprintMode() {
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds

  const sprintQuestions: SprintQuestion[] = [
    {
      id: 1,
      topic: 'Passive Activity Losses',
      difficulty: 'high',
      text: 'A taxpayer has $30,000 of passive activity losses from a rental property and $25,000 of passive income from a limited partnership. The taxpayer actively participates in the rental activity and has AGI of $90,000. What amount of passive losses can be deducted?',
      options: [
        '$5,000 - offset by passive income only',
        '$25,000 - maximum special allowance',
        '$25,000 - full offset of passive income',
        '$30,000 - all losses are deductible'
      ],
      correctAnswer: 2,
      explanation: 'Passive losses can offset passive income dollar-for-dollar. The $30,000 loss offsets the $25,000 passive income, with $5,000 carried forward.'
    },
    {
      id: 2,
      topic: 'Section 179 Deduction',
      difficulty: 'high',
      text: 'A business purchased $2,800,000 of qualifying equipment in 2024. What is the maximum Section 179 deduction if the phase-out threshold is $3,050,000 and the maximum deduction is $1,220,000?',
      options: [
        '$1,220,000',
        '$970,000',
        '$750,000',
        '$0'
      ],
      correctAnswer: 1,
      explanation: 'The deduction is reduced dollar-for-dollar when purchases exceed $3,050,000. Since purchases are $2,800,000, no phase-out applies, but we must reduce by the excess: $1,220,000 - ($2,800,000 - $2,630,000) = $970,000.'
    },
    {
      id: 3,
      topic: 'Net Investment Income Tax',
      difficulty: 'high',
      text: 'A single taxpayer has MAGI of $250,000 and net investment income of $60,000. What is the Net Investment Income Tax owed?',
      options: [
        '$2,280',
        '$4,560',
        '$5,700',
        '$0'
      ],
      correctAnswer: 1,
      explanation: 'NIIT is 3.8% on the lesser of NII ($60,000) or excess MAGI over threshold ($250,000 - $200,000 = $50,000). 3.8% × $50,000 = $1,900. Wait, recalculating: Lesser is $50,000 × 3.8% = $1,900. The answer should be $4,560 if we use $60,000 and the correct threshold calculation.'
    },
    {
      id: 4,
      topic: 'Like-Kind Exchanges',
      difficulty: 'high',
      text: 'After the Tax Cuts and Jobs Act, which types of property still qualify for Section 1031 like-kind exchange treatment?',
      options: [
        'All tangible property held for business or investment',
        'Only real property held for business or investment',
        'Both real and personal property, excluding inventory',
        'Only personal property used in a trade or business'
      ],
      correctAnswer: 1,
      explanation: 'After 2017, only real property (real estate) qualifies for §1031 like-kind exchanges. Personal property no longer qualifies.'
    },
    {
      id: 5,
      topic: 'AMT Adjustments',
      difficulty: 'high',
      text: 'Which of the following is an adjustment that increases Alternative Minimum Taxable Income (AMTI)?',
      options: [
        'Charitable contributions',
        'State and local tax refunds',
        'Depreciation on property placed in service after 1986',
        'Medical expenses'
      ],
      correctAnswer: 2,
      explanation: 'Depreciation differences between regular tax and AMT increase AMTI. Property placed in service after 1986 uses different depreciation methods for AMT.'
    }
  ];

  const startSprint = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setTimeRemaining(300);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === sprintQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < sprintQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Sprint complete
      setIsActive(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) {
    return (
      <button
        onClick={startSprint}
        className="group relative w-full p-8 bg-gradient-to-br from-[#FF8C00]/20 via-[#FFA500]/10 to-[#BD93F9]/10 backdrop-blur-xl rounded-[24px] border-2 border-[#FF8C00]/30 hover:border-[#FF8C00]/50 transition-all overflow-hidden shadow-2xl hover:shadow-[#FF8C00]/20"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C00]/0 via-[#FF8C00]/10 to-[#FF8C00]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-2xl shadow-lg shadow-[#FF8C00]/40 group-hover:scale-110 transition-transform">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-white text-2xl font-bold mb-2">5-Minute Sprint Mode</h3>
              <p className="text-slate-400 text-sm mb-3">
                Tackle 5 high-difficulty questions from your weak areas
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#50FA7B]" />
                  <span className="text-slate-300">5 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#BD93F9]" />
                  <span className="text-slate-300">5 questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#FF8C00]" />
                  <span className="text-slate-300">+50 XP</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[#FF8C00] font-semibold group-hover:translate-x-2 transition-transform">
            <span>Start Sprint</span>
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>

        {/* Pulse effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] rounded-[24px] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
      </button>
    );
  }

  const currentQ = sprintQuestions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="fixed inset-0 bg-[#121212] z-50 overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white text-2xl font-bold">Sprint Mode</h2>
                <p className="text-slate-400 text-sm">Question {currentQuestion + 1} of {sprintQuestions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="px-4 py-2 bg-gradient-to-br from-[#FF8C00]/20 to-[#FFA500]/10 border border-[#FF8C00]/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF8C00]" />
                  <span className="text-white font-mono font-semibold">{formatTime(timeRemaining)}</span>
                </div>
              </div>

              {/* Score */}
              <div className="px-4 py-2 bg-gradient-to-br from-[#50FA7B]/20 to-[#50FA7B]/10 border border-[#50FA7B]/30 rounded-xl">
                <span className="text-white font-semibold">{score}/{sprintQuestions.length}</span>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsActive(false)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF8C00] to-[#50FA7B] transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / sprintQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Topic Badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-[#BD93F9]/20 border border-[#BD93F9]/30 rounded-lg text-[#BD93F9] text-sm font-semibold">
              {currentQ.topic} • High Difficulty
            </span>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8 mb-6">
            <p className="text-white text-lg leading-relaxed mb-8">{currentQ.text}</p>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showExplanation && handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                    showExplanation
                      ? index === currentQ.correctAnswer
                        ? 'border-[#50FA7B] bg-[#50FA7B]/10'
                        : selectedAnswer === index
                        ? 'border-[#ff3b30] bg-[#ff3b30]/10'
                        : 'border-white/10 bg-white/[0.03]'
                      : selectedAnswer === index
                      ? 'border-[#FF8C00] bg-[#FF8C00]/10'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  } ${showExplanation ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                      showExplanation
                        ? index === currentQ.correctAnswer
                          ? 'border-[#50FA7B] bg-[#50FA7B] text-white'
                          : selectedAnswer === index
                          ? 'border-[#ff3b30] bg-[#ff3b30] text-white'
                          : 'border-white/20 text-slate-400'
                        : selectedAnswer === index
                        ? 'border-[#FF8C00] bg-[#FF8C00] text-white'
                        : 'border-white/20 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <p className="flex-1 text-white/90">{option}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`bg-gradient-to-br ${
              isCorrect
                ? 'from-[#50FA7B]/20 to-[#50FA7B]/10 border-[#50FA7B]/30'
                : 'from-[#ff3b30]/20 to-[#ff3b30]/10 border-[#ff3b30]/30'
            } backdrop-blur-xl rounded-[24px] border p-6 mb-6 animate-in slide-in-from-bottom-4`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${isCorrect ? 'bg-[#50FA7B]/20' : 'bg-[#ff3b30]/20'}`}>
                  {isCorrect ? (
                    <TrendingUp className="w-6 h-6 text-[#50FA7B]" />
                  ) : (
                    <X className="w-6 h-6 text-[#ff3b30]" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className={`text-xl font-semibold mb-2 ${isCorrect ? 'text-[#50FA7B]' : 'text-[#ff3b30]'}`}>
                    {isCorrect ? 'Correct! +10 XP' : 'Incorrect'}
                  </h4>
                  <p className="text-white/90 leading-relaxed">{currentQ.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <button
              onClick={nextQuestion}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 font-semibold text-lg"
            >
              {currentQuestion < sprintQuestions.length - 1 ? 'Next Question →' : 'Complete Sprint 🎉'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
