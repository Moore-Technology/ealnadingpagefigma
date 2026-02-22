import { useState } from 'react';
import { Award, CheckCircle, Lock, Star, Trophy, Zap } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
  category: 'Part 1' | 'Part 2' | 'Part 3' | 'General';
}

interface Level {
  id: number;
  title: string;
  description: string;
  requirement: string;
  unlocked: boolean;
  current: boolean;
}

export function CareerProgressionMap() {
  const [showCelebration, setShowCelebration] = useState(false);

  const levels: Level[] = [
    {
      id: 1,
      title: 'PTIN Holder',
      description: 'Starting your tax professional journey',
      requirement: 'Obtain your PTIN',
      unlocked: true,
      current: false
    },
    {
      id: 2,
      title: 'Tax Preparer',
      description: 'Building foundational knowledge',
      requirement: 'Complete 50 practice questions',
      unlocked: true,
      current: false
    },
    {
      id: 3,
      title: 'IRS Representative',
      description: 'Ready to represent clients',
      requirement: 'Score 105+ on practice exam',
      unlocked: false,
      current: true
    },
    {
      id: 4,
      title: 'Enrolled Agent',
      description: 'Master tax professional status',
      requirement: 'Pass all three SEE parts',
      unlocked: false,
      current: false
    }
  ];

  const badges: Badge[] = [
    {
      id: 'basis-master',
      name: 'Basis Master',
      description: 'Mastered all cost basis calculations',
      unlocked: true,
      icon: '🎯',
      category: 'Part 2'
    },
    {
      id: '1040-wizard',
      name: '1040 Wizard',
      description: 'Expert in individual tax returns',
      unlocked: true,
      icon: '🧙‍♂️',
      category: 'Part 1'
    },
    {
      id: 'ethics-champion',
      name: 'Ethics Champion',
      description: 'Perfect score on Circular 230 scenarios',
      unlocked: false,
      icon: '⚖️',
      category: 'Part 3'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Completed 10 Sprint Mode sessions',
      unlocked: true,
      icon: '⚡',
      category: 'General'
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      description: 'Maintained 30-day study streak',
      unlocked: false,
      icon: '🔥',
      category: 'General'
    },
    {
      id: 'depreciation-pro',
      name: 'Depreciation Pro',
      description: 'Mastered MACRS and bonus depreciation',
      unlocked: true,
      icon: '📊',
      category: 'Part 2'
    },
    {
      id: 'collections-expert',
      name: 'Collections Expert',
      description: 'Expert in IRS collection procedures',
      unlocked: false,
      icon: '💼',
      category: 'Part 3'
    },
    {
      id: 'perfect-sim',
      name: 'Perfect Simulation',
      description: 'Scored 105+ on practice exam',
      unlocked: false,
      icon: '🏆',
      category: 'General'
    }
  ];

  const triggerCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Part 1':
        return 'from-[#FF8C00] to-[#FFA500]';
      case 'Part 2':
        return 'from-[#50FA7B] to-[#6AFFB8]';
      case 'Part 3':
        return 'from-[#BD93F9] to-[#D4B3FF]';
      case 'General':
        return 'from-[#0A84FF] to-[#5AC8FA]';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] dark p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl mb-2">Career Progression</h1>
          <p className="text-slate-400">Track your journey to becoming an Enrolled Agent</p>
        </div>

        {/* Career Path Timeline */}
        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-[#FF8C00]" />
            <h2 className="text-white text-2xl">Your Career Path</h2>
          </div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/10">
              <div 
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#FF8C00] to-[#50FA7B] transition-all duration-1000"
                style={{ height: '50%' }}
              />
            </div>

            {/* Levels */}
            <div className="space-y-8">
              {levels.map((level, index) => (
                <div key={level.id} className="relative flex items-start gap-6">
                  {/* Level Icon */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                    level.unlocked
                      ? 'bg-gradient-to-br from-[#50FA7B] to-[#6AFFB8] border-[#50FA7B]'
                      : level.current
                      ? 'bg-gradient-to-br from-[#FF8C00] to-[#FFA500] border-[#FF8C00] animate-pulse'
                      : 'bg-[#252525] border-white/10'
                  }`}>
                    {level.unlocked ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : level.current ? (
                      <Zap className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-8 h-8 text-slate-500" />
                    )}
                  </div>

                  {/* Level Content */}
                  <div className={`flex-1 p-6 rounded-xl border transition-all ${
                    level.current
                      ? 'bg-gradient-to-br from-[#FF8C00]/20 to-[#FFA500]/10 border-[#FF8C00]/30'
                      : level.unlocked
                      ? 'bg-white/[0.05] border-white/10'
                      : 'bg-white/[0.02] border-white/5'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-xl font-semibold ${
                        level.unlocked || level.current ? 'text-white' : 'text-slate-500'
                      }`}>
                        {level.title}
                      </h3>
                      {level.current && (
                        <span className="px-3 py-1 bg-[#FF8C00]/20 border border-[#FF8C00]/30 rounded-full text-[#FF8C00] text-sm font-semibold">
                          In Progress
                        </span>
                      )}
                      {level.unlocked && !level.current && (
                        <CheckCircle className="w-6 h-6 text-[#50FA7B]" />
                      )}
                    </div>
                    <p className="text-slate-400 mb-3">{level.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className={`w-4 h-4 ${level.unlocked ? 'text-[#50FA7B]' : 'text-slate-500'}`} />
                      <span className={level.unlocked ? 'text-slate-300' : 'text-slate-500'}>
                        {level.requirement}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#BD93F9]" />
              <h2 className="text-white text-2xl">Achievements & Badges</h2>
            </div>
            <div className="text-slate-400">
              {badges.filter(b => b.unlocked).length} of {badges.length} unlocked
            </div>
          </div>

          {/* Filter by Category */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {['All', 'Part 1', 'Part 2', 'Part 3', 'General'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 text-sm transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.03] border-white/20 hover:border-white/30 cursor-pointer'
                    : 'bg-white/[0.02] border-white/5 grayscale opacity-50'
                }`}
                onClick={() => badge.unlocked && triggerCelebration()}
              >
                {/* Badge Icon */}
                <div className={`text-5xl mb-3 ${badge.unlocked ? 'animate-bounce-slow' : ''}`}>
                  {badge.icon}
                </div>

                {/* Badge Name */}
                <h4 className={`font-semibold mb-2 ${badge.unlocked ? 'text-white' : 'text-slate-600'}`}>
                  {badge.name}
                </h4>

                {/* Description */}
                <p className={`text-xs mb-3 ${badge.unlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                  {badge.description}
                </p>

                {/* Category Tag */}
                <div className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${
                  badge.unlocked 
                    ? `bg-gradient-to-r ${getCategoryColor(badge.category)} text-white`
                    : 'bg-white/5 text-slate-600'
                }`}>
                  {badge.category}
                </div>

                {/* Lock overlay */}
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Celebration - 105 Score Achievement */}
        <button
          onClick={triggerCelebration}
          className="mt-6 w-full p-6 bg-gradient-to-br from-[#50FA7B]/20 to-[#50FA7B]/10 border-2 border-[#50FA7B]/30 rounded-xl hover:border-[#50FA7B]/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#50FA7B]/20 rounded-xl">
                <Trophy className="w-8 h-8 text-[#50FA7B]" />
              </div>
              <div className="text-left">
                <h3 className="text-white text-lg font-semibold">Next Milestone: 105+ Practice Score</h3>
                <p className="text-slate-400 text-sm">You're at 87/130 on the ReadySCORE. Keep pushing!</p>
              </div>
            </div>
            <div className="text-[#50FA7B] text-sm font-semibold group-hover:translate-x-1 transition-transform">
              View Progress →
            </div>
          </div>
        </button>
      </div>

      {/* Celebration Animation Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-8xl animate-bounce">🎉</div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#50FA7B]/20 via-[#FF8C00]/20 to-[#BD93F9]/20 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-6xl font-bold text-white mb-4 animate-bounce">
              Milestone Achieved!
            </div>
            <div className="text-2xl text-[#50FA7B]">+500 XP Bonus</div>
          </div>
        </div>
      )}
    </div>
  );
}
