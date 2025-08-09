import { useEffect, useRef, useCallback } from 'react';
import { MosquitoEngine } from '@/lib/mosquito-engine';
import { SoundManager } from '@/lib/sound-manager';

interface GameCanvasProps {
  speedMultiplier: number;
  soundEnabled: boolean;
  onMosquitoCountChange: (count: number) => void;
  onClickCountChange: (count: number) => void;
  mosquitoEngine: MosquitoEngine;
  soundManager: SoundManager;
}

export function GameCanvas({
  speedMultiplier,
  soundEnabled,
  onMosquitoCountChange,
  onClickCountChange,
  mosquitoEngine,
  soundManager
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    mosquitoEngine.setCanvasSize(window.innerWidth, window.innerHeight);
  }, [mosquitoEngine]);

  const animate = useCallback((currentTime: number) => {
    if (!canvasRef.current) return;
    
    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with gradient background
    const gradient = ctx.createRadialGradient(
      canvasRef.current.width / 2, canvasRef.current.height / 2, 0,
      canvasRef.current.width / 2, canvasRef.current.height / 2, Math.max(canvasRef.current.width, canvasRef.current.height) / 2
    );
    gradient.addColorStop(0, 'hsl(0, 0%, 10.2%)');
    gradient.addColorStop(1, 'hsl(0, 0%, 5.88%)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Update and render mosquitoes
    mosquitoEngine.update(deltaTime);
    mosquitoEngine.render(ctx);
    
    // Update mosquito count
    onMosquitoCountChange(mosquitoEngine.getCount());
    
    animationRef.current = requestAnimationFrame(animate);
  }, [mosquitoEngine, onMosquitoCountChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mosquitoEngine.setMousePosition(x, y);
  }, [mosquitoEngine]);

  const handleClick = useCallback((e: MouseEvent) => {
    if (!canvasRef.current) return;
    
    // Resume audio context on first interaction
    soundManager.resumeContext();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const clickedMosquitoes = mosquitoEngine.checkClick(x, y);
    
    if (clickedMosquitoes.length > 0) {
      clickCountRef.current += clickedMosquitoes.length;
      onClickCountChange(clickCountRef.current);
      
      // Play click sound
      if (soundEnabled) {
        soundManager.playClickSound();
      }
      
      // Multiply mosquitoes
      clickedMosquitoes.forEach(mosquito => {
        const newMosquitoes = mosquitoEngine.multiplyMosquito(mosquito, 2);
        if (soundEnabled && newMosquitoes.length > 0) {
          setTimeout(() => soundManager.playMultiplySound(), 100);
        }
      });
    }
  }, [mosquitoEngine, soundManager, soundEnabled, onClickCountChange]);

  useEffect(() => {
    mosquitoEngine.setSpeedMultiplier(speedMultiplier);
  }, [speedMultiplier, mosquitoEngine]);

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled, soundManager]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    canvasRef.current.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('click', handleClick);
    
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('click', handleClick);
      }
    };
  }, [handleMouseMove, handleClick]);

  useEffect(() => {
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full mosquito-cursor"
    />
  );
}