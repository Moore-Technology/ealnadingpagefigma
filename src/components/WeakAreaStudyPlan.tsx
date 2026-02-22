import { Target, BookOpen, Video, FileText, CheckCircle, Calendar, TrendingUp, Zap } from 'lucide-react';

interface WeakDomain {
  domain: string;
  topic: string;
  rawScore: number;
  totalQuestions: number;
  proficiencyLevel: 'Below';
  level: 1 | 2 | 3;
  irsPublications: string[];
}

interface StudyTask {
  type: 'read' | 'practice' | 'video' | 'quiz';
  title: string;
  duration: string;
  resource: string;
  completed: boolean;
}

interface StudyModule {
  topic: string;
  currentScore: number;
  targetScore: number;
  priority: 'High' | 'Medium';
  estimatedHours: number;
  tasks: StudyTask[];
  irsPublications: string[];
}

export function WeakAreaStudyPlan({ 
  weakDomains, 
  onClose 
}: { 
  weakDomains: WeakDomain[];
  onClose: () => void;
}) {
  // Generate study plan from weak domains
  const studyModules: StudyModule[] = weakDomains.map(domain => ({
    topic: domain.topic,
    currentScore: Math.round((domain.rawScore / domain.totalQuestions) * 100),
    targetScore: 80,
    priority: domain.level === 1 ? 'High' : 'Medium',
    estimatedHours: domain.level === 1 ? 8 : 5,
    irsPublications: domain.irsPublications,
    tasks: [
      {
        type: 'read',
        title: `Read ${domain.irsPublications[0]} (${domain.topic})`,
        duration: '2 hours',
        resource: domain.irsPublications[0],
        completed: false
      },
      {
        type: 'video',
        title: `Watch: ${domain.topic} Explained`,
        duration: '45 min',
        resource: 'Video Tutorial',
        completed: false
      },
      {
        type: 'practice',
        title: `Practice: 20 ${domain.topic} Questions`,
        duration: '1 hour',
        resource: 'Question Bank',
        completed: false
      },
      {
        type: 'quiz',
        title: `Quiz: ${domain.topic} Assessment`,
        duration: '30 min',
        resource: 'Practice Quiz',
        completed: false
      }
    ]
  }));

  const totalHours = studyModules.reduce((sum, module) => sum + module.estimatedHours, 0);
  const highPriorityCount = studyModules.filter(m => m.priority === 'High').length;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'read':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'practice':
        return <Target className="w-4 h-4" />;
      case 'quiz':
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] dark p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-white text-3xl mb-2">Personalized Study Plan</h1>
              <p className="text-slate-400">AI-generated roadmap based on your diagnostic results</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
            >
              Back to Results
            </button>
          </div>

          {/* Plan Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#FF8C00]/20 to-[#FFA500]/10 backdrop-blur-xl rounded-[20px] border border-[#FF8C00]/30 p-5">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-[#FF8C00]" />
                <span className="text-slate-300 text-sm">Focus Areas</span>
              </div>
              <div className="text-white text-3xl font-bold">{studyModules.length}</div>
              <div className="text-slate-400 text-xs mt-1">{highPriorityCount} high priority</div>
            </div>

            <div className="bg-gradient-to-br from-[#BD93F9]/20 to-[#BD93F9]/10 backdrop-blur-xl rounded-[20px] border border-[#BD93F9]/30 p-5">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-[#BD93F9]" />
                <span className="text-slate-300 text-sm">Est. Time</span>
              </div>
              <div className="text-white text-3xl font-bold">{totalHours}h</div>
              <div className="text-slate-400 text-xs mt-1">~{Math.ceil(totalHours / 7)} days</div>
            </div>

            <div className="bg-gradient-to-br from-[#50FA7B]/20 to-[#50FA7B]/10 backdrop-blur-xl rounded-[20px] border border-[#50FA7B]/30 p-5">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-[#50FA7B]" />
                <span className="text-slate-300 text-sm">Target Gain</span>
              </div>
              <div className="text-white text-3xl font-bold">+18</div>
              <div className="text-slate-400 text-xs mt-1">scaled points</div>
            </div>

            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-slate-300" />
                <span className="text-slate-300 text-sm">Resources</span>
              </div>
              <div className="text-white text-3xl font-bold">{studyModules.length * 4}</div>
              <div className="text-slate-400 text-xs mt-1">curated materials</div>
            </div>
          </div>
        </div>

        {/* Study Modules */}
        <div className="space-y-6">
          {studyModules.map((module, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-8"
            >
              {/* Module Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-xl font-semibold">{module.topic}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      module.priority === 'High'
                        ? 'bg-[#ff3b30]/20 border border-[#ff3b30]/30 text-[#ff3b30]'
                        : 'bg-[#FFD700]/20 border border-[#FFD700]/30 text-[#FFD700]'
                    }`}>
                      {module.priority} Priority
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    Current Score: {module.currentScore}% → Target: {module.targetScore}% 
                    <span className="text-[#50FA7B] ml-2">+{module.targetScore - module.currentScore}%</span>
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#ff3b30] via-[#FFD700] to-[#50FA7B] rounded-full transition-all"
                        style={{ width: `${module.currentScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-slate-500 text-xs">Current</span>
                      <span className="text-slate-500 text-xs">Target: {module.targetScore}%</span>
                    </div>
                  </div>

                  {/* IRS Publications */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <BookOpen className="w-4 h-4 text-[#BD93F9]" />
                    <span className="text-slate-400 text-sm">Key Resources:</span>
                    {module.irsPublications.map((pub, i) => (
                      <a
                        key={i}
                        href={`https://www.irs.gov/publications/${pub.toLowerCase().replace(' ', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#BD93F9]/10 border border-[#BD93F9]/30 rounded-lg text-[#BD93F9] text-sm font-medium hover:bg-[#BD93F9]/20 transition-colors"
                      >
                        {pub}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-slate-400 text-sm mb-1">Est. Time</div>
                  <div className="text-white text-2xl font-bold">{module.estimatedHours}h</div>
                </div>
              </div>

              {/* Study Tasks */}
              <div className="space-y-3">
                <div className="text-slate-300 font-semibold text-sm mb-3">Learning Path:</div>
                {module.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="flex items-center gap-4 p-4 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-xl transition-colors group cursor-pointer"
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      task.completed
                        ? 'bg-[#50FA7B]/20 border-2 border-[#50FA7B]'
                        : 'bg-white/5 border-2 border-white/10 group-hover:border-white/20'
                    }`}>
                      {task.completed ? (
                        <CheckCircle className="w-5 h-5 text-[#50FA7B]" />
                      ) : (
                        <div className={task.completed ? 'text-[#50FA7B]' : 'text-slate-400'}>
                          {getTaskIcon(task.type)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">{task.title}</div>
                      <div className="text-slate-400 text-xs">{task.resource}</div>
                    </div>

                    <div className="text-slate-400 text-sm">{task.duration}</div>

                    <button className="px-4 py-2 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] text-white rounded-lg text-sm font-semibold transition-all opacity-0 group-hover:opacity-100">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-6 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50">
            <div className="flex items-center justify-center gap-3">
              <Zap className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Start Study Plan Now</span>
            </div>
          </button>

          <button className="p-6 bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6 text-[#BD93F9]" />
              <span className="text-white font-bold text-lg">Schedule Study Sessions</span>
            </div>
          </button>
        </div>

        {/* AI Study Tips */}
        <div className="mt-8 bg-gradient-to-br from-[#BD93F9]/10 to-white/5 backdrop-blur-xl rounded-[20px] border border-[#BD93F9]/20 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#BD93F9]/20 rounded-xl">
              <Target className="w-6 h-6 text-[#BD93F9]" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">AI Study Recommendations</h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#BD93F9] rounded-full mt-2 flex-shrink-0" />
                  <span>Focus on <strong className="text-white">Self-Employment Tax</strong> first - it's your lowest scoring area and heavily tested on Part 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#BD93F9] rounded-full mt-2 flex-shrink-0" />
                  <span>Complete <strong className="text-white">Pub 334</strong> and practice Schedule C calculations - these appear in 15-20% of Part 1 questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#BD93F9] rounded-full mt-2 flex-shrink-0" />
                  <span>MACRS depreciation is your second priority - use the <strong className="text-white">Pub 946 worksheets</strong> to build muscle memory</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[#BD93F9] rounded-full mt-2 flex-shrink-0" />
                  <span>Your strong areas (Tax Credits, Gross Income) can be maintained with <strong className="text-white">10-minute daily reviews</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
