import { useState, useEffect, useMemo } from 'react';
import { StatsHeader } from '@/components/mosquito-game/stats-header';
import { PerformancePanel } from '@/components/mosquito-game/performance-panel';
import { GameControls } from '@/components/mosquito-game/game-controls';
import { InstructionsModal } from '@/components/mosquito-game/instructions-modal';
import { GameCanvas } from '@/components/mosquito-game/game-canvas';
import { MosquitoEngine } from '@/lib/mosquito-engine';
import { SoundManager } from '@/lib/sound-manager';

export default function MosquitoGame() {
  const [mosquitoCount, setMosquitoCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Create engine and sound manager instances
  const mosquitoEngine = useMemo(() => new MosquitoEngine(window.innerWidth, window.innerHeight), []);
  const soundManager = useMemo(() => new SoundManager(), []);

  useEffect(() => {
    // Initialize with one mosquito after loading
    const timer = setTimeout(() => {
      mosquitoEngine.createMosquito();
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [mosquitoEngine]);

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  const handleStartGame = () => {
    setShowInstructions(false);
  };

  const handleReset = () => {
    mosquitoEngine.clearAll();
    mosquitoEngine.createMosquito();
    setClickCount(0);
  };

  const handleSpawnMosquito = () => {
    mosquitoEngine.createMosquito();
    if (soundEnabled) {
      soundManager.playBuzzSound();
    }
  };

  const handleClearAll = () => {
    mosquitoEngine.clearAll();
  };

  const handleSpeedChange = (speed: number) => {
    setSpeedMultiplier(speed);
  };

  if (isLoading) {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center"
           style={{ backgroundColor: 'hsl(0, 0%, 5.88%)' }}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-t-transparent mb-4"
               style={{ 
                 borderColor: 'hsl(0, 0%, 29.02%)',
                 borderTopColor: 'hsl(48, 84.62%, 58.82%)'
               }}></div>
          <h2 className="font-orbitron font-bold text-2xl mb-2"
              style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
            Loading Virtual Mosquito Pet
          </h2>
          <p className="text-gray-400 text-sm">Preparing your digital insect experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden"
         style={{ backgroundColor: 'hsl(0, 0%, 5.88%)' }}>
      
      <StatsHeader
        mosquitoCount={mosquitoCount}
        clickCount={clickCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onShowInstructions={handleShowInstructions}
        onReset={handleReset}
      />

      <GameCanvas
        speedMultiplier={speedMultiplier}
        soundEnabled={soundEnabled}
        onMosquitoCountChange={setMosquitoCount}
        onClickCountChange={setClickCount}
        mosquitoEngine={mosquitoEngine}
        soundManager={soundManager}
      />

      <PerformancePanel mosquitoCount={mosquitoCount} />

      <GameControls
        speedMultiplier={speedMultiplier}
        onSpeedChange={handleSpeedChange}
        onSpawnMosquito={handleSpawnMosquito}
        onClearAll={handleClearAll}
      />

      <InstructionsModal
        isOpen={showInstructions}
        onClose={handleCloseInstructions}
        onStartGame={handleStartGame}
      />
    </div>
  );
}
