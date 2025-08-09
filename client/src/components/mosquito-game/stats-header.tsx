interface StatsHeaderProps {
  mosquitoCount: number;
  clickCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onShowInstructions: () => void;
  onReset: () => void;
}

export function StatsHeader({
  mosquitoCount,
  clickCount,
  soundEnabled,
  onToggleSound,
  onShowInstructions,
  onReset
}: StatsHeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 backdrop-blur-sm border-b"
            style={{
              backgroundColor: 'rgba(26, 26, 26, 0.9)',
              borderColor: 'rgba(74, 74, 74, 0.3)'
            }}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          <h1 className="font-orbitron font-bold text-2xl" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
            Virtual Mosquito Pet
          </h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-orbitron font-bold" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
                {mosquitoCount}
              </span>
              <span className="text-gray-400">Active Mosquitoes</span>
            </div>
            <div className="h-4 w-px bg-gray-500/50"></div>
            <div className="flex items-center space-x-2">
              <span className="font-orbitron text-green-400">{clickCount}</span>
              <span className="text-gray-400">Total Clicks</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Sound Toggle */}
          <button 
            onClick={onToggleSound}
            className="p-2 rounded-lg transition-colors duration-200 border"
            style={{
              backgroundColor: soundEnabled ? 'rgba(45, 74, 43, 0.5)' : 'rgba(74, 74, 74, 0.3)',
              borderColor: 'rgba(74, 74, 74, 0.3)',
              color: 'hsl(48, 84.62%, 58.82%)'
            }}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.636 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.636l3.747-3.776z" clipRule="evenodd"/>
              {soundEnabled && (
                <path d="M14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.895-4.21-2.343-5.657a1 1 0 010-1.414z"/>
              )}
              {!soundEnabled && (
                <path d="M13.5 8.5l3 3m0-3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              )}
            </svg>
          </button>
          
          {/* Instructions Button */}
          <button 
            onClick={onShowInstructions}
            className="px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium border"
            style={{
              backgroundColor: 'rgba(74, 74, 74, 0.3)',
              borderColor: 'rgba(74, 74, 74, 0.3)',
              color: 'white'
            }}>
            How to Play
          </button>
          
          {/* Reset Button */}
          <button 
            onClick={onReset}
            className="px-4 py-2 rounded-lg text-red-400 transition-colors duration-200 text-sm font-medium border border-red-600/30"
            style={{
              backgroundColor: 'rgba(220, 38, 38, 0.2)'
            }}>
            Reset
          </button>
        </div>
      </div>
    </header>
  );
}
