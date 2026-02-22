import { Flame, CheckCircle2, Target, TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle?: string;
  color: 'violet' | 'emerald' | 'blue' | 'amber';
}

function StatCard({ icon, label, value, subtitle, color }: StatCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'violet':
        return {
          bg: 'from-[#BD93F9]/20 to-[#BD93F9]/10',
          border: 'border-[#BD93F9]/30',
          icon: 'bg-[#BD93F9]/20 text-[#D4B3FF]',
          glow: 'shadow-[#BD93F9]/20'
        };
      case 'emerald':
        return {
          bg: 'from-[#50FA7B]/20 to-[#50FA7B]/10',
          border: 'border-[#50FA7B]/30',
          icon: 'bg-[#50FA7B]/20 text-[#6AFFB8]',
          glow: 'shadow-[#50FA7B]/20'
        };
      case 'blue':
        return {
          bg: 'from-[#FF8C00]/20 to-[#FF8C00]/10',
          border: 'border-[#FF8C00]/30',
          icon: 'bg-[#FF8C00]/20 text-[#FFA500]',
          glow: 'shadow-[#FF8C00]/20'
        };
      case 'amber':
        return {
          bg: 'from-[#FFA500]/20 to-[#FFA500]/10',
          border: 'border-[#FFA500]/30',
          icon: 'bg-[#FFA500]/20 text-[#FFB84D]',
          glow: 'shadow-[#FFA500]/20'
        };
    }
  };
  
  const colors = getColorClasses();
  
  return (
    <div className={`bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-[20px] border ${colors.border} p-6 shadow-xl ${colors.glow} hover:shadow-2xl transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.icon}`}>
          {icon}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl text-white">{value}</div>
        <div className="text-slate-400 text-sm">{label}</div>
        {subtitle && (
          <div className="text-xs text-slate-500 mt-2">{subtitle}</div>
        )}
      </div>
    </div>
  );
}

export function StatsCluster() {
  return (
    <div className="space-y-4">
      <h3 className="text-white/90">Your Stats</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Flame className="w-6 h-6" />}
          label="Study Streak"
          value="12 days"
          subtitle="Keep it going! 🔥"
          color="amber"
        />
        
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label="Questions Answered"
          value="1,247"
          subtitle="+89 this week"
          color="emerald"
        />
        
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Accuracy Rate"
          value="78%"
          subtitle="↑ 5% from last week"
          color="violet"
        />
        
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Study Hours"
          value="24.5h"
          subtitle="This month"
          color="blue"
        />
      </div>
    </div>
  );
}