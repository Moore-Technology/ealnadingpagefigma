import { Target, BookOpen, Calculator, TrendingUp } from 'lucide-react';

interface Mission {
  id: number;
  title: string;
  description: string;
  progress: number;
  icon: 'target' | 'book' | 'calculator' | 'trending';
  xpReward: number;
}

export function DailyMissions() {
  const missions: Mission[] = [
    {
      id: 1,
      title: 'Master Circular 230',
      description: 'Complete ethics module and practice questions',
      progress: 65,
      icon: 'target',
      xpReward: 250
    },
    {
      id: 2,
      title: 'Tax Return Procedures',
      description: 'Review filing requirements and deadlines',
      progress: 82,
      icon: 'book',
      xpReward: 300
    },
    {
      id: 3,
      title: 'Business Calculations',
      description: 'Practice depreciation and credit problems',
      progress: 43,
      icon: 'calculator',
      xpReward: 200
    }
  ];

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl text-white">Daily Missions</h2>
        <div className="text-sm text-[#50FA7B]">+750 XP Available</div>
      </div>

      {missions.map((mission) => (
        <div
          key={mission.id}
          className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6 hover:border-[#FF8C00]/40 transition-all duration-300 shadow-lg hover:shadow-[#FF8C00]/20"
        >
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
                <div>
                  <h3 className="text-white/90 text-lg mb-1">{mission.title}</h3>
                  <p className="text-slate-400 text-sm">{mission.description}</p>
                </div>
                <div className="text-[#FFA500] text-sm font-semibold">+{mission.xpReward} XP</div>
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
                {mission.progress === 0 ? 'Start Mission' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}