import { useState } from 'react';
import { Trophy, TrendingUp, AlertTriangle, XCircle, Target, BookOpen, ChevronRight, BarChart3, FileText } from 'lucide-react';

interface DomainScore {
  domain: string;
  topic: string;
  rawScore: number;
  totalQuestions: number;
  proficiencyLevel: 'Above' | 'Near' | 'Below';
  level: 1 | 2 | 3; // IRS Level system
  irsPublications: string[];
}

interface ExamResults {
  scaledScore: number;
  rawScore: number;
  totalQuestions: number;
  experimentalQuestions: number;
  passed: boolean;
  examPart: 'Part 1' | 'Part 2' | 'Part 3';
  domains: DomainScore[];
  timeSpent: string;
  accuracy: number;
}

export function MockExamResults({ onClose, onGenerateStudyPlan }: { 
  onClose: () => void;
  onGenerateStudyPlan?: (weakDomains: DomainScore[]) => void;
}) {
  // Mock data - in real app, this would come from the exam session
  const results: ExamResults = {
    scaledScore: 87,
    rawScore: 62,
    totalQuestions: 100,
    experimentalQuestions: 15,
    passed: false,
    examPart: 'Part 1',
    timeSpent: '2h 45m',
    accuracy: 73,
    domains: [
      {
        domain: 'Income and Assets',
        topic: 'Gross Income and Filing Requirements',
        rawScore: 12,
        totalQuestions: 15,
        proficiencyLevel: 'Above',
        level: 3,
        irsPublications: ['Pub 17', 'Pub 501']
      },
      {
        domain: 'Income and Assets',
        topic: 'Capital Gains and Losses',
        rawScore: 8,
        totalQuestions: 12,
        proficiencyLevel: 'Near',
        level: 2,
        irsPublications: ['Pub 550', 'Pub 544']
      },
      {
        domain: 'Deductions and Credits',
        topic: 'Itemized Deductions',
        rawScore: 7,
        totalQuestions: 10,
        proficiencyLevel: 'Near',
        level: 2,
        irsPublications: ['Pub 17', 'Pub 502']
      },
      {
        domain: 'Deductions and Credits',
        topic: 'Tax Credits',
        rawScore: 9,
        totalQuestions: 14,
        proficiencyLevel: 'Above',
        level: 3,
        irsPublications: ['Pub 972', 'Pub 596']
      },
      {
        domain: 'Specialized Returns',
        topic: 'Self-Employment Tax',
        rawScore: 4,
        totalQuestions: 10,
        proficiencyLevel: 'Below',
        level: 1,
        irsPublications: ['Pub 334', 'Pub 535', 'Schedule C Instructions']
      },
      {
        domain: 'Specialized Returns',
        topic: 'Rental Income and Expenses',
        rawScore: 5,
        totalQuestions: 11,
        proficiencyLevel: 'Below',
        level: 1,
        irsPublications: ['Pub 527', 'Pub 925']
      },
      {
        domain: 'Retirement and Investments',
        topic: 'IRA Contributions and Distributions',
        rawScore: 6,
        totalQuestions: 13,
        proficiencyLevel: 'Below',
        level: 1,
        irsPublications: ['Pub 590-A', 'Pub 590-B']
      },
      {
        domain: 'Basis and Depreciation',
        topic: 'Cost Basis Calculations',
        rawScore: 7,
        totalQuestions: 10,
        proficiencyLevel: 'Near',
        level: 2,
        irsPublications: ['Pub 551', 'Pub 550']
      },
      {
        domain: 'Basis and Depreciation',
        topic: 'MACRS Depreciation',
        rawScore: 4,
        totalQuestions: 10,
        proficiencyLevel: 'Below',
        level: 1,
        irsPublications: ['Pub 946', 'Form 4562 Instructions']
      }
    ]
  };

  const getProficiencyColor = (level: 'Above' | 'Near' | 'Below') => {
    switch (level) {
      case 'Above':
        return {
          bg: 'from-[#50FA7B]/20 to-[#50FA7B]/10',
          border: 'border-[#50FA7B]/30',
          text: 'text-[#50FA7B]',
          icon: 'text-[#50FA7B]'
        };
      case 'Near':
        return {
          bg: 'from-[#FFD700]/20 to-[#FFD700]/10',
          border: 'border-[#FFD700]/30',
          text: 'text-[#FFD700]',
          icon: 'text-[#FFD700]'
        };
      case 'Below':
        return {
          bg: 'from-[#ff3b30]/20 to-[#ff3b30]/10',
          border: 'border-[#ff3b30]/30',
          text: 'text-[#ff3b30]',
          icon: 'text-[#ff3b30]'
        };
    }
  };

  const getProficiencyIcon = (level: 'Above' | 'Near' | 'Below') => {
    switch (level) {
      case 'Above':
        return <Trophy className="w-5 h-5" />;
      case 'Near':
        return <AlertTriangle className="w-5 h-5" />;
      case 'Below':
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getLevelLabel = (level: 1 | 2 | 3) => {
    switch (level) {
      case 3:
        return 'Level 3: Demonstrated Understanding';
      case 2:
        return 'Level 2: Partial Understanding';
      case 1:
        return 'Level 1: Needs Significant Improvement';
    }
  };

  const weakDomains = results.domains.filter(d => d.proficiencyLevel === 'Below');
  const nearDomains = results.domains.filter(d => d.proficiencyLevel === 'Near');
  const strongDomains = results.domains.filter(d => d.proficiencyLevel === 'Above');

  const handleGenerateStudyPlan = () => {
    if (onGenerateStudyPlan) {
      onGenerateStudyPlan(weakDomains);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] dark p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-3xl mb-2">IRS SEE Practice Exam Results</h1>
            <p className="text-slate-400">Official-style diagnostic report • {results.examPart}: Individuals</p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Scaled Score Hero Section */}
        <div className={`mb-8 bg-gradient-to-br ${
          results.passed 
            ? 'from-[#50FA7B]/20 to-[#50FA7B]/10 border-[#50FA7B]/30' 
            : 'from-[#FF8C00]/20 to-[#FFA500]/10 border-[#FF8C00]/30'
        } backdrop-blur-xl rounded-[32px] border-2 p-12 text-center shadow-2xl`}>
          <div className="mb-4">
            <span className="text-slate-400 text-sm uppercase tracking-wider">Official Scaled Score</span>
          </div>
          
          {/* Main Score Display */}
          <div className="relative inline-block mb-6">
            <div className={`text-[120px] leading-none font-black ${
              results.passed ? 'text-[#50FA7B]' : 'text-[#FF8C00]'
            }`}>
              {results.scaledScore}
            </div>
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-slate-500 text-4xl">/130</div>
          </div>

          {/* Pass/Fail Status */}
          <div className="mb-6">
            {results.passed ? (
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#50FA7B]/20 border border-[#50FA7B]/40 rounded-full">
                <Trophy className="w-6 h-6 text-[#50FA7B]" />
                <span className="text-[#50FA7B] text-xl font-bold">PASSED</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF8C00]/20 border border-[#FF8C00]/40 rounded-full">
                <Target className="w-6 h-6 text-[#FF8C00]" />
                <span className="text-[#FF8C00] text-xl font-bold">BELOW PASSING (105 Required)</span>
              </div>
            )}
          </div>

          {/* Score Context */}
          <div className="text-slate-400 text-sm mb-6">
            You need <span className="text-white font-semibold">18</span> more points to reach the passing threshold
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-slate-400 text-xs mb-1">Raw Score</div>
              <div className="text-white text-2xl font-bold">{results.rawScore}/{results.totalQuestions - results.experimentalQuestions}</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-slate-400 text-xs mb-1">Accuracy</div>
              <div className="text-white text-2xl font-bold">{results.accuracy}%</div>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
              <div className="text-slate-400 text-xs mb-1">Time Spent</div>
              <div className="text-white text-2xl font-bold">{results.timeSpent}</div>
            </div>
          </div>
        </div>

        {/* Proficiency Breakdown */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-[#BD93F9]" />
              <h2 className="text-white text-2xl">Domain Proficiency Analysis</h2>
            </div>
            <div className="text-slate-400 text-sm">Based on {results.totalQuestions - results.experimentalQuestions} scored questions</div>
          </div>

          <div className="space-y-4">
            {/* Below Proficiency - RED ZONE */}
            {weakDomains.length > 0 && (
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#ff3b30]/20 rounded-xl">
                    <XCircle className="w-5 h-5 text-[#ff3b30]" />
                  </div>
                  <h3 className="text-white text-lg font-semibold">Below Proficiency</h3>
                  <span className="text-slate-400 text-sm">({weakDomains.length} domains)</span>
                </div>
                
                <div className="space-y-3">
                  {weakDomains.map((domain, index) => {
                    const colors = getProficiencyColor(domain.proficiencyLevel);
                    return (
                      <div key={index} className={`bg-gradient-to-br ${colors.bg} backdrop-blur border ${colors.border} rounded-xl p-5`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-semibold">{domain.topic}</span>
                              <span className="px-2 py-0.5 bg-[#ff3b30]/30 rounded text-[#ff3b30] text-xs font-semibold">
                                {getLevelLabel(domain.level)}
                              </span>
                            </div>
                            <div className="text-slate-400 text-sm mb-2">{domain.domain}</div>
                            <div className="text-slate-300 text-xs">
                              Score: {domain.rawScore}/{domain.totalQuestions} ({Math.round((domain.rawScore / domain.totalQuestions) * 100)}%)
                            </div>
                          </div>
                          <div className={colors.icon}>
                            {getProficiencyIcon(domain.proficiencyLevel)}
                          </div>
                        </div>

                        {/* IRS Publications */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400 text-xs">Focus on:</span>
                          {domain.irsPublications.map((pub, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-300 text-xs font-medium">
                              {pub}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Near Proficiency - YELLOW ZONE */}
            {nearDomains.length > 0 && (
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#FFD700]/20 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <h3 className="text-white text-lg font-semibold">Near Proficiency</h3>
                  <span className="text-slate-400 text-sm">({nearDomains.length} domains)</span>
                </div>
                
                <div className="space-y-3">
                  {nearDomains.map((domain, index) => {
                    const colors = getProficiencyColor(domain.proficiencyLevel);
                    return (
                      <div key={index} className={`bg-gradient-to-br ${colors.bg} backdrop-blur border ${colors.border} rounded-xl p-5`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-semibold">{domain.topic}</span>
                              <span className="px-2 py-0.5 bg-[#FFD700]/30 rounded text-[#FFD700] text-xs font-semibold">
                                {getLevelLabel(domain.level)}
                              </span>
                            </div>
                            <div className="text-slate-400 text-sm mb-2">{domain.domain}</div>
                            <div className="text-slate-300 text-xs">
                              Score: {domain.rawScore}/{domain.totalQuestions} ({Math.round((domain.rawScore / domain.totalQuestions) * 100)}%)
                            </div>
                          </div>
                          <div className={colors.icon}>
                            {getProficiencyIcon(domain.proficiencyLevel)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          <BookOpen className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-400 text-xs">Review:</span>
                          {domain.irsPublications.map((pub, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-300 text-xs font-medium">
                              {pub}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Above Proficiency - GREEN ZONE */}
            {strongDomains.length > 0 && (
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[20px] border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#50FA7B]/20 rounded-xl">
                    <Trophy className="w-5 h-5 text-[#50FA7B]" />
                  </div>
                  <h3 className="text-white text-lg font-semibold">Above Proficiency</h3>
                  <span className="text-slate-400 text-sm">({strongDomains.length} domains)</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {strongDomains.map((domain, index) => {
                    const colors = getProficiencyColor(domain.proficiencyLevel);
                    return (
                      <div key={index} className={`bg-gradient-to-br ${colors.bg} backdrop-blur border ${colors.border} rounded-xl p-4`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <span className="text-white font-semibold text-sm">{domain.topic}</span>
                            <div className="text-slate-300 text-xs mt-1">
                              {domain.rawScore}/{domain.totalQuestions} ({Math.round((domain.rawScore / domain.totalQuestions) * 100)}%)
                            </div>
                          </div>
                          <Trophy className="w-4 h-4 text-[#50FA7B]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Experimental Questions Disclaimer */}
        <div className="mb-8 bg-gradient-to-br from-[#BD93F9]/10 to-white/5 backdrop-blur-xl rounded-[20px] border border-[#BD93F9]/20 p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#BD93F9]/20 rounded-xl flex-shrink-0">
              <FileText className="w-6 h-6 text-[#BD93F9]" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">About Experimental Questions</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                This exam included <span className="text-[#BD93F9] font-semibold">{results.experimentalQuestions} experimental questions</span> that 
                were <span className="text-white font-semibold">NOT counted toward your scaled score</span>. The IRS uses experimental questions 
                to test new content for future exams. On the real SEE exam, you won't know which questions are experimental.
              </p>
              <p className="text-slate-400 text-xs">
                Your scaled score of {results.scaledScore} was calculated from {results.totalQuestions - results.experimentalQuestions} scored questions only.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleGenerateStudyPlan}
            className="group relative overflow-hidden p-6 bg-gradient-to-r from-[#FF8C00] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FF8C00] rounded-xl transition-all shadow-lg shadow-[#FF8C00]/30 hover:shadow-[#FF8C00]/50"
          >
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Target className="w-8 h-8 text-white" />
                <div className="text-left">
                  <div className="text-white font-bold text-lg">Generate Weak-Area Study Plan</div>
                  <div className="text-white/80 text-sm">Focus on {weakDomains.length} domains below proficiency</div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button
            onClick={onClose}
            className="p-6 bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.06] backdrop-blur-xl rounded-xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-[#50FA7B]" />
                <div className="text-left">
                  <div className="text-white font-bold text-lg">Retake Practice Exam</div>
                  <div className="text-slate-400 text-sm">Try again with a new question set</div>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
