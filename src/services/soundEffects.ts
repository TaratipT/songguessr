// Web Audio API based sound synthesizer (no external audio assets required)

class SoundFX {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playCorrect() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Happy ascending chime: C5, E5, G5, C6 (soft & pleasant)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playWrong() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Soft buzzer: two short low gentle tones
      [180, 160].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.12);

        gain.gain.setValueAtTime(0.06, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.2);
      });
    } catch {}
  }

  playHint() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Sparkle ping
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  playClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  playCardFlip() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Soft crisp swish/card flip (gentle & tactile)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.06);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  private createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  playLockIn() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Sleek tactical lock-in: Crisp tactile transient + warm dual chime (smooth, non-piercing)
      // 1. Crisp tactile click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(260, now);
      clickOsc.frequency.exponentialRampToValueAtTime(75, now + 0.04);
      clickGain.gain.setValueAtTime(0.04, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);
      clickOsc.start(now);
      clickOsc.stop(now + 0.06);

      // 2. Resonant warm confirm chime (C5 & G5)
      const chimes = [523.25, 783.99];
      chimes.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + 0.03);

        gain.gain.setValueAtTime(0, now + 0.03);
        gain.gain.linearRampToValueAtTime(0.035, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.03);
        osc.stop(now + 0.38);
      });
    } catch {}
  }

  playSlash() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Modern cinematic ban slash: Smooth air whoosh + gentle katana sheen (no ear-piercing shrieks)
      // 1. Soft air whoosh (swept bandpass white noise, warm & gentle)
      const noiseBuffer = this.createNoiseBuffer(ctx, 0.12);
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.Q.setValueAtTime(1.0, now);
      noiseFilter.frequency.setValueAtTime(1400, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(450, now + 0.11);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.035, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSrc.start(now);
      noiseSrc.stop(now + 0.13);

      // 2. Subtle blade sheen (smooth sine glide, comfortable to the ears)
      const bladeOsc = ctx.createOscillator();
      const bladeGain = ctx.createGain();
      bladeOsc.type = 'sine';
      bladeOsc.frequency.setValueAtTime(980, now);
      bladeOsc.frequency.exponentialRampToValueAtTime(620, now + 0.09);

      bladeGain.gain.setValueAtTime(0.025, now);
      bladeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      bladeOsc.connect(bladeGain);
      bladeGain.connect(ctx.destination);
      bladeOsc.start(now);
      bladeOsc.stop(now + 0.12);

      // 3. Low-end weight punch (subtle tactical thud)
      const punchOsc = ctx.createOscillator();
      const punchGain = ctx.createGain();
      punchOsc.type = 'triangle';
      punchOsc.frequency.setValueAtTime(120, now);
      punchOsc.frequency.exponentialRampToValueAtTime(50, now + 0.07);
      punchGain.gain.setValueAtTime(0.035, now);
      punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      punchOsc.connect(punchGain);
      punchGain.connect(ctx.destination);
      punchOsc.start(now);
      punchOsc.stop(now + 0.09);
    } catch {}
  }

  playAutoMatch() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Celestial golden match harmony (crystal pairing: E5, G#5, B5, E6)
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.03, now + idx * 0.04 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.5);
      });
    } catch {}
  }

  playVersus() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Cinematic Esports Fanfare (Warm, Sleek, Powerful & Pleasant):
      // Deep velvet 808 sub pulse + ethereal resonant chord swell + subtle golden shimmer
      // Designed specifically to never distort, buzz, or pierce the ears.

      // 1. Velvet Sub-Bass Pulse (deep, warm, tactile impact)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(90, now);
      subOsc.frequency.exponentialRampToValueAtTime(42, now + 0.28);

      subGain.gain.setValueAtTime(0, now);
      subGain.gain.linearRampToValueAtTime(0.07, now + 0.015);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.4);

      // 2. Ethereal Heroic Swell (Smooth Major 9th chord: D3, A3, D4, F#4, C#5)
      // Pure sine & warm triangle waves shaped through 1400Hz lowpass filter
      const chordFilter = ctx.createBiquadFilter();
      chordFilter.type = 'lowpass';
      chordFilter.frequency.setValueAtTime(1400, now);

      const chordMasterGain = ctx.createGain();
      chordMasterGain.gain.setValueAtTime(0, now);
      chordMasterGain.gain.linearRampToValueAtTime(0.05, now + 0.04);
      chordMasterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      chordFilter.connect(chordMasterGain);
      chordMasterGain.connect(ctx.destination);

      const chordNotes = [
        { f: 146.83, type: 'sine' as const },     // D3 (warm foundation)
        { f: 220.00, type: 'triangle' as const }, // A3
        { f: 293.66, type: 'sine' as const },     // D4
        { f: 369.99, type: 'triangle' as const }, // F#4
        { f: 554.37, type: 'sine' as const }      // C#5 (majestic 7th/9th color)
      ];

      chordNotes.forEach(({ f, type }) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(f, now);
        osc.connect(chordFilter);
        osc.start(now);
        osc.stop(now + 0.95);
      });

      // 3. Soft Gleaming Crystal Accent (high accents: A5 & D6 - subtle and velvety)
      const crystalNotes = [880.00, 1174.66];
      crystalNotes.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + 0.03 + idx * 0.03);

        gain.gain.setValueAtTime(0, now + 0.03 + idx * 0.03);
        gain.gain.linearRampToValueAtTime(0.015, now + 0.03 + idx * 0.03 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03 + idx * 0.03 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.03 + idx * 0.03);
        osc.stop(now + 0.03 + idx * 0.03 + 0.5);
      });
    } catch {}
  }
}

export const soundFX = new SoundFX();

