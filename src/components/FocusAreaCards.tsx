import { BookOpen, Scale, Calculator, ArrowRight } from 'lucide-react';

interface FocusArea {
  id: number;
  title: string;
  description: string;
  progress: number;
  icon: 'book' | 'scale' | 'calculator';
  color: string;
}

export function FocusAreaCards() {
  const focusAreas: FocusArea[] = [
    {
      id: 1,
      title: 'Circular 230 Ethics',
      description: 'Professional conduct and responsibilities',
      progress: 65,
      icon: 'scale',
      color: 'blue'
    },
    {
      id: 2,
      title: 'Tax Return Procedures',
      description: 'Filing requirements and deadlines',
      progress: 82,
      icon: 'book',
      color: 'green'
    },
    {
      id: 3,
      title: 'Business Calculations',
      description: 'Depreciation, amortization, and credits',
      progress: 43,
      icon: 'calculator',
      color: 'purple'
    }
  ];
  
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'book':
        return <BookOpen className="w-6 h-6" />;
      case 'scale':
        return <Scale className="w-6 h-6" />;
      case 'calculator':
        return <Calculator className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-[#007AFF]/20 to-[#007AFF]/10',
          border: 'border-[#007AFF]/30',
          icon: 'bg-[#007AFF]/20 text-[#0A84FF] border-[#007AFF]/30',
          progress: 'bg-[#007AFF]',
          progressGlow: 'shadow-[0_0_12px_rgba(0,122,255,0.5)]'
        };
      case 'green':
        return {
          bg: 'from-[#30d158]/20 to-[#30d158]/10',
          border: 'border-[#30d158]/30',
          icon: 'bg-[#30d158]/20 text-[#32d74b] border-[#30d158]/30',
          progress: 'bg-[#30d158]',
          progressGlow: 'shadow-[0_0_12px_rgba(48,209,88,0.5)]'
        };
      case 'purple':
        return {
          bg: 'from-[#5e5ce6]/20 to-[#5e5ce6]/10',
          border: 'border-[#5e5ce6]/30',
          icon: 'bg-[#5e5ce6]/20 text-[#7d7aff] border-[#5e5ce6]/30',
          progress: 'bg-[#5e5ce6]',
          progressGlow: 'shadow-[0_0_12px_rgba(94,92,230,0.5)]'
        };
      default:
        return {
          bg: 'from-slate-500/20 to-slate-600/10',
          border: 'border-slate-500/30',
          icon: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
          progress: 'bg-slate-500',
          progressGlow: ''
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white/90">Focus Areas</h3>
        <span className="text-sm text-slate-400">Recommended for you</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {focusAreas.map((area) => {
          const colors = getColorClasses(area.color);
          
          return (
            <div
              key={area.id}
              className={`group relative bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-[20px] border ${colors.border} p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]`}
            >
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl border ${colors.icon} mb-4`}>
                {getIcon(area.icon)}
              </div>
              
              {/* Content */}
              <div className="mb-4">
                <h4 className="text-white/90 mb-2">{area.title}</h4>
                <p className="text-slate-400 text-sm">{area.description}</p>
              </div>
              
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-white/90">{area.progress}%</span>
                </div>
                
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${colors.progress} ${colors.progressGlow} rounded-full transition-all duration-500`}
                    style={{ width: `${area.progress}%` }}
                  />
                </div>
              </div>
              
              {/* Action Button */}
              <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white/90 transition-all group-hover:border-white/20">
                <span>Continue Study</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}