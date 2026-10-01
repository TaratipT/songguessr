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

      // Soft crisp swish/card flip
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.07);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
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

      // LoL Lock-In: Crisp mechanical anvil latch + resonant dual hextech confirmation
      // 1. Mechanical anvil transient
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = 'triangle';
      kickOsc.frequency.setValueAtTime(240, now);
      kickOsc.frequency.exponentialRampToValueAtTime(70, now + 0.06);
      kickGain.gain.setValueAtTime(0.12, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      kickOsc.connect(kickGain);
      kickGain.connect(ctx.destination);
      kickOsc.start(now);
      kickOsc.stop(now + 0.09);

      // 2. Resonant lock chime: G4/D5 -> Triumphant C5/G5/C6
      const stage1 = [392.00, 587.33];
      stage1.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      });

      const stage2 = [523.25, 783.99, 1046.50];
      stage2.forEach((f) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + 0.07);
        gain.gain.setValueAtTime(0.08, now + 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.07);
        osc.stop(now + 0.07 + 0.5);
      });
    } catch {}
  }

  playSlash() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // LoL Ban Slash: Razor-sharp steel blade slice + filtered whoosh + metallic ping
      // 1. Filtered white noise blade swoosh (4500Hz -> 1000Hz sweep)
      const noiseBuffer = this.createNoiseBuffer(ctx, 0.14);
      const noiseSrc = ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.Q.setValueAtTime(2.5, now);
      noiseFilter.frequency.setValueAtTime(4500, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(1100, now + 0.13);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noiseSrc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSrc.start(now);
      noiseSrc.stop(now + 0.15);

      // 2. High steel blade ring (dual metallic frequencies)
      [1568, 2349].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 0.18);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      });

      // 3. Punchy cut transient
      const cutOsc = ctx.createOscillator();
      const cutGain = ctx.createGain();
      cutOsc.type = 'triangle';
      cutOsc.frequency.setValueAtTime(320, now);
      cutOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
      cutGain.gain.setValueAtTime(0.09, now);
      cutGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      cutOsc.connect(cutGain);
      cutGain.connect(ctx.destination);
      cutOsc.start(now);
      cutOsc.stop(now + 0.1);
    } catch {}
  }

  playAutoMatch() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Shimmering celestial golden chords (triumphant hextech unlock)
      const notes = [523.25, 659.25, 783.99, 987.77, 1174.66, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.55);
      });
    } catch {}
  }

  playVersus() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // League of Legends Match Found / Battle Fanfare:
      // Heroic brass triad swell + cinematic impact punch + shimmering hextech crystals
      
      // 1. Powerful impact punch & sub transient (exciting & solid, NOT scary)
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = 'triangle';
      kickOsc.frequency.setValueAtTime(190, now);
      kickOsc.frequency.exponentialRampToValueAtTime(65, now + 0.18);

      kickGain.gain.setValueAtTime(0.18, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      kickOsc.connect(kickGain);
      kickGain.connect(ctx.destination);
      kickOsc.start(now);
      kickOsc.stop(now + 0.38);

      // 2. Heroic Brass Triad Fanfare (D Major power swell: D3, A3, D4, F#4, A4, D5)
      // Routed through lowpass filter that opens fast (600Hz -> 2800Hz) like orchestral brass horns
      const brassFilter = ctx.createBiquadFilter();
      brassFilter.type = 'lowpass';
      brassFilter.frequency.setValueAtTime(600, now);
      brassFilter.frequency.exponentialRampToValueAtTime(3200, now + 0.09);
      brassFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.9);

      const brassMasterGain = ctx.createGain();
      brassMasterGain.gain.setValueAtTime(0, now);
      brassMasterGain.gain.linearRampToValueAtTime(0.14, now + 0.06);
      brassMasterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      brassFilter.connect(brassMasterGain);
      brassMasterGain.connect(ctx.destination);

      const brassNotes = [
        { f: 146.83, type: 'sawtooth' as const }, // D3
        { f: 220.00, type: 'sawtooth' as const }, // A3
        { f: 293.66, type: 'sawtooth' as const }, // D4
        { f: 369.99, type: 'triangle' as const }, // F#4
        { f: 440.00, type: 'sawtooth' as const }, // A4
        { f: 587.33, type: 'triangle' as const }  // D5
      ];

      brassNotes.forEach(({ f, type }) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(f, now);
        osc.connect(brassFilter);
        osc.start(now);
        osc.stop(now + 1.3);
      });

      // 3. Shimmering Hextech Crystals (high magical accents: A5, D6, F#6)
      const crystalNotes = [880.00, 1174.66, 1479.98];
      crystalNotes.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + 0.04 + idx * 0.03);

        gain.gain.setValueAtTime(0, now + 0.04 + idx * 0.03);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.04 + idx * 0.03 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04 + idx * 0.03 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.04 + idx * 0.03);
        osc.stop(now + 0.04 + idx * 0.03 + 0.65);
      });
    } catch {}
  }
}

export const soundFX = new SoundFX();

