// Web Audio API Sound Synthesizer for instant retro BBSR audio effects

class SoundSynth {
  private ctx: AudioContext | null = null;
  private rainGainNode: GainNode | null = null;
  private isRainPlaying: boolean = false;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Chai Spoon Clink (Metal/Ceramic cup sound)
  playChaiClink() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Audio context fallbacks handled silently
    }
  }

  // Auto Rickshaw Horn ("Patia 20 Taka!")
  playAutoHorn() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Dual tone auto horn
      [420, 530].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
        gain.gain.setValueAtTime(0.15, now + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      });
    } catch {
      // Fallback
    }
  }

  // Dahibara Crunch (Crisp Sev & Piyaji crunch)
  playDahibaraCrunch() {
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {
      // Fallback
    }
  }

  // Hostel Corridor Acoustic Guitar Strum
  playGuitarStrum() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      // G Major chord frequencies: G3, B3, D4, G4, B4
      const freqs = [196.0, 246.94, 293.66, 392.0, 493.88];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);

        gain.gain.setValueAtTime(0, now + idx * 0.035);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.035 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.035 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 1.25);
      });
    } catch {
      // Fallback
    }
  }

  // Cassette Tape Button Click
  playTapeClick() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Fallback
    }
  }

  // Radio Static / Tuning Effect
  playRadioStatic() {
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // Fallback
    }
  }

  // Toggle Ambient Monsoon Rain
  toggleMonsoonRain(): boolean {
    try {
      const ctx = this.getContext();

      if (this.isRainPlaying && this.rainGainNode) {
        this.rainGainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        this.isRainPlaying = false;
        return false;
      } else {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);

        // Pinkish brown noise for rain simulation
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const rainSource = ctx.createBufferSource();
        rainSource.buffer = buffer;
        rainSource.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);

        this.rainGainNode = ctx.createGain();
        this.rainGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        this.rainGainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5);

        rainSource.connect(filter);
        filter.connect(this.rainGainNode);
        this.rainGainNode.connect(ctx.destination);

        rainSource.start();
        this.isRainPlaying = true;
        return true;
      }
    } catch {
      this.isRainPlaying = false;
      return false;
    }
  }

  isRainActive(): boolean {
    return this.isRainPlaying;
  }
}

export const soundSynth = new SoundSynth();
