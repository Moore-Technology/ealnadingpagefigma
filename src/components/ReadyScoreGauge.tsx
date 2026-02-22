import { useEffect, useState } from 'react';

interface ReadyScoreGaugeProps {
  score: number; // 40-130 scale
  questionsAnswered?: number; // For confidence interval calculation
}

export function ReadyScoreGauge({ score, questionsAnswered = 100 }: ReadyScoreGaugeProps) {
  // Calculate confidence interval based on sample size
  const calculateConfidenceInterval = () => {
    // Statistical confidence decreases with fewer questions
    // Using simplified margin of error calculation
    const minSample = 50;
    const maxSample = 500;
    const maxMargin = 18;
    const minMargin = 3;
    
    if (questionsAnswered < minSample) {
      return maxMargin;
    } else if (questionsAnswered > maxSample) {
      return minMargin;
    } else {
      // Linear interpolation
      const ratio = (questionsAnswered - minSample) / (maxSample - minSample);
      return Math.round(maxMargin - (ratio * (maxMargin - minMargin)));
    }
  };
  
  const confidenceInterval = calculateConfidenceInterval();
  const lowerBound = Math.max(40, score - confidenceInterval);
  const upperBound = Math.min(130, score + confidenceInterval);
  
  // Normalize score to 0-100 for arc calculation (40 = 0%, 130 = 100%)
  const normalizedScore = Math.max(0, Math.min(100, ((score - 40) / 90) * 100));
  const rotation = (normalizedScore / 100) * 270 - 135; // -135° to +135° arc

  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 100) return '#50FA7B'; // Neon emerald
    if (score >= 75) return '#FF8C00'; // Vivid orange
    if (score >= 50) return '#FFA500'; // Bright orange
    return '#BD93F9'; // Vivid purple
  };
  
  const getScoreGradient = () => {
    if (score >= 100) return 'from-[#50FA7B] to-[#6AFFB8]';
    if (score >= 75) return 'from-[#FF8C00] to-[#FFA500]';
    if (score >= 50) return 'from-[#FFA500] to-[#FFB84D]';
    return 'from-[#BD93F9] to-[#D4B3FF]';
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Glass card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-2xl" />
      
      <div className="relative p-6 md:p-12 flex flex-col items-center">
        {/* SVG Circular Gauge - Responsive sizing */}
        <div className="relative">
          <svg className="transform -rotate-90 w-[240px] h-[240px] md:w-[320px] md:h-[320px]" viewBox="0 0 320 320">
            {/* Background circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="20"
              fill="none"
            />
            
            {/* Progress circle with glow */}
            <circle
              cx="160"
              cy="160"
              r="140"
              stroke={getScoreColor()}
              strokeWidth="20"
              fill="none"
              strokeDasharray={2 * Math.PI * 140}
              strokeDashoffset={2 * Math.PI * 140 * (1 - normalizedScore / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: `drop-shadow(0 0 12px ${getScoreColor()})`
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-7xl font-bold bg-gradient-to-br ${getScoreGradient()} bg-clip-text text-transparent`}>
              {score}
            </div>
            <div className="text-slate-400 text-sm mt-1">± {confidenceInterval}</div>
            <div className="text-slate-500 text-xs mt-1">({lowerBound}–{upperBound})</div>
            <div className="text-white/90 mt-4 px-6 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              ReadySCORE™
            </div>
          </div>
        </div>
        
        {/* Status text */}
        <div className="mt-8 text-center">
          <div className="text-slate-300">
            {score >= 100 && "🎯 Exam Ready!"}
            {score >= 75 && score < 100 && "📚 Almost There"}
            {score >= 50 && score < 75 && "💪 Keep Studying"}
            {score < 50 && "🚀 Just Getting Started"}
          </div>
        </div>
      </div>
    </div>
  );
}