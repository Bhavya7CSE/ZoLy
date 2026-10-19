/**
 * Safe, browser-compliant Web Audio API synthesizer for Zoey & Lily.
 * Audio remains muted until visitor explicitly enables sound.
 */

class FairytaleAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private currentLullaby: 'zoey' | 'lily' | null = null;
  private lullabyIntervalId: number | null = null;
  private onTrackTick?: (currentTime: number, totalTime: number) => void;
  private trackSeconds: number = 0;
  private readonly trackDuration: number = 32;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private listeners: (() => void)[] = [];

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (!muted) {
      this.initContext();
    } else {
      this.stopLullaby();
    }
    this.notify();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playChime(freq: number = 520, type: 'crystal' | 'warm' = 'crystal') {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type === 'crystal' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.85);
  }

  public playSparkle() {
    if (this.isMuted) return;
    const notes = [587.33, 659.25, 783.99, 880.0, 1046.5];
    notes.forEach((f, idx) => {
      setTimeout(() => this.playChime(f, 'crystal'), idx * 60);
    });
  }

  public startLullaby(
    char: 'zoey' | 'lily',
    onTick?: (currentTime: number, totalTime: number) => void
  ) {
    this.initContext();
    this.stopLullaby();
    this.isMuted = false;
    this.currentLullaby = char;
    this.onTrackTick = onTick;
    this.trackSeconds = 0;

    // Zoey's "Snowflake Dreams": Pentatonic music-box chimes (D, F#, A, B, C#)
    const zoeyMelody = [
      { f: 587.33, d: 0.5 }, { f: 739.99, d: 0.5 }, { f: 880.0, d: 0.8 },
      { f: 659.25, d: 0.5 }, { f: 880.0, d: 0.5 }, { f: 987.77, d: 0.9 },
      { f: 587.33, d: 0.6 }, { f: 880.0, d: 0.6 }, { f: 1174.66, d: 1.2 },
      { f: 739.99, d: 0.5 }, { f: 659.25, d: 0.5 }, { f: 587.33, d: 1.5 },
    ];

    // Lily's "Moonbeam Wishes": Ethereal harp & warm chime (C, E, G, A, B)
    const lilyMelody = [
      { f: 523.25, d: 0.6 }, { f: 659.25, d: 0.6 }, { f: 783.99, d: 0.8 },
      { f: 880.0, d: 0.5 }, { f: 783.99, d: 0.5 }, { f: 659.25, d: 0.9 },
      { f: 493.88, d: 0.6 }, { f: 659.25, d: 0.6 }, { f: 987.77, d: 1.2 },
      { f: 880.0, d: 0.5 }, { f: 659.25, d: 0.5 }, { f: 523.25, d: 1.5 },
    ];

    const notes = char === 'zoey' ? zoeyMelody : lilyMelody;
    let stepIndex = 0;

    const playStep = () => {
      if (!this.ctx || this.isMuted || this.currentLullaby !== char) return;
      const note = notes[stepIndex % notes.length];
      this.playChime(note.f, char === 'zoey' ? 'crystal' : 'warm');

      stepIndex++;
      this.trackSeconds = (this.trackSeconds + 1) % this.trackDuration;
      this.onTrackTick?.(this.trackSeconds, this.trackDuration);
    };

    playStep();
    this.lullabyIntervalId = window.setInterval(playStep, 1000);
    this.notify();
  }

  public stopLullaby() {
    if (this.lullabyIntervalId !== null) {
      clearInterval(this.lullabyIntervalId);
      this.lullabyIntervalId = null;
    }
    this.currentLullaby = null;
    this.trackSeconds = 0;
    this.notify();
  }

  public getPlayingTrack(): 'zoey' | 'lily' | null {
    return this.currentLullaby;
  }
}

export const fairytaleAudio = new FairytaleAudioEngine();
