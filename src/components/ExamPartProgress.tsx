import { useState } from 'react';
import { User, Scale, Briefcase, Lock, CheckCircle, Clock, TrendingUp, AlertCircle, Lightbulb, Award } from 'lucide-react';

interface ExamPart {
  id: 1 | 2 | 3;
  title: string;
  subtitle: string;
  icon: 'user' | 'scale' | 'briefcase';
  status: 'locked' | 'available' | 'in-progress' | 'passed';
  difficulty: 'Foundation' | 'Moderate' | 'Advanced';
  recommendedOrder: number;
  estimatedHours: number;
  readyScore: number | null;
  passedDate: Date | null;
  topics: string[];
  whyThisOrder: string;
}

export function ExamPartProgress() {
  const [selectedPart, setSelectedPart] = useState<1 | 2 | 3 | null>(null);
  
  // First exam passed date - triggers 3-year countdown
  const firstPassDate = new Date('2024-09-15'); // Example: Part 1 passed
  const threeYearDeadline = new Date(firstPassDate);
  threeYearDeadline.setFullYear(threeYearDeadline.getFullYear() + 3);
  
  const daysRemaining = Math.ceil((threeYearDeadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const monthsRemaining = Math.floor(daysRemaining / 30);

  const examParts: ExamPart[] = [
    {
      id: 1,
      title: 'Part 1: Individuals',
      subtitle: 'Individual Tax Returns & Credits',
      icon: 'user',
      status: 'passed',
      difficulty: 'Foundation',
      recommendedOrder: 1,
      estimatedHours: 60,
      readyScore: 112,
      passedDate: firstPassDate,
      topics: ['Filing Status', 'Income Types', 'Deductions', 'Tax Credits', 'Basis'],
      whyThisOrder: 'Start here! This builds your foundation in tax law and is the most familiar content for tax preparers. Provides an early confidence boost.'
    },
    {
      id: 3,
      title: 'Part 3: Representation',
      subtitle: 'IRS Procedures & Circular 230 Ethics',
      icon: 'scale',
      status: 'in-progress',
      difficulty: 'Moderate',
      recommendedOrder: 2,
      estimatedHours: 40,
      readyScore: 87,
      passedDate: null,
      topics: ['Circular 230', 'Practice & Procedures', 'Collections', 'Appeals', 'Penalties'],
      whyThisOrder: 'Take second. Shortest study time and builds on Part 1 procedural knowledge. Keeps momentum going.'
    },
    {
      id: 2,
      title: 'Part 2: Businesses',
      subtitle: 'Business Entities & Complex Taxation',
      icon: 'briefcase',
      status: 'locked',
      difficulty: 'Advanced',
      recommendedOrder: 3,
      estimatedHours: 80,
      readyScore: null,
      passedDate: null,
      topics: ['S-Corps', 'C-Corps', 'Partnerships', 'Depreciation', 'Business Credits'],
      whyThisOrder: 'Save for last! Most difficult content. You\'ll need Part 1 fundamentals before tackling complex business taxation.'
    }
  ];

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'user':
        return <User className="w-6 h-6" />;
      case 'scale':
        return <Scale className="w-6 h-6" />;
      case 'briefcase':
        return <Briefcase className="w-6 h-6" />;
      default:
        return <User className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return {
          bg: 'from-[#50FA7B]/20 to-[#50FA7B]/10',
          border: 'border-[#50FA7B]/30',
          text: 'text-[#50FA7B]',
          label: 'PASSED ✓'
        };
      case 'in-progress':
        return {
          bg: 'from-[#FF8C00]/20 to-[#FFA500]/10',
          border: 'border-[#FF8C00]/30',
          text: 'text-[#FF8C00]',
          label: 'IN PROGRESS'
        };
      case 'available':
        return {
          bg: 'from-[#BD93F9]/20 to-[#BD93F9]/10',
          border: 'border-[#BD93F9]/30',
          text: 'text-[#BD93F9]',
          label: 'AVAILABLE'
        };
      case 'locked':
        return {
          bg: 'from-white/[0.05] to-white/[0.02]',
          border: 'border-white/10',
          text: 'text-slate-500',
          label: 'LOCKED'
        };
      default:
        return {
          bg: 'from-white/[0.08] to-white/[0.03]',
          border: 'border-white/10',
          text: 'text-slate-400',
          label: 'AVAILABLE'
        };
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Foundation':
        return 'text-[#50FA7B]';
      case 'Moderate':
        return 'text-[#FFD700]';
      case 'Advanced':
        return 'text-[#ff3b30]';
      default:
        return 'text-slate-400';
    }
  };

  const partsPassed = examParts.filter(p => p.status === 'passed').length;

  return (
    <div className="space-y-6">
      {/* 3-Year Deadline Banner */}
      {partsPassed > 0 && partsPassed < 3 && (
        <div className="bg-gradient-to-br from-[#FF8C00]/20 to-[#FFA500]/10 backdrop-blur-xl rounded-[20px] border border-[#FF8C00]/30 p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#FF8C00]/20 rounded-xl">
              <Clock className="w-6 h-6 text-[#FF8C00]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">3-Year Exam Window Active</h3>
              <p className="text-slate-300 text-sm mb-2">
                You passed Part {examParts.find(p => p.status === 'passed')?.id} on {firstPassDate.toLocaleDateString()}. 
                Complete all parts before <span className="text-[#FF8C00] font-semibold">{threeYearDeadline.toLocaleDateString()}</span>
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#50FA7B] via-[#FFD700] to-[#ff3b30] rounded-full transition-all"
                    style={{ width: `${((1095 - daysRemaining) / 1095) * 100}%` }}
                  />
                </div>
                <div className="text-white font-semibold text-sm whitespace-nowrap">
                  {monthsRemaining} months left
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECOMMENDED STRATEGY Header */}
      <div className="bg-gradient-to-br from-[#BD93F9]/20 to-[#8B5CF6]/10 backdrop-blur-xl rounded-[20px] border border-[#BD93F9]/30 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#BD93F9]/20 rounded-xl">
            <Award className="w-6 h-6 text-[#BD93F9]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-white text-xl font-bold">Recommended Study Strategy</h2>
              <span className="px-3 py-1 bg-[#50FA7B]/20 border border-[#50FA7B]/30 rounded-full text-[#50FA7B] text-xs font-semibold">
                OPTIMIZED PATH
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              While you can take the EA exam parts in <strong className="text-white">any order</strong>, this sequence (1 → 3 → 2) maximizes your success rate. 
              Part 2 is the <span className="text-[#ff3b30] font-semibold">hardest</span> with only a 45-50% first-time pass rate—save it for last when you're most prepared!
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Lightbulb className="w-4 h-4 text-[#FFD700]" />
              <span className="text-slate-400 text-xs">Following this path? Users complete in 8 months on average vs. 11 months with traditional order.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Part Progress Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl text-white">Your Progression</h3>
          <div className="text-slate-400 text-sm">{partsPassed}/3 Parts Passed</div>
        </div>

        {examParts.sort((a, b) => a.recommendedOrder - b.recommendedOrder).map((part) => {
          const colors = getStatusColor(part.status);
          const isLocked = part.status === 'locked';
          
          return (
            <div
              key={part.id}
              className={`group relative bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-[20px] border ${colors.border} p-6 transition-all duration-300 ${
                isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-xl cursor-pointer'
              }`}
              onClick={() => !isLocked && setSelectedPart(selectedPart === part.id ? null : part.id)}
            >
              <div className="flex items-start gap-4">
                {/* Order Badge */}
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{part.recommendedOrder}</span>
                </div>

                {/* Icon */}
                <div className={`flex-shrink-0 p-3 rounded-xl border ${
                  isLocked 
                    ? 'bg-white/5 border-white/10 text-slate-500'
                    : 'bg-[#FF8C00]/20 border-[#FF8C00]/30 text-[#FF8C00]'
                }`}>
                  {isLocked ? <Lock className="w-6 h-6" /> : getIcon(part.icon)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white text-lg font-semibold mb-1">{part.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{part.subtitle}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-2 py-1 bg-white/10 rounded-lg text-xs font-semibold ${getDifficultyColor(part.difficulty)}`}>
                          {part.difficulty}
                        </span>
                        <span className="text-slate-400 text-xs">{part.estimatedHours} study hours</span>
                        {part.readyScore && (
                          <span className="text-slate-400 text-xs">ReadySCORE: <span className={`font-semibold ${part.readyScore >= 105 ? 'text-[#50FA7B]' : 'text-[#FF8C00]'}`}>{part.readyScore}</span></span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.text} bg-white/10`}>
                        {colors.label}
                      </span>
                      {part.status === 'passed' && (
                        <CheckCircle className="w-8 h-8 text-[#50FA7B]" />
                      )}
                    </div>
                  </div>

                  {/* Topics Preview */}
                  <div className="flex items-center gap-2 flex-wrap mt-3">
                    {part.topics.slice(0, 5).map((topic, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-300 text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Details */}
                  {selectedPart === part.id && (
                    <div className="mt-4 pt-4 border-t border-white/10 animate-in slide-in-from-top-2">
                      <div className="flex items-start gap-3 mb-4">
                        <TrendingUp className="w-5 h-5 text-[#BD93F9] flex-shrink-0 mt-0.5" />
                        <p className="text-slate-300 text-sm leading-relaxed">{part.whyThisOrder}</p>
                      </div>

                      {!isLocked && (
                        <button className="w-full px-6 py-3 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 font-semibold">
                          {part.status === 'passed' ? 'Review Content' : part.status === 'in-progress' ? 'Continue Studying' : 'Start Part 3'}
                        </button>
                      )}

                      {isLocked && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Lock className="w-4 h-4" />
                            <span>Unlock by scoring 105+ on Part 3 practice exam</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why This Order Works - Educational Section */}
      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#FFD700]/20 rounded-xl">
            <Lightbulb className="w-6 h-6 text-[#FFD700]" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-3">Why This Order Works</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#50FA7B]/20 border border-[#50FA7B]/30 rounded-full flex-shrink-0">
                  <span className="text-[#50FA7B] text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Part 1: Build Foundation</p>
                  <p className="text-slate-400 text-xs">Most familiar content for tax preparers. Early confidence boost sets you up for success.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-full flex-shrink-0">
                  <span className="text-[#FFD700] text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Part 3: Maintain Momentum</p>
                  <p className="text-slate-400 text-xs">Shortest study time (40 hrs). Getting 2/3 done quickly keeps motivation high!</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#ff3b30]/20 border border-[#ff3b30]/30 rounded-full flex-shrink-0">
                  <span className="text-[#ff3b30] text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Part 2: Final Challenge</p>
                  <p className="text-slate-400 text-xs">Hardest content (partnerships!). With 2 parts done and experience built, you're ready to tackle it.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-slate-400 text-xs">You can change the order anytime in settings</p>
                <button className="text-[#BD93F9] hover:text-[#BD93F9]/80 text-xs font-semibold transition-colors">
                  Customize Path →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}