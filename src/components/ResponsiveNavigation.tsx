import { GraduationCap, Target, BookOpen, Trophy, TrendingUp, Home } from 'lucide-react';

type ViewMode = 'dashboard' | 'exam-sim' | 'ethics' | 'career' | 'part-progress' | 'domain-bridge';

interface ResponsiveNavigationProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export function ResponsiveNavigation({ currentView, onNavigate }: ResponsiveNavigationProps) {
  const navItems = [
    { id: 'dashboard' as ViewMode, label: 'Home', icon: Home, color: '#50FA7B' },
    { id: 'exam-sim' as ViewMode, label: 'Exam', icon: Target, color: '#FF8C00' },
    { id: 'ethics' as ViewMode, label: 'Ethics', icon: BookOpen, color: '#BD93F9' },
    { id: 'career' as ViewMode, label: 'Career', icon: Trophy, color: '#FFD700' },
    { id: 'part-progress' as ViewMode, label: 'Progress', icon: TrendingUp, color: '#50FA7B' }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation - Only visible on mobile/tablet */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10 safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-h-[48px] min-w-[48px] ${
                  isActive 
                    ? 'bg-white/10' 
                    : 'hover:bg-white/5'
                }`}
                style={{
                  color: isActive ? item.color : '#94a3b8'
                }}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation - Only visible on desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-[#1a1a1a]/80 backdrop-blur-xl border-r border-white/10 z-40 flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-white font-bold">EA Study</h1>
              <p className="text-slate-400 text-xs">Master Your Path</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all min-h-[48px] ${
                  isActive
                    ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
                style={{
                  color: isActive ? item.color : '#94a3b8'
                }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                <span className={`hidden lg:block ${isActive ? 'font-semibold' : 'font-normal'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-[#BD93F9] to-[#FF8C00] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">EA</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-white text-sm font-semibold">Tax Prep Pro</p>
              <p className="text-slate-400 text-xs">Level 7 • 2,450 XP</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
