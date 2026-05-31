import { useEffect, useRef } from 'react';

// Global state for sound enabled/disabled to share across hooks
let soundEnabled = false;
const listeners = new Set<(enabled: boolean) => void>();

export const toggleSoundGlobal = () => {
  soundEnabled = !soundEnabled;
  listeners.forEach((listener) => listener(soundEnabled));
  return soundEnabled;
};

export const getSoundEnabled = () => soundEnabled;

export const subscribeSound = (listener: (enabled: boolean) => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play interface sounds (synthesized oscillators)
  const playSound = (type: 'hover' | 'click' | 'success' | 'glitch' | 'unlock') => {
    if (!soundEnabled) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const time = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'hover') {
      // Small cyber tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, time);
      osc.frequency.exponentialRampToValueAtTime(800, time + 0.04);
      gain.gain.setValueAtTime(0.02, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);
      osc.start(time);
      osc.stop(time + 0.04);
    } else if (type === 'click') {
      // Dynamic button blip
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, time);
      osc.frequency.exponentialRampToValueAtTime(1200, time + 0.08);
      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
      osc.start(time);
      osc.stop(time + 0.08);
    } else if (type === 'glitch') {
      // Tech error / scanline noise
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, time);
      osc.frequency.setValueAtTime(90, time + 0.05);
      osc.frequency.setValueAtTime(240, time + 0.1);
      gain.gain.setValueAtTime(0.04, time);
      gain.gain.setValueAtTime(0.01, time + 0.05);
      gain.gain.setValueAtTime(0.03, time + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);
      osc.start(time);
      osc.stop(time + 0.15);
    } else if (type === 'success') {
      // Upward arpeggio
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, time); // C5
      osc.frequency.setValueAtTime(659.25, time + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, time + 0.16); // G5
      gain.gain.setValueAtTime(0.06, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1046.50, time + 0.24); // C6
      gain2.gain.setValueAtTime(0.0, time);
      gain2.gain.setValueAtTime(0.04, time + 0.24);
      gain2.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);

      osc.start(time);
      osc.stop(time + 0.35);
      osc2.start(time + 0.24);
      osc2.stop(time + 0.45);
    } else if (type === 'unlock') {
      // Sweep cyber lock
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, time);
      osc.frequency.exponentialRampToValueAtTime(2000, time + 0.4);
      gain.gain.setValueAtTime(0.04, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);
      osc.start(time);
      osc.stop(time + 0.45);
    }
  };

  // Start continuous ambient drone
  const startDrone = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx || droneNodeRef.current) return;

    const time = ctx.currentTime;
    
    // Lowpass filter for warm sub bass hum
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, time);
    filterNodeRef.current = filter;

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(soundEnabled ? 0.25 : 0.0, time);
    droneNodeRef.current = mainGain;

    filter.connect(mainGain);
    mainGain.connect(ctx.destination);

    // Create detuned double-oscillator hum
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55.0, time); // A1 note
    gain1.gain.setValueAtTime(0.5, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(55.3, time); // Detuned hum
    gain2.gain.setValueAtTime(0.5, time);

    osc1.connect(gain1);
    gain1.connect(filter);

    osc2.connect(gain2);
    gain2.connect(filter);

    osc1.start(time);
    osc2.start(time);

    // Keep references to oscs so we can stop them if needed, or let them play indefinitely
    (mainGain as any).osc1 = osc1;
    (mainGain as any).osc2 = osc2;
  };

  const stopDrone = () => {
    if (droneNodeRef.current) {
      try {
        (droneNodeRef.current as any).osc1.stop();
        (droneNodeRef.current as any).osc2.stop();
      } catch(e) {}
      droneNodeRef.current.disconnect();
      droneNodeRef.current = null;
    }
  };

  // Sync volume of drone to global sound state
  useEffect(() => {
    const handleSoundToggle = (enabled: boolean) => {
      if (enabled) {
        if (!droneNodeRef.current) {
          startDrone();
        } else if (audioCtxRef.current) {
          droneNodeRef.current.gain.setTargetAtTime(0.25, audioCtxRef.current.currentTime, 0.5);
        }
      } else {
        if (droneNodeRef.current && audioCtxRef.current) {
          droneNodeRef.current.gain.setTargetAtTime(0.0, audioCtxRef.current.currentTime, 0.3);
        }
      }
    };

    const unsubscribe = subscribeSound(handleSoundToggle);

    if (soundEnabled && !droneNodeRef.current) {
      startDrone();
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return { playSound, initAudio, stopDrone };
}
