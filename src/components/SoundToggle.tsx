import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSoundGlobal, getSoundEnabled, subscribeSound, useSound } from '../hooks/useSound';

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);
  const { playSound, initAudio } = useSound();

  useEffect(() => {
    setEnabled(getSoundEnabled());
    const unsubscribe = subscribeSound((newVal) => {
      setEnabled(newVal);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    initAudio();
    const nextVal = toggleSoundGlobal();
    if (nextVal) {
      setTimeout(() => {
        playSound('unlock');
      }, 50);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative p-2.5 rounded-lg border flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-none group ${
        enabled
          ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan border-glow-cyan'
          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
      }`}
      title={enabled ? 'Mute Interface Sound' : 'Enable Cyber Interface Sound'}
      aria-label="Sound Toggle"
    >
      <div className="absolute inset-0 rounded-lg bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {enabled ? (
        <Volume2 className="w-5 h-5 animate-pulse-slow" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
      
      {/* Glitch Tech Corner Brackets */}
      {enabled && (
        <>
          <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-neon-cyan" />
          <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-neon-cyan" />
          <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-neon-cyan" />
          <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-neon-cyan" />
        </>
      )}
    </button>
  );
}
