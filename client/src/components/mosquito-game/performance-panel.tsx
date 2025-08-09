import { useEffect, useState } from 'react';

interface PerformancePanelProps {
  mosquitoCount: number;
}

export function PerformancePanel({ mosquitoCount }: PerformancePanelProps) {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState('12.4MB');

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round(frameCount * 1000 / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
        
        // Update memory if available
        if ('memory' in performance) {
          const memoryInfo = (performance as any).memory;
          const memoryMB = (memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(1);
          setMemory(`${memoryMB}MB`);
        }
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    const animationId = requestAnimationFrame(measureFPS);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="absolute bottom-4 left-4 z-20 backdrop-blur-sm rounded-lg border p-4 min-w-48"
         style={{
           backgroundColor: 'rgba(26, 26, 26, 0.9)',
           borderColor: 'rgba(74, 74, 74, 0.3)'
         }}>
      <h3 className="font-orbitron font-bold text-sm mb-2" style={{ color: 'hsl(48, 84.62%, 58.82%)' }}>
        Performance
      </h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-400">FPS:</span>
          <span className="font-mono text-green-400">{fps}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Memory:</span>
          <span className="font-mono text-blue-400">{memory}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Particles:</span>
          <span className="font-mono text-yellow-400">{mosquitoCount}</span>
        </div>
      </div>
    </div>
  );
}
