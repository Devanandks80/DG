export class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private masterVolume: number = 0.3;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private createOscillator(frequency: number, type: OscillatorType = 'sine'): OscillatorNode | null {
    if (!this.audioContext || !this.enabled) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);

    return oscillator;
  }

  playBuzzSound() {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.createOscillator(200, 'sawtooth');
    if (!oscillator) return;

    const gainNode = oscillator.context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Create buzzing effect
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.1, this.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);

    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(250, this.audioContext.currentTime + 0.05);
    oscillator.frequency.linearRampToValueAtTime(180, this.audioContext.currentTime + 0.1);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  playClickSound() {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.createOscillator(400, 'square');
    if (!oscillator) return;

    const gainNode = oscillator.context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    gainNode.gain.setValueAtTime(this.masterVolume * 0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  playMultiplySound() {
    if (!this.enabled || !this.audioContext) return;

    // Play a sequence of tones
    const frequencies = [400, 500, 600];
    frequencies.forEach((freq, index) => {
      const oscillator = this.createOscillator(freq, 'sine');
      if (!oscillator) return;

      const gainNode = oscillator.context.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      const startTime = this.audioContext!.currentTime + (index * 0.05);
      gainNode.gain.setValueAtTime(this.masterVolume * 0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  }

  resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
