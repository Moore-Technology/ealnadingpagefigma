import { ReadyScoreGauge } from './components/ReadyScoreGauge';
import { KnowledgeHeatmap } from './components/KnowledgeHeatmap';
import { DailyMissions } from './components/DailyMissions';
import { AdaptiveDailyMissions } from './components/AdaptiveDailyMissions';
import { AIMentorChat } from './components/AIMentorChat';
import { AIInsightsDashboard } from './components/AIInsightsDashboard';
import { StatsCluster } from './components/StatsCluster';
import { AIMentorBubble } from './components/AIMentorBubble';
import { ActiveStreak } from './components/ActiveStreak';
import { SprintMode } from './components/SprintMode';
import { ExamSimulationMode } from './components/ExamSimulationMode';
import { PrometricExamSimulator } from './components/PrometricExamSimulator';
import { EthicsRoleplay } from './components/EthicsRoleplay';
import { EthicsRoleplayRPG } from './components/EthicsRoleplayRPG';
import { CareerProgressionMap } from './components/CareerProgressionMap';
import { ExamPartProgress } from './components/ExamPartProgress';
import { DomainBridge } from './components/DomainBridge';
import { ResponsiveNavigation } from './components/ResponsiveNavigation';
import { LandingPage } from './components/LandingPage';
import { GraduationCap, Bell, Settings, Menu, Zap, Trophy, BookOpen, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';

type ViewMode = 'landing' | 'dashboard' | 'exam-sim' | 'ethics' | 'career' | 'part-progress' | 'domain-bridge';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const { user, isLoaded, isSignedIn } = useUser();
  const DASHBOARD_URL = 'https://app.eacoachpro.com/dashboard';

  // Debug logging
  console.log('🔍 App State:', {
    isLoaded,
    isSignedIn,
    hasUser: !!user,
    userId: user?.id,
    viewMode,
    DASHBOARD_URL
  });

  const handleGetStarted = () => {
    console.log('🎯 handleGetStarted called', {
      isLoaded,
      isSignedIn,
      hasUser: !!user,
      userId: user?.id
    });
    
    if (user) {
      console.log('✅ User authenticated, redirecting to:', DASHBOARD_URL);
      // Redirect to dashboard if user is signed in
      window.location.replace(DASHBOARD_URL);
    } else {
      console.log('❌ No user, showing local dashboard');
      // Show local dashboard for demo
      setViewMode('dashboard');
    }
  };

  // Track authentication state changes
  useEffect(() => {
    console.log('🔄 Auth State Changed:', {
      isLoaded,
      isSignedIn,
      hasUser: !!user,
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress
    });

    // Auto-redirect if user is signed in and on landing page
    if (isLoaded && isSignedIn && user && viewMode === 'landing') {
      console.log('🚀 Auto-redirecting signed-in user to dashboard...');
      setTimeout(() => {
        window.location.replace(DASHBOARD_URL);
      }, 500);
    }
  }, [isLoaded, isSignedIn, user, viewMode, DASHBOARD_URL]);

  // Landing page view
  if (viewMode === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Exam simulation view
  if (viewMode === 'exam-sim') {
    return (
      <div>
        <button
          onClick={() => setViewMode('dashboard')}
          className="fixed top-6 left-6 z-50 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-xl text-white transition-colors"
        >
          ← Back to Dashboard
        </button>
        <PrometricExamSimulator />
      </div>
    );
  }

  // Ethics roleplay view
  if (viewMode === 'ethics') {
    return (
      <div className="min-h-screen bg-[#121212]">
        <button
          onClick={() => setViewMode('dashboard')}
          className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors"
        >
          ← Back to Dashboard
        </button>
        <EthicsRoleplayRPG />
      </div>
    );
  }

  // Career progression view
  if (viewMode === 'career') {
    return (
      <div className="min-h-screen bg-[#121212]">
        <button
          onClick={() => setViewMode('dashboard')}
          className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors"
        >
          ← Back to Dashboard
        </button>
        <CareerProgressionMap />
      </div>
    );
  }

  // Exam part progress view
  if (viewMode === 'part-progress') {
    return (
      <div className="min-h-screen bg-[#121212]">
        <button
          onClick={() => setViewMode('dashboard')}
          className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors"
        >
          ← Back to Dashboard
        </button>
        <ExamPartProgress />
      </div>
    );
  }

  // Domain bridge view
  if (viewMode === 'domain-bridge') {
    return (
      <div className="min-h-screen bg-[#121212]">
        <button
          onClick={() => setViewMode('dashboard')}
          className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-colors"
        >
          ← Back to Dashboard
        </button>
        <DomainBridge />
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-[#121212] dark">
      {/* Responsive Navigation */}
      <ResponsiveNavigation currentView={viewMode} onNavigate={setViewMode} />

      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF8C00]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#50FA7B]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#BD93F9]/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Top Navigation */}
      <nav className="relative z-10 border-b border-white/10 bg-[#1a1a1a]/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-xl shadow-lg shadow-[#FF8C00]/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl text-white">EA Coach Pro</h1>
                <p className="text-xs text-slate-400">Focus Mode</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Active Streak */}
              <div className="hidden md:block">
                <ActiveStreak days={12} />
              </div>
              
              {/* User Authentication */}
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </SignedIn>
              
              {/* Quick Actions */}
              <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-slate-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8C00] rounded-full border-2 border-[#121212]" />
              </button>
              <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-slate-300" />
              </button>
              <button className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors lg:hidden">
                <Menu className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-6 py-8 md:ml-20 lg:ml-64 pb-20 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column - Main Dashboard */}
          <div className="lg:col-span-8 space-y-6">
            {/* Welcome Section with CTA */}
            <div className="bg-gradient-to-br from-[#FF8C00]/10 via-white/5 to-[#BD93F9]/10 backdrop-blur-xl rounded-[24px] border border-white/10 p-6 shadow-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-white/90 text-2xl mb-2">Welcome back, {user?.firstName || 'Student'}! 🎯</h2>
                  <p className="text-slate-400">
                    You're making great progress. Keep your streak alive!
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  Start Quiz
                </button>
              </div>
            </div>

            {/* Mobile Streak */}
            <div className="md:hidden">
              <ActiveStreak days={12} />
            </div>

            {/* 5-Minute Sprint Mode Widget */}
            <SprintMode />

            {/* Feature Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setViewMode('exam-sim')}
                className="group p-6 bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[20px] border border-white/10 hover:border-[#FF8C00]/30 transition-all text-left"
              >
                <Target className="w-8 h-8 text-[#FF8C00] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">Exam Simulation</h3>
                <p className="text-slate-400 text-sm">Practice in real Prometric interface</p>
              </button>

              <button
                onClick={() => setViewMode('ethics')}
                className="group p-6 bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[20px] border border-white/10 hover:border-[#BD93F9]/30 transition-all text-left"
              >
                <BookOpen className="w-8 h-8 text-[#BD93F9] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">Ethics Roleplay</h3>
                <p className="text-slate-400 text-sm">Master Circular 230 through scenarios</p>
              </button>

              <button
                onClick={() => setViewMode('career')}
                className="group p-6 bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[20px] border border-white/10 hover:border-[#50FA7B]/30 transition-all text-left"
              >
                <Trophy className="w-8 h-8 text-[#50FA7B] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-semibold mb-1">Career Path</h3>
                <p className="text-slate-400 text-sm">Track your progression to EA</p>
              </button>
            </div>

            {/* Exam Part Progression - NEW */}
            <ExamPartProgress />
            
            {/* Hero ReadyScore Gauge */}
            <ReadyScoreGauge score={87} questionsAnswered={286} />
            
            {/* AI-Powered Daily Missions (Adaptive) */}
            <AdaptiveDailyMissions 
              readyScore={87} 
              weakAreas={['Circular 230 Ethics', 'Passive Activity Rules', 'Partnership Basis']} 
              studyStreak={12}
            />
            
            {/* Stats Cluster */}
            <StatsCluster />
            
            {/* Knowledge Heatmap */}
            <KnowledgeHeatmap />
          </div>
          
          {/* Right Column - Quick Actions & Insights */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Insights Dashboard */}
            <AIInsightsDashboard 
              readyScore={87}
              studyHoursThisWeek={14.5}
              questionsAnswered={286}
              weakAreas={['Circular 230 Ethics', 'Passive Activity Rules', 'Partnership Basis']}
            />

            {/* AI Mentor Chat */}
            <div className="h-[600px]">
              <AIMentorChat 
                userReadyScore={87}
                weakAreas={['Circular 230 Ethics', 'Passive Activity Rules']}
                recentActivity="Completed 15 practice questions on Partnerships"
              />
            </div>

            {/* Today's Focus */}
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-6 shadow-2xl">
              <h3 className="text-white/90 text-lg mb-4">Today's Focus</h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#FF8C00]/10 border border-[#FF8C00]/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-[#FF8C00] rounded-full" />
                    <span className="text-white text-sm font-medium">Complete 3 missions</span>
                  </div>
                  <p className="text-xs text-slate-400 ml-4">2 of 3 done</p>
                </div>
                <div className="p-3 bg-[#50FA7B]/10 border border-[#50FA7B]/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-[#50FA7B] rounded-full" />
                    <span className="text-white text-sm font-medium">30 min study time</span>
                  </div>
                  <p className="text-xs text-slate-400 ml-4">18 mins remaining</p>
                </div>
                <div className="p-3 bg-[#BD93F9]/10 border border-[#BD93F9]/30 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-[#BD93F9] rounded-full" />
                    <span className="text-white text-sm font-medium">Practice simulation</span>
                  </div>
                  <p className="text-xs text-slate-400 ml-4">Not started</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-6 shadow-2xl">
              <h3 className="text-white/90 text-lg mb-4">This Week</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Study Hours</span>
                    <span className="text-white font-semibold">14.5 hrs</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-[#FF8C00] to-[#FFA500] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Questions Solved</span>
                    <span className="text-white font-semibold">286</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-[#50FA7B] to-[#6AFFB8] rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Accuracy Rate</span>
                    <span className="text-white font-semibold">81%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[81%] bg-gradient-to-r from-[#BD93F9] to-[#D4B3FF] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Countdown */}
            <div className="bg-gradient-to-br from-[#FF8C00]/10 to-white/5 backdrop-blur-xl rounded-[24px] border border-[#FF8C00]/30 p-6 shadow-2xl">
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-2">Exam in</p>
                <div className="text-4xl font-bold text-white mb-1">42</div>
                <p className="text-slate-400 text-sm">days</p>
                <button className="mt-4 w-full px-4 py-2.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 text-sm font-semibold">
                  Start Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Mentor Chat Bubble (persistent, bottom right) */}
      <AIMentorBubble />
    </div>
  );
}