interface HeatmapTile {
  id: number;
  topic: string;
  mastery: 'high' | 'medium' | 'low' | 'none';
}

export function KnowledgeHeatmap() {
  // Generate 100 tiles with random mastery levels for demo
  const tiles: HeatmapTile[] = Array.from({ length: 100 }, (_, i) => {
    const masteryLevels: ('high' | 'medium' | 'low' | 'none')[] = ['high', 'medium', 'low', 'none'];
    const weights = [0.25, 0.35, 0.25, 0.15]; // Distribution weights
    
    const random = Math.random();
    let mastery: 'high' | 'medium' | 'low' | 'none';
    
    if (random < weights[0]) mastery = 'high';
    else if (random < weights[0] + weights[1]) mastery = 'medium';
    else if (random < weights[0] + weights[1] + weights[2]) mastery = 'low';
    else mastery = 'none';
    
    return {
      id: i,
      topic: `Topic ${i + 1}`,
      mastery
    };
  });
  
  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'high':
        return 'bg-[#50FA7B] hover:bg-[#6AFFB8] shadow-[0_0_8px_rgba(80,250,123,0.4)]';
      case 'medium':
        return 'bg-[#FF8C00] hover:bg-[#FFA500] shadow-[0_0_8px_rgba(255,140,0,0.4)]';
      case 'low':
        return 'bg-[#BD93F9] hover:bg-[#D4B3FF] shadow-[0_0_8px_rgba(189,147,249,0.4)]';
      case 'none':
        return 'bg-[#252525] hover:bg-[#2a2a2a]';
      default:
        return 'bg-[#252525]';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/10 p-4 md:p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-3">
        <div>
          <h3 className="text-white/90">Knowledge Heatmap</h3>
          <p className="text-slate-400 text-sm mt-1">100 Tax Sub-Topics Mastery</p>
        </div>
        
        {/* Legend */}
        <div className="flex gap-2 md:gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#50FA7B]" />
            <span className="text-slate-400">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#FF8C00]" />
            <span className="text-slate-400">Medium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#BD93F9]" />
            <span className="text-slate-400">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#252525]" />
            <span className="text-slate-400">None</span>
          </div>
        </div>
      </div>
      
      {/* 10x10 Grid */}
      <div className="grid grid-cols-10 gap-2">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`aspect-square rounded-lg transition-all duration-300 cursor-pointer ${getMasteryColor(tile.mastery)}`}
            title={`${tile.topic} - ${tile.mastery} mastery`}
          />
        ))}
      </div>
      
      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-[#50FA7B] text-2xl">{tiles.filter(t => t.mastery === 'high').length}</div>
          <div className="text-slate-500 text-xs mt-1">Mastered</div>
        </div>
        <div className="text-center">
          <div className="text-[#FF8C00] text-2xl">{tiles.filter(t => t.mastery === 'medium').length}</div>
          <div className="text-slate-500 text-xs mt-1">Learning</div>
        </div>
        <div className="text-center">
          <div className="text-[#BD93F9] text-2xl">{tiles.filter(t => t.mastery === 'low').length}</div>
          <div className="text-slate-500 text-xs mt-1">Struggling</div>
        </div>
        <div className="text-center">
          <div className="text-slate-400 text-2xl">{tiles.filter(t => t.mastery === 'none').length}</div>
          <div className="text-slate-500 text-xs mt-1">Not Started</div>
        </div>
      </div>
    </div>
  );
}