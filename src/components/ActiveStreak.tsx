import { Flame } from 'lucide-react';

interface ActiveStreakProps {
  days: number;
}

export function ActiveStreak({ days }: ActiveStreakProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#FF8C00]/20 to-[#FFA500]/10 backdrop-blur-sm rounded-2xl border border-[#FF8C00]/30">
      {/* Animated flame icon */}
      <div className="relative">
        <Flame className="w-6 h-6 text-[#FF8C00] animate-pulse" />
        {/* Glow effect */}
        <div className="absolute inset-0 blur-md bg-[#FF8C00] opacity-50" />
      </div>
      
      {/* Streak counter */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{days}</span>
        <span className="text-sm text-slate-400">day streak</span>
      </div>
      
      {/* Milestone indicator */}
      {days >= 7 && (
        <div className="ml-2 px-2 py-1 bg-[#50FA7B]/20 border border-[#50FA7B]/30 rounded-lg">
          <span className="text-xs text-[#50FA7B] font-semibold">🔥 Hot!</span>
        </div>
      )}
    </div>
  );
}
