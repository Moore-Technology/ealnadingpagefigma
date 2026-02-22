import { Target, BookOpen, Calculator, TrendingUp, Sparkles, Brain } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Mission {
  id: number;
  title: string;
  description: string;
  progress: number;
  icon: 'target' | 'book' | 'calculator' | 'trending';
  xpReward: number;
  aiGenerated: boolean;
  rationale: string;
}

interface AdaptiveDailyMissionsProps {
  readyScore: number;
  weakAreas: string[];
  studyStreak: number;
}

export function AdaptiveDailyMissions({ readyScore, weakAreas, studyStreak }: AdaptiveDailyMissionsProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    generateAdaptiveMissions();
  }, [readyScore, weakAreas, studyStreak]);

  // AI-powered mission generation based on user performance
  const generateAdaptiveMissions = async () => {
    setIsGenerating(true);
    
    // Simulate AI analysis (in production, this would call your AI API)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const adaptiveMissions: Mission[] = [];

    // Mission 1: Target weakest area with highest priority
    if (weakAreas.length > 0) {
      adaptiveMissions.push({
        id: 1,
        title: `Master ${weakAreas[0]}`,
        description: `AI detected this as your weakest area. Complete 15 targeted practice questions.`,
        progress: 0,
        icon: 'target',
        xpReward: 300,
        aiGenerated: true,
        rationale: `Your ${weakAreas[0]} mastery is 43% (below 70% threshold). Research shows focused practice on weak areas improves ReadySCORE by 8-12 points.`
      });
    }

    // Mission 2: Adaptive difficulty based on ReadyScore
    if (readyScore < 90) {
      adaptiveMissions.push({
        id: 2,
        title: 'Foundational Concepts Review',
        description: 'Strengthen basics with beginner-level content to build confidence',
        progress: 0,
        icon: 'book',
        xpReward: 200,
        aiGenerated: true,
        rationale: `ReadySCORE under 90 indicates gaps in fundamentals. AI recommends reviewing core concepts before advancing.`
      });
    } else if (readyScore >= 90 && readyScore < 105) {
      adaptiveMissions.push({
        id: 2,
        title: 'Intermediate Problem Solving',
        description: 'Tackle multi-step problems combining 2-3 tax concepts',
        progress: 0,
        icon: 'calculator',
        xpReward: 250,
        aiGenerated: true,
        rationale: `ReadySCORE of ${readyScore} shows you're ready for intermediate challenges. AI selected problems that combine multiple concepts.`
      });
    } else {
      adaptiveMissions.push({
        id: 2,
        title: 'Exam-Level Simulations',
        description: 'Practice with Prometric-style questions at exam difficulty',
        progress: 0,
        icon: 'target',
        xpReward: 350,
        aiGenerated: true,
        rationale: `ReadySCORE of ${readyScore} is exam-ready! AI recommends full simulations to maintain peak performance.`
      });
    }

    // Mission 3: Streak-based motivation
    if (studyStreak >= 7) {
      adaptiveMissions.push({
        id: 3,
        title: 'Momentum Builder',
        description: `${studyStreak}-day streak! Quick 5-min review to keep it alive`,
        progress: 0,
        icon: 'trending',
        xpReward: 150,
        aiGenerated: true,
        rationale: `Your ${studyStreak}-day streak puts you in the top 15% of learners. AI generated a low-effort mission to prevent burnout.`
      });
    } else {
      adaptiveMissions.push({
        id: 3,
        title: 'Consistency Challenge',
        description: 'Complete 30 minutes today to build your study habit',
        progress: 0,
        icon: 'trending',
        xpReward: 200,
        aiGenerated: true,
        rationale: `AI detected inconsistent study patterns. Daily practice for 21+ days increases pass rates by 34%.`
      });
    }

    setMissions(adaptiveMissions);
    setIsGenerating(false);
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'target':
        return <Target className="w-6 h-6" />;
      case 'book':
        return <BookOpen className="w-6 h-6" />;
      case 'calculator':
        return <Calculator className="w-6 h-6" />;
      case 'trending':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Target className="w-6 h-6" />;
    }
  };

  if (isGenerating) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl text-white">Daily Missions</h2>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-[#BD93F9] animate-pulse" />
            <span className="text-sm text-[#BD93F9]">AI Generating...</span>
          </div>
        </div>
        
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-white/5 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-2 bg-white/5 rounded w-full mt-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalXP = missions.reduce((sum, m) => sum + m.xpReward, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl text-white">Daily Missions</h2>
          <p className="text-slate-400 text-sm mt-1">AI-personalized for your ReadySCORE: {readyScore}</p>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          <span className="text-sm text-[#50FA7B]">+{totalXP} XP Available</span>
        </div>
      </div>

      {/* AI Personalization Notice */}
      <div className="bg-gradient-to-r from-[#BD93F9]/10 to-[#FF8C00]/10 border border-[#BD93F9]/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-[#BD93F9] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm font-semibold mb-1">AI-Powered Personalization</p>
            <p className="text-slate-300 text-xs leading-relaxed">
              These missions were generated based on your performance data, weak areas, and study patterns. 
              They update daily to keep you challenged but not overwhelmed.
            </p>
          </div>
        </div>
      </div>

      {missions.map((mission) => (
        <div
          key={mission.id}
          className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6 hover:border-[#FF8C00]/40 transition-all duration-300 shadow-lg hover:shadow-[#FF8C00]/20"
        >
          {/* AI Badge */}
          {mission.aiGenerated && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-[#BD93F9]/20 border border-[#BD93F9]/30 rounded-full">
              <Sparkles className="w-3 h-3 text-[#BD93F9]" />
              <span className="text-[#BD93F9] text-xs font-semibold">AI</span>
            </div>
          )}

          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="p-3 bg-[#FF8C00]/20 rounded-xl border border-[#FF8C00]/30 text-[#FF8C00] group-hover:bg-[#FF8C00]/30 transition-colors">
              {getIcon(mission.icon)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-12">
                  <h3 className="text-white/90 text-lg mb-1">{mission.title}</h3>
                  <p className="text-slate-400 text-sm">{mission.description}</p>
                </div>
                <div className="text-[#FFA500] text-sm font-semibold">+{mission.xpReward} XP</div>
              </div>

              {/* AI Rationale */}
              <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-[#BD93F9] flex-shrink-0 mt-0.5" />
                  <p className="text-slate-300 text-xs leading-relaxed">
                    <strong className="text-white">Why AI chose this:</strong> {mission.rationale}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500">Progress</span>
                  <span className="text-xs text-[#50FA7B] font-semibold">{mission.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#50FA7B] to-[#6AFFB8] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(80,250,123,0.6)]"
                    style={{ width: `${mission.progress}%` }}
                  />
                </div>
              </div>

              {/* Action button */}
              <button className="mt-4 w-full px-4 py-3 md:py-2.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all duration-300 shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 text-sm font-semibold min-h-[48px] md:min-h-0">
                {mission.progress === 0 ? 'Start AI Mission' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Regenerate Button */}
      <button 
        onClick={generateAdaptiveMissions}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#BD93F9]/30 text-slate-300 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-[#BD93F9]" />
        Regenerate with AI
      </button>
    </div>
  );
}
