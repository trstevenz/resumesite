import { useState } from 'react';
import { Menu, X, Cpu, ShieldCheck } from 'lucide-react';
import SoundToggle from './SoundToggle';
import { usePerformance } from '../hooks/usePerformance';
import { useSound } from '../hooks/useSound';

interface NavbarProps {
  scrollPercent: number;
  activeSection: string;
}

export default function Navbar({ scrollPercent, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { lowPerformance, togglePerformance } = usePerformance();
  const { playSound } = useSound();

  const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'contact'];

  const handleNavClick = (id: string) => {
    playSound('click');
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* LOGO HUD */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-none select-none group pointer-events-auto"
        >
          <div className="relative w-9 h-9 flex items-center justify-center border border-neon-cyan/40 bg-slate-950/60 rounded-md transition-transform duration-300 group-hover:scale-105">
            <span className="text-neon-cyan font-orbitron font-black text-lg">SR</span>
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-neon-cyan" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-neon-cyan" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="font-orbitron tracking-widest text-[10px] font-semibold text-slate-400 group-hover:text-neon-cyan transition-colors duration-300 block leading-tight">
              STEPHEN_QA_HUB
            </span>
            <span className="font-share text-[8px] text-neon-cyan tracking-widest block leading-tight">
              PIPELINE_STATUS: ACTIVE
            </span>
          </div>
        </div>

        {/* FLOATING NAVIGATION HUD */}
        <div className="hidden lg:flex items-center gap-1.5 px-4 py-2 border border-slate-800 bg-slate-950/80 backdrop-blur-md rounded-full shadow-lg">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              onMouseEnter={() => playSound('hover')}
              className={`px-4 py-1.5 rounded-full text-xs font-orbitron tracking-wider transition-all duration-300 cursor-none select-none uppercase font-semibold relative overflow-hidden ${
                activeSection === section
                  ? 'text-neon-cyan bg-neon-cyan/10 border-glow-cyan'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* SYSTEM CONTROLS (Sound / Performance) */}
        <div className="flex items-center gap-2">
          {/* Status badge pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-950/85 border border-slate-800 rounded-lg text-[9px] font-share tracking-wider text-neon-cyan">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TESTS_PASSED: 100%</span>
          </div>

          {/* Performance toggle */}
          <button
            onClick={() => {
              togglePerformance();
              playSound('click');
            }}
            onMouseEnter={() => playSound('hover')}
            className={`relative p-2.5 rounded-lg border flex items-center justify-center transition-all duration-300 cursor-none ${
              lowPerformance
                ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
            title={lowPerformance ? 'Switch to High Quality (Postprocessing)' : 'Switch to High Performance (Optimized)'}
            aria-label="Toggle Performance Mode"
          >
            <Cpu className="w-5 h-5" />
          </button>

          {/* Sound Toggle */}
          <SoundToggle />

          {/* Mobile menu triggers */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              playSound('click');
            }}
            className="lg:hidden p-2.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-400 cursor-none"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE HUD OVERLAY */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-4 right-4 p-6 glass-panel border border-slate-800 rounded-2xl pointer-events-auto flex flex-col gap-4 animate-fade-in">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className={`py-3 text-center rounded-xl text-sm font-orbitron tracking-wider cursor-none uppercase border ${
                activeSection === section
                  ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan'
                  : 'bg-slate-950/30 border-transparent text-slate-400'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      )}

      {/* HORIZONTAL PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-slate-900 pointer-events-none z-50">
        <div
          className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta shadow-[0_0_8px_rgba(0,240,118,0.8)] transition-all duration-100"
          style={{ width: `${scrollPercent * 100}%` }}
        />
      </div>

      {/* SCROLL PERCENT DIAL */}
      <div className="fixed bottom-4 left-4 z-40 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-md backdrop-blur-md hidden sm:block">
        <span className="font-share text-xs text-neon-cyan tracking-widest uppercase">
          SYS_PIPELINE_LOAD: {Math.round(scrollPercent * 100)}%
        </span>
      </div>
    </nav>
  );
}
