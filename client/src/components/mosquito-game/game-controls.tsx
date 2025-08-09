interface GameControlsProps {
  speedMultiplier: number;
  onSpeedChange: (speed: number) => void;
  onSpawnMosquito: () => void;
  onClearAll: () => void;
}

export function GameControls({
  speedMultiplier,
  onSpeedChange,
  onSpawnMosquito,
  onClearAll
}: GameControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 z-20 backdrop-blur-sm rounded-lg border p-4"
         style={{
           backgroundColor: 'rgba(26, 26, 26, 0.9)',
           borderColor: 'rgba(74, 74, 74, 0.3)'
         }}>
      <h3 className="font-orbitron font-bold text-sm mb-3" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
        Controls
      </h3>
      <div className="space-y-2">
        <button 
          onClick={onSpawnMosquito}
          className="w-full px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 border"
          style={{
            backgroundColor: 'hsl(120, 23.68%, 23.14%)',
            borderColor: 'rgba(74, 74, 74, 0.3)',
            color: 'white'
          }}>
          Spawn Mosquito
        </button>
        <button 
          onClick={onClearAll}
          className="w-full px-3 py-2 text-red-400 rounded-md text-sm font-medium transition-colors duration-200 border border-red-600/30"
          style={{
            backgroundColor: 'rgba(220, 38, 38, 0.2)'
          }}>
          Clear All
        </button>
        <div className="pt-2 border-t" style={{ borderColor: 'rgba(74, 74, 74, 0.3)' }}>
          <label className="block text-xs text-gray-400 mb-1">Speed Multiplier</label>
          <input 
            type="range" 
            min="0.5" 
            max="3" 
            step="0.1" 
            value={speedMultiplier}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.5x</span>
            <span>{speedMultiplier.toFixed(1)}x</span>
            <span>3.0x</span>
          </div>
        </div>
      </div>
    </div>
  );
}
