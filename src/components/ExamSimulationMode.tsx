import { useState } from 'react';
import { Calculator, Flag, Clock, ChevronLeft, ChevronRight, HelpCircle, X, CheckSquare } from 'lucide-react';
import { MockExamResults } from './MockExamResults';
import { WeakAreaStudyPlan } from './WeakAreaStudyPlan';

interface Question {
  id: number;
  text: string;
  options: string[];
  isExperimental: boolean;
  flagged: boolean;
  strikethrough: boolean[];
  selectedAnswer: number | null;
}

type ViewState = 'exam' | 'results' | 'study-plan';

interface DomainScore {
  domain: string;
  topic: string;
  rawScore: number;
  totalQuestions: number;
  proficiencyLevel: 'Above' | 'Near' | 'Below';
  level: 1 | 2 | 3;
  irsPublications: string[];
}

export function ExamSimulationMode() {
  const [viewState, setViewState] = useState<ViewState>('exam');
  const [weakDomains, setWeakDomains] = useState<DomainScore[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(12600); // 3.5 hours in seconds
  const [showExperimentalHint, setShowExperimentalHint] = useState(false);
  const [showEndExamConfirm, setShowEndExamConfirm] = useState(false);
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: 'Which of the following is NOT a requirement for a taxpayer to claim Head of Household filing status?',
      options: [
        'The taxpayer must be unmarried or considered unmarried on the last day of the year',
        'The taxpayer must pay more than half the cost of keeping up a home for the year',
        'A qualifying person must live with the taxpayer for more than half the year',
        'The taxpayer must have earned income from wages or self-employment'
      ],
      isExperimental: false,
      flagged: false,
      strikethrough: [false, false, false, false],
      selectedAnswer: null
    },
    {
      id: 2,
      text: 'Under Circular 230, what is the maximum penalty that can be imposed for each violation of the regulations?',
      options: [
        '$1,000 per violation',
        '$5,000 per violation',
        '$10,000 per violation',
        'No monetary penalty, only suspension'
      ],
      isExperimental: true,
      flagged: false,
      strikethrough: [false, false, false, false],
      selectedAnswer: null
    }
  ]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleStrikethrough = (optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].strikethrough[optionIndex] = 
      !newQuestions[currentQuestion].strikethrough[optionIndex];
    setQuestions(newQuestions);
  };

  const toggleFlag = () => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].flagged = !newQuestions[currentQuestion].flagged;
    setQuestions(newQuestions);
  };

  const selectAnswer = (optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].selectedAnswer = optionIndex;
    setQuestions(newQuestions);
  };

  const handleEndExam = () => {
    setShowEndExamConfirm(true);
  };

  const confirmEndExam = () => {
    setViewState('results');
    setShowEndExamConfirm(false);
  };

  const handleGenerateStudyPlan = (domains: DomainScore[]) => {
    setWeakDomains(domains);
    setViewState('study-plan');
  };

  // Show results view
  if (viewState === 'results') {
    return (
      <MockExamResults 
        onClose={() => setViewState('exam')} 
        onGenerateStudyPlan={handleGenerateStudyPlan}
      />
    );
  }

  // Show study plan view
  if (viewState === 'study-plan') {
    return (
      <WeakAreaStudyPlan 
        weakDomains={weakDomains}
        onClose={() => setViewState('results')} 
      />
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-white dark:bg-white">
      {/* Prometric-style Header */}
      <div className="border-b border-gray-300 bg-gray-50 px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-gray-700 font-semibold">IRS Special Enrollment Examination (SEE)</div>
            <div className="text-gray-500 text-sm">Part 1: Individuals</div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-mono font-semibold">{formatTime(timeRemaining)}</span>
            </div>

            {/* Calculator */}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <Calculator className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Calculator</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Question Area */}
          <div className="col-span-9 bg-white border border-gray-300 rounded-lg p-8">
            {/* Question Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-gray-900 font-semibold text-lg">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                {currentQ.isExperimental && (
                  <div className="relative">
                    <button
                      onClick={() => setShowExperimentalHint(!showExperimentalHint)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <HelpCircle className="w-5 h-5 text-blue-500" />
                    </button>
                    {showExperimentalHint && (
                      <div className="absolute top-8 left-0 w-80 bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg z-10">
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-blue-800 font-semibold text-sm">Experimental Question</div>
                          <button onClick={() => setShowExperimentalHint(false)}>
                            <X className="w-4 h-4 text-blue-600" />
                          </button>
                        </div>
                        <p className="text-blue-700 text-xs leading-relaxed">
                          This question is marked as experimental and does not count toward your final score. 
                          15 out of 100 questions on the real exam are experimental and used for future test development.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={toggleFlag}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                  currentQ.flagged
                    ? 'bg-amber-100 border border-amber-300 text-amber-700'
                    : 'bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Flag className={`w-4 h-4 ${currentQ.flagged ? 'fill-amber-500' : ''}`} />
                <span className="text-sm font-medium">
                  {currentQ.flagged ? 'Flagged' : 'Flag for Review'}
                </span>
              </button>
            </div>

            {/* Question Text */}
            <div className="mb-8 text-gray-800 text-lg leading-relaxed">
              {currentQ.text}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  onDoubleClick={() => toggleStrikethrough(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    currentQ.selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  } ${currentQ.strikethrough[index] ? 'opacity-40' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      currentQ.selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-400'
                    }`}>
                      {currentQ.selectedAnswer === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <div className={`flex-1 text-gray-800 ${currentQ.strikethrough[index] ? 'line-through' : ''}`}>
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 text-sm text-gray-500 italic">
              💡 Tip: Double-click any option to strike through for process of elimination
            </div>
          </div>

          {/* Question Navigator Sidebar */}
          <div className="col-span-3">
            <div className="bg-white border border-gray-300 rounded-lg p-4 sticky top-6">
              <div className="text-gray-900 font-semibold mb-4">Question Navigator</div>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square rounded-lg border-2 text-sm font-semibold transition-all ${
                      index === currentQuestion
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : q.selectedAnswer !== null
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : q.flagged
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {index + 1}
                    {q.flagged && <Flag className="w-3 h-3 absolute top-0 right-0 fill-amber-500 text-amber-500" />}
                  </button>
                ))}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 bg-blue-500 rounded" />
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-green-500 bg-green-50 rounded" />
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-amber-400 bg-amber-50 rounded" />
                  <span className="text-gray-600">Flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 bg-white rounded" />
                  <span className="text-gray-600">Not Answered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 rounded-lg font-semibold transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            <div className="text-gray-600 text-sm">
              {questions.filter(q => q.selectedAnswer !== null).length} of {questions.length} answered
            </div>
            <button
              onClick={handleEndExam}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              <CheckSquare className="w-5 h-5" />
              End Exam
            </button>
          </div>

          <button
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            disabled={currentQuestion === questions.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* End Exam Confirmation */}
      {showEndExamConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl max-w-md">
            <h3 className="text-gray-900 font-bold text-xl mb-4">End Practice Exam?</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to end this practice exam? You have answered{' '}
              <strong>{questions.filter(q => q.selectedAnswer !== null).length}</strong> of{' '}
              <strong>{questions.length}</strong> questions.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndExamConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Continue Exam
              </button>
              <button
                onClick={confirmEndExam}
                className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Yes, End Exam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple Calculator Overlay */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 font-semibold">Calculator</h3>
              <button onClick={() => setShowCalculator(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="w-64 h-80 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
              <p className="text-gray-500 text-sm">Calculator interface here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}