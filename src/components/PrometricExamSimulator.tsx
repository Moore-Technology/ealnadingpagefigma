import { useState, useEffect } from 'react';
import { Calculator, Flag, X, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  answered: boolean;
  flagged: boolean;
  selectedAnswer: number | null;
  strikedOptions: number[];
}

export function PrometricExamSimulator() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(12600); // 3.5 hours in seconds
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorValue, setCalculatorValue] = useState('0');
  
  // Mock exam questions (in production, load from API)
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: 'A taxpayer received Form 1099-DIV showing $2,500 in ordinary dividends and $800 in qualified dividends from a mutual fund. The taxpayer held the shares for 90 days during the 121-day period beginning 60 days before the ex-dividend date. How much of the dividend income qualifies for the preferential capital gains tax rate?',
      options: [
        'A) $0',
        'B) $800',
        'C) $1,700',
        'D) $2,500'
      ],
      correctAnswer: 1,
      answered: false,
      flagged: false,
      selectedAnswer: null,
      strikedOptions: []
    },
    {
      id: 2,
      text: 'Under Circular 230, an Enrolled Agent may charge a contingent fee for which of the following services?',
      options: [
        'A) Preparation of an original tax return',
        'B) Preparation of an amended return claiming a refund',
        'C) Filing a request for a private letter ruling',
        'D) Providing tax planning advice'
      ],
      correctAnswer: 1,
      answered: false,
      flagged: false,
      selectedAnswer: null,
      strikedOptions: []
    },
    // Add 98 more questions in production
    ...Array.from({ length: 98 }, (_, i) => ({
      id: i + 3,
      text: `Sample question ${i + 3} about tax law...`,
      options: ['A) Option 1', 'B) Option 2', 'C) Option 3', 'D) Option 4'],
      correctAnswer: Math.floor(Math.random() * 4),
      answered: false,
      flagged: false,
      selectedAnswer: null,
      strikedOptions: []
    }))
  ]);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const updated = [...questions];
    updated[currentQuestion].selectedAnswer = optionIndex;
    updated[currentQuestion].answered = true;
    setQuestions(updated);
  };

  const handleStrikeOption = (optionIndex: number) => {
    const updated = [...questions];
    const striked = updated[currentQuestion].strikedOptions;
    if (striked.includes(optionIndex)) {
      updated[currentQuestion].strikedOptions = striked.filter(i => i !== optionIndex);
    } else {
      updated[currentQuestion].strikedOptions = [...striked, optionIndex];
    }
    setQuestions(updated);
  };

  const handleFlagQuestion = () => {
    const updated = [...questions];
    updated[currentQuestion].flagged = !updated[currentQuestion].flagged;
    setQuestions(updated);
  };

  const handleCalculator = (value: string) => {
    if (value === 'C') {
      setCalculatorValue('0');
    } else if (value === '=') {
      try {
        setCalculatorValue(eval(calculatorValue).toString());
      } catch {
        setCalculatorValue('Error');
      }
    } else {
      setCalculatorValue(calculatorValue === '0' ? value : calculatorValue + value);
    }
  };

  const currentQ = questions[currentQuestion];
  const answeredCount = questions.filter(q => q.answered).length;
  const flaggedCount = questions.filter(q => q.flagged).length;

  return (
    <div className="min-h-screen bg-[#E5E5E5]">
      {/* Prometric-style Header - Gray/White Theme */}
      <div className="bg-white border-b-2 border-gray-300 shadow-md">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex items-center gap-4">
            <div className="text-gray-700 font-semibold text-lg">Prometric Testing Center</div>
            <div className="text-gray-500 text-sm">EA Exam Simulation</div>
          </div>

          {/* Timer - Prominent */}
          <div className={`px-6 py-2 rounded-lg font-mono text-2xl font-bold ${
            timeRemaining < 600 ? 'bg-red-100 text-red-700 border-2 border-red-400' : 'bg-gray-100 text-gray-800 border-2 border-gray-300'
          }`}>
            {formatTime(timeRemaining)}
          </div>

          {/* Tools */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold flex items-center gap-2 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </button>
            <button
              onClick={handleFlagQuestion}
              className={`px-4 py-2 rounded font-semibold flex items-center gap-2 transition-colors ${
                currentQ.flagged
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <Flag className="w-4 h-4" />
              Flag
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Question Navigator */}
        <div className="w-64 bg-white border-r-2 border-gray-300 p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Question Palette</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <span>Not Answered ({100 - answeredCount})</span>
              </div>
            </div>
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded font-semibold text-sm transition-all ${
                  idx === currentQuestion
                    ? 'ring-2 ring-blue-600 scale-110'
                    : ''
                } ${
                  q.flagged
                    ? 'bg-yellow-400 text-white'
                    : q.answered
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Question Area */}
        <div className="flex-1 bg-white p-8 overflow-y-auto">
          <div className="max-w-[900px] mx-auto">
            {/* Question Header */}
            <div className="mb-6 pb-4 border-b-2 border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-gray-800 font-semibold text-lg">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                {currentQ.flagged && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 border border-yellow-400 rounded">
                    <Flag className="w-4 h-4 text-yellow-700" />
                    <span className="text-yellow-700 text-sm font-semibold">Flagged for Review</span>
                  </div>
                )}
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8 text-gray-800 leading-relaxed text-lg">
              {currentQ.text}
            </div>

            {/* Answer Options */}
            <div className="space-y-4">
              {currentQ.options.map((option, idx) => {
                const isStriked = currentQ.strikedOptions.includes(idx);
                const isSelected = currentQ.selectedAnswer === idx;
                
                return (
                  <div
                    key={idx}
                    className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    } ${isStriked ? 'opacity-40' : ''}`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      checked={isSelected}
                      onChange={() => handleSelectAnswer(idx)}
                      className="w-5 h-5 mr-4 accent-blue-600"
                    />
                    <label
                      className={`flex-1 cursor-pointer text-gray-800 ${
                        isStriked ? 'line-through' : ''
                      }`}
                    >
                      {option}
                    </label>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStrikeOption(idx);
                      }}
                      className="ml-4 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
                    >
                      {isStriked ? 'Undo' : 'Strike'}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-gray-200">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 text-gray-800 rounded font-semibold flex items-center gap-2 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="text-gray-600 text-sm">
                {answeredCount} of {questions.length} answered
              </div>

              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded font-semibold flex items-center gap-2 transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      {showCalculator && (
        <div className="fixed top-20 right-20 bg-white rounded-lg shadow-2xl border-2 border-gray-300 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Calculator</h3>
            <button onClick={() => setShowCalculator(false)} className="text-gray-600 hover:text-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-gray-100 p-3 rounded mb-3 text-right font-mono text-2xl text-gray-800 min-w-[200px]">
            {calculatorValue}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <button
                key={btn}
                onClick={() => handleCalculator(btn)}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded font-semibold text-gray-800 transition-colors"
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => handleCalculator('C')}
              className="col-span-4 p-3 bg-red-500 hover:bg-red-600 text-white rounded font-semibold transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
