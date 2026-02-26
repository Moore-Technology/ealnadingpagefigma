import { GraduationCap, Sparkles, Brain, Target, Zap, TrendingUp, CheckCircle2, Award, Users, Star, ArrowRight, ChevronRight, BarChart3, MessageSquare, Flame, X, LogOut } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SignInButton, SignUpButton, SignedIn, SignedOut, SignOutButton, useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { isSignedIn, isLoaded } = useUser();
  const [aiMessages, setAiMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [hasRedirected, setHasRedirected] = useState(false);
  
  const mentorMessages = [
    "Let's focus on Partnership Basis today. You're making great progress!",
    "Great job! You've mastered 8 out of 12 topics this week.",
    "Ready for a challenge? Try the advanced tax scenarios quiz.",
    "You're on track to pass! Keep up the momentum."
  ];

  // Auto-redirect after sign-in with delay for satellite sync
  useEffect(() => {
    if (isLoaded && isSignedIn && !hasRedirected) {
      setHasRedirected(true);
      // Wait 1 second for cookies to propagate to parent domain
      setTimeout(() => {
        window.location.href = 'https://app.eacoachpro.com/diagnostic-quiz';
      }, 1000);
    }
  }, [isSignedIn, isLoaded, hasRedirected]);

  useEffect(() => {
    // Simulate AI messages appearing
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % mentorMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setAiMessages([mentorMessages[currentMessageIndex]]);
  }, [currentMessageIndex]);

  return (
    <div className="min-h-screen bg-[#121212] dark overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF8C00]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#50FA7B]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#BD93F9]/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 bg-[#1a1a1a]/50 backdrop-blur-xl sticky top-0">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-xl shadow-lg shadow-[#FF8C00]/30">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-white text-xl font-bold">EA Coach Pro</span>
                <p className="text-xs text-slate-400">AI-Powered Learning Platform</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm">Features</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition-colors text-sm">How It Works</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors text-sm">Pricing</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors text-sm">Reviews</a>
            </div>

            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="hidden md:block px-5 py-2.5 text-white hover:bg-white/10 border border-white/20 rounded-xl transition-all text-sm">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 text-sm font-semibold flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <button className="hidden md:flex items-center gap-2 px-5 py-2.5 text-white hover:bg-white/10 border border-white/20 rounded-xl transition-all text-sm">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </SignOutButton>
                <button 
                  onClick={onGetStarted}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50 text-sm font-semibold flex items-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF8C00]/20 to-[#BD93F9]/20 border border-[#FF8C00]/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#FF8C00]" />
                <span className="text-sm text-white">AI-Powered Study Platform</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                Pass Your EA Exam
                <span className="block bg-gradient-to-r from-[#FF8C00] to-[#FFA500] bg-clip-text text-transparent">
                  3x Faster
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Master the Enrolled Agent exam with our AI-driven platform. Adaptive learning, realistic simulations, and personalized study paths designed by tax professionals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="group px-8 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-2xl shadow-[#FF8C00]/40 hover:shadow-[#FF8C00]/60 font-semibold text-lg flex items-center justify-center gap-2">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <button 
                    onClick={onGetStarted}
                    className="group px-8 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-2xl shadow-[#FF8C00]/40 hover:shadow-[#FF8C00]/60 font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <SignOutButton>
                    <button className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition-all font-semibold text-lg flex items-center justify-center gap-2">
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </SignOutButton>
                </SignedIn>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition-all font-semibold text-lg flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-[#50FA7B]" />
                  Watch Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center gap-8">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF8C00] text-[#FF8C00]" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">4.9/5 from 2,847 students</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <p className="text-2xl font-bold text-white">89%</p>
                  <p className="text-sm text-slate-400">Pass rate</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <p className="text-2xl font-bold text-white">12k+</p>
                  <p className="text-sm text-slate-400">Questions</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Dashboard Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/20 to-[#BD93F9]/20 rounded-[32px] blur-3xl" />
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[32px] border border-white/20 p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Mini ReadyScore Gauge Preview - Enhanced with animations */}
                  <div className="relative bg-gradient-to-br from-[#FF8C00]/10 to-white/5 rounded-2xl p-6 border border-[#FF8C00]/30 overflow-hidden">
                    {/* Animated glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C00]/0 via-[#FF8C00]/20 to-[#FF8C00]/0 animate-[shimmer_3s_ease-in-out_infinite]" 
                         style={{ backgroundSize: '200% 100%' }} />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white font-semibold">Your ReadyScore™</span>
                        <Target className="w-5 h-5 text-[#FF8C00] animate-pulse" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold text-white animate-[pulse_2s_ease-in-out_infinite]">87</span>
                        <span className="text-slate-400">/130</span>
                      </div>
                      <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[67%] bg-gradient-to-r from-[#FF8C00] via-[#FFA500] to-[#50FA7B] animate-[progress_2s_ease-in-out_infinite]" 
                             style={{ backgroundSize: '200% 100%' }} />
                      </div>
                      <p className="mt-3 text-sm text-[#50FA7B] animate-bounce">↑ +12 points this week</p>
                    </div>
                  </div>

                  {/* AI Tax Coach Preview - Enhanced with message simulation */}
                  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src="/ai-mentor-v2.png" 
                        alt="AI Tax Coach" 
                        className="object-contain"
                        style={{ width: '84px', height: '84px' }}
                      />
                      <span className="text-white font-semibold text-lg">AI Tax Coach™</span>
                      <span className="ml-auto px-2 py-1 bg-[#50FA7B]/20 border border-[#50FA7B]/30 rounded-lg text-xs text-[#50FA7B] animate-pulse">
                        Active
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-[#BD93F9]/10 border border-[#BD93F9]/30 rounded-xl p-3 animate-[fadeIn_0.5s_ease-in]">
                        <p className="text-sm text-slate-300">{aiMessages[0]}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-xs text-white transition-all hover:scale-105">
                          Start Lesson
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white rounded-lg text-xs font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#FF8C00]/50">
                          Take Quiz
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Streak Preview - Enhanced with CSS-based animated fire */}
                  <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] rounded-2xl p-6 border border-white/10 overflow-hidden">
                    {/* Animated background glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FF8C00]/10 to-transparent animate-pulse" />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* Animated Fire GIF */}
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <img 
                            src="/fire-animation.gif" 
                            alt="Streak Fire" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        
                        <div>
                          <p className="text-2xl font-bold text-white">12 Days</p>
                          <p className="text-sm text-slate-400">Study streak</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#50FA7B] animate-pulse">Top 5%</p>
                        <p className="text-xs text-slate-400">of students</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative z-10 py-12 px-6 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white mb-2">89%</p>
              <p className="text-slate-400">Pass Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white mb-2">12,000+</p>
              <p className="text-slate-400">Questions</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white mb-2">5,200+</p>
              <p className="text-slate-400">Students</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-white mb-2">4.9★</p>
              <p className="text-slate-400">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#50FA7B]/20 to-[#BD93F9]/20 border border-[#50FA7B]/30 rounded-full mb-4">
              <Zap className="w-4 h-4 text-[#50FA7B]" />
              <span className="text-sm text-white">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Everything You Need to Pass
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Our AI-powered platform adapts to your learning style and targets your weak areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[24px] border border-white/10 hover:border-[#FF8C00]/30 p-8 transition-all">
              <div className="p-3 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-2xl w-fit mb-6 shadow-lg shadow-[#FF8C00]/30">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ReadyScore™ System</h3>
              <p className="text-slate-400 leading-relaxed">
                Real-time scoring on a 40-130 scale that predicts your actual exam performance with 94% accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[24px] border border-white/10 hover:border-[#BD93F9]/30 p-8 transition-all">
              <div className="p-3 bg-gradient-to-br from-[#BD93F9] to-[#D4B3FF] rounded-2xl w-fit mb-6 shadow-lg shadow-[#BD93F9]/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Tax Coach™ Chat</h3>
              <p className="text-slate-400 leading-relaxed">
                24/7 AI tutor that explains complex tax concepts in simple terms and answers your questions instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[24px] border border-white/10 hover:border-[#50FA7B]/30 p-8 transition-all">
              <div className="p-3 bg-gradient-to-br from-[#50FA7B] to-[#6AFFB8] rounded-2xl w-fit mb-6 shadow-lg shadow-[#50FA7B]/30">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Knowledge Heatmap</h3>
              <p className="text-slate-400 leading-relaxed">
                Visual 10x10 grid tracking your mastery across 100 tax sub-topics with color-coded performance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[24px] border border-white/10 hover:border-[#FF8C00]/30 p-8 transition-all">
              <div className="p-3 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-2xl w-fit mb-6 shadow-lg shadow-[#FF8C00]/30">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Prometric Simulator</h3>
              <p className="text-slate-400 leading-relaxed">
                Practice in an exact replica of the real Prometric testing interface. No surprises on exam day.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[24px] border border-white/10 hover:border-[#BD93F9]/30 p-8 transition-all">
              <div className="p-3 bg-gradient-to-br from-[#BD93F9] to-[#D4B3FF] rounded-2xl w-fit mb-6 shadow-lg shadow-[#BD93F9]/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Adaptive Missions</h3>
              <p className="text-slate-400 leading-relaxed">
                AI-generated daily tasks that adapt to your performance, keeping you focused on what matters most.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-[24px] border border-white/10 hover:border-[#50FA7B]/30 p-8 transition-all">
              <div className="p-3 bg-gradient-to-br from-[#50FA7B] to-[#6AFFB8] rounded-2xl w-fit mb-6 shadow-lg shadow-[#50FA7B]/30">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1→3→2 Strategy</h3>
              <p className="text-slate-400 leading-relaxed">
                Data-backed exam sequencing that increases pass rates by 23% compared to traditional order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="relative z-10 py-24 px-6 border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF8C00]/20 to-[#BD93F9]/20 border border-[#FF8C00]/30 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-[#FF8C00]" />
              <span className="text-sm text-white">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Leave Traditional Study Guides Behind
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              See how EA Coach Pro's AI-powered platform outperforms legacy study materials
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="p-6 border-r border-white/10">
                  <p className="text-slate-400 text-sm mb-2">Old Way</p>
                  <h3 className="text-white font-bold text-lg">Traditional Guides</h3>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FF8C00]/10 to-[#BD93F9]/10">
                  <p className="text-[#FF8C00] text-sm mb-2">New Way</p>
                  <h3 className="text-white font-bold text-lg">EA Coach Pro</h3>
                  <p className="text-[#50FA7B] text-sm">(AI-Powered)</p>
                </div>
              </div>

              {/* Comparison Row 1 */}
              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="p-6 border-r border-white/10">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 leading-relaxed">
                      Static books that get outdated fast
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FF8C00]/5 to-[#BD93F9]/5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                    <p className="text-white leading-relaxed">
                      Live-updated AI trained on the latest IRS pubs
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Row 2 */}
              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="p-6 border-r border-white/10">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 leading-relaxed">
                      One-size-fits-all study plans
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FF8C00]/5 to-[#BD93F9]/5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                    <p className="text-white leading-relaxed">
                      Hyper-personalized missions that evolve daily
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Row 3 */}
              <div className="grid grid-cols-2 border-b border-white/10">
                <div className="p-6 border-r border-white/10">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 leading-relaxed">
                      Limited, repetitive question banks
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FF8C00]/5 to-[#BD93F9]/5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                    <p className="text-white leading-relaxed">
                      Unlimited AI-generated practice scenarios
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Row 4 */}
              <div className="grid grid-cols-2">
                <div className="p-6 border-r border-white/10">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 leading-relaxed">
                      High cost for "luxury" brands
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#FF8C00]/5 to-[#BD93F9]/5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                    <p className="text-white leading-relaxed">
                      Premium performance at a fraction of the price
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA below comparison */}
            <div className="text-center mt-8">
              <button 
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-2xl shadow-[#FF8C00]/40 hover:shadow-[#FF8C00]/60 font-semibold text-lg inline-flex items-center gap-2"
              >
                Try EA Coach Pro Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-slate-400 text-sm mt-4">
                No credit card required • 7-day free trial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 px-6 border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Your Path to Success
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Simple, proven process to get you exam-ready in record time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-full text-white font-bold text-xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Take Diagnostic Test</h3>
                <p className="text-slate-400 leading-relaxed">
                  Our AI analyzes your strengths and weaknesses across all 100 tax sub-topics to create your personalized study plan.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8">
                <ChevronRight className="w-8 h-8 text-[#FF8C00]" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#BD93F9] to-[#D4B3FF] rounded-full text-white font-bold text-xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Study Smart</h3>
                <p className="text-slate-400 leading-relaxed">
                  Follow adaptive daily missions, practice with AI-driven questions, and track your ReadyScore™ as it climbs.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8">
                <ChevronRight className="w-8 h-8 text-[#BD93F9]" />
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#50FA7B] to-[#6AFFB8] rounded-full text-white font-bold text-xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pass with Confidence</h3>
                <p className="text-slate-400 leading-relaxed">
                  Practice in our Prometric simulator until your ReadyScore™ hits 105+, then ace your exam on the first try.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Loved by Tax Professionals
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Join thousands of successful EAs who trusted EA Coach Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF8C00] text-[#FF8C00]" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "Passed all three parts on my first try! The ReadyScore™ was incredibly accurate - I knew exactly when I was ready to sit for each exam."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-full flex items-center justify-center text-white font-bold">
                  SJ
                </div>
                <div>
                  <p className="text-white font-semibold">Sarah Johnson, EA</p>
                  <p className="text-slate-400 text-sm">Tax Consultant, California</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF8C00] text-[#FF8C00]" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "The AI Tax Coach saved me so much time. Instead of searching through textbooks, I got instant, clear explanations of complex tax concepts."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#BD93F9] to-[#D4B3FF] rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="text-white font-semibold">Michael Chen, EA</p>
                  <p className="text-slate-400 text-sm">Senior Accountant, New York</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF8C00] text-[#FF8C00]" />
                ))}
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                "The 1→3→2 study sequence recommendation was game-changing. Finished all three parts in just 9 months while working full-time!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#50FA7B] to-[#6AFFB8] rounded-full flex items-center justify-center text-white font-bold">
                  RP
                </div>
                <div>
                  <p className="text-white font-semibold">Rachel Patel, EA</p>
                  <p className="text-slate-400 text-sm">Tax Advisor, Texas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your timeline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            {/* Monthly Plan */}
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Monthly</h3>
              <p className="text-slate-400 mb-6">Perfect for focused prep</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">$79</span>
                <span className="text-slate-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Full access to all features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">12,000+ practice questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">AI Tax Coach™ Chat</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Prometric Simulator</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition-all font-semibold">
                Start Free Trial
              </button>
            </div>

            {/* 3-Month Plan - Most Popular */}
            <div className="relative bg-gradient-to-br from-[#FF8C00]/20 to-white/[0.08] backdrop-blur-xl rounded-[24px] border-2 border-[#FF8C00] p-8 shadow-2xl shadow-[#FF8C00]/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] rounded-full text-white text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">3 Months</h3>
              <p className="text-slate-400 mb-6">Best value for most students</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">$199</span>
                <span className="text-slate-400">/3 months</span>
                <p className="text-sm text-[#50FA7B] mt-1">Save $38</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Everything in Monthly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Priority AI support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Study plan coaching</span>
                </li>
              </ul>
              <button 
                onClick={onGetStarted}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 font-semibold"
              >
                Start Free Trial
              </button>
            </div>

            {/* Annual Plan */}
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Annual</h3>
              <p className="text-slate-400 mb-6">Maximum flexibility</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-white">$499</span>
                <span className="text-slate-400">/year</span>
                <p className="text-sm text-[#50FA7B] mt-1">Save $449</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Everything in 3 Months</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">1-on-1 coaching sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Lifetime access to updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#50FA7B] mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300">Pass guarantee*</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition-all font-semibold">
                Start Free Trial
              </button>
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm mt-8">
            All plans include a 7-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#FF8C00]/20 via-white/[0.08] to-[#BD93F9]/20 backdrop-blur-xl rounded-[32px] border border-[#FF8C00]/30 p-12 md:p-16">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C00]/10 to-[#BD93F9]/10 opacity-50" />
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Ready to Become an Enrolled Agent?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of successful students who passed their EA exam with our AI-powered platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={onGetStarted}
                  className="group px-10 py-4 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-xl transition-all shadow-2xl shadow-[#FF8C00]/40 hover:shadow-[#FF8C00]/60 font-semibold text-lg flex items-center justify-center gap-2"
                >
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition-all font-semibold text-lg">
                  Schedule a Demo
                </button>
              </div>
              <p className="text-slate-400 text-sm mt-6">
                7-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-white/[0.02] py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-xl shadow-lg shadow-[#FF8C00]/30">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xl font-bold">EA Study Pro</span>
              </div>
              <p className="text-slate-400 text-sm">
                AI-powered platform to help you pass the Enrolled Agent exam faster.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-slate-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">FAQ</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Demo</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-center text-slate-400 text-sm">
              © 2026 EA Coach Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}