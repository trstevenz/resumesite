import { useEffect, useState, useRef } from 'react';
import CustomCursor from './components/CustomCursor';
import CanvasContainer from './components/3D/CanvasContainer';
import SoundToggle from './components/SoundToggle';
import { usePerformance } from './hooks/usePerformance';
import { useSound } from './hooks/useSound';
import { Cpu, ShieldCheck } from 'lucide-react';

const SECTION_MAP: Record<string, number> = {
  home: 0.0,
  about: 0.30,
  experience: 0.58,
  skills: 0.79,
  projects: 0.79,
  education: 0.95,
  contact: 0.95,
};

export default function App() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const scrollPosRef = useRef(0);
  const currentScrollPosRef = useRef(0);
  const maxScroll = 2500;

  const { lowPerformance, togglePerformance } = usePerformance();
  const { playSound } = useSound();

  // Smooth out virtual scroll transitions using LERP in requestAnimationFrame loop
  useEffect(() => {
    let rafId: number;
    const updateScroll = () => {
      const diff = scrollPosRef.current - currentScrollPosRef.current;
      if (Math.abs(diff) > 0.05) {
        currentScrollPosRef.current += diff * 0.08;
      } else {
        currentScrollPosRef.current = scrollPosRef.current;
      }
      const pct = currentScrollPosRef.current / maxScroll;
      setScrollPercent(Math.min(Math.max(pct, 0), 1));
      rafId = requestAnimationFrame(updateScroll);
    };
    rafId = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Set up input and custom scroll listeners
  useEffect(() => {
    // Detect whether an element is scrollable and return it
    const getScrollableAncestor = (target: HTMLElement | null): HTMLElement | null => {
      let current = target;
      while (current && current !== document.body) {
        if (
          current.classList.contains('overflow-y-auto') ||
          current.classList.contains('overflow-y-scroll') ||
          current.style.overflowY === 'auto' ||
          current.style.overflowY === 'scroll'
        ) {
          if (current.scrollHeight > current.clientHeight) {
            return current;
          }
        }
        current = current.parentElement;
      }
      return null;
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollable = getScrollableAncestor(e.target as HTMLElement);
      if (scrollable) {
        // Let the card container scroll naturally on desktop
        return;
      }
      e.preventDefault();
      const sensitivity = 0.8;
      scrollPosRef.current = Math.min(
        Math.max(scrollPosRef.current + e.deltaY * sensitivity, 0),
        maxScroll
      );
    };

    // Support keyboard timeline navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.getAttribute('contenteditable') === 'true'
      )) {
        return;
      }

      let step = 0;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        step = 100;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        step = -100;
      } else if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        step = 300;
      } else if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
        step = -300;
      } else if (e.key === 'Home') {
        scrollPosRef.current = 0;
        return;
      } else if (e.key === 'End') {
        scrollPosRef.current = maxScroll;
        return;
      }

      if (step !== 0) {
        e.preventDefault();
        scrollPosRef.current = Math.min(Math.max(scrollPosRef.current + step, 0), maxScroll);
      }
    };

    // Mobile Swipe inputs (with spill-over card scrolling)
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollable = getScrollableAncestor(e.target as HTMLElement);
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      startY = currentY;

      if (scrollable) {
        const prevScrollTop = scrollable.scrollTop;
        scrollable.scrollTop += deltaY;

        // If the card scrolled (meaning it did not hit the top/bottom boundary), consume the event
        if (Math.abs(scrollable.scrollTop - prevScrollTop) > 0.5) {
          if (e.cancelable) {
            e.preventDefault();
          }
          return;
        }
      }

      // If we reach the bounds of card scroll or swipe outside cards, scroll the main timeline
      if (e.cancelable) {
        e.preventDefault();
      }
      const touchSensitivity = 1.6;
      scrollPosRef.current = Math.min(
        Math.max(scrollPosRef.current + deltaY * touchSensitivity, 0),
        maxScroll
      );
    };

    // Support section navigation via custom events
    const handleScrollToSection = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string }>;
      const sectionId = customEvent.detail?.sectionId;
      const targetPct = SECTION_MAP[sectionId];
      if (targetPct !== undefined) {
        scrollPosRef.current = targetPct * maxScroll;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('scrollToSection', handleScrollToSection);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scrollToSection', handleScrollToSection);
    };
  }, []);
  const handlePrevMobile = () => {
    playSound('click');
    const steps = [0.0, 0.30, 0.58, 0.79, 0.95];
    const currentPct = scrollPercent;
    let target = 0.0;
    for (let i = steps.length - 1; i >= 0; i--) {
      if (steps[i] < currentPct - 0.02) {
        target = steps[i];
        break;
      }
    }
    scrollPosRef.current = target * maxScroll;
  };

  const handleNextMobile = () => {
    playSound('click');
    const steps = [0.0, 0.30, 0.58, 0.79, 0.95];
    const currentPct = scrollPercent;
    let target = 0.95;
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] > currentPct + 0.02) {
        target = steps[i];
        break;
      }
    }
    scrollPosRef.current = target * maxScroll;
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg text-slate-100 overflow-y-hidden select-none">
      {/* 3D Canvas Background Scene */}
      <CanvasContainer scrollPercent={scrollPercent} />

      {/* Dark overlay to increase text contrast over background 3D */}
      <div className="fixed inset-0 bg-slate-950/60 md:bg-slate-950/40 pointer-events-none z-1" />

      {/* Custom trail cursor */}
      <CustomCursor />

      {/* High-Tech System Controls HUD (Top Right) */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3 pointer-events-auto">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-[9px] font-share tracking-wider text-neon-cyan shadow-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
          <span>SYS_PIPELINE: PASS_100%</span>
        </div>

        <button
          onClick={() => {
            togglePerformance();
            playSound('click');
          }}
          onMouseEnter={() => playSound('hover')}
          className={`relative p-2.5 rounded-lg border flex items-center justify-center transition-all duration-300 cursor-none ${
            lowPerformance
              ? 'bg-amber-500/10 border-amber-500 text-amber-500'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200 shadow-lg'
          }`}
          title={lowPerformance ? 'Switch to High Quality Graphics' : 'Switch to High Performance Graphics'}
        >
          <Cpu className="w-5 h-5" />
          {lowPerformance && (
            <>
              <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-amber-500" />
              <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-amber-500" />
              <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-amber-500" />
              <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-amber-500" />
            </>
          )}
        </button>

        <SoundToggle />
      </div>

      {/* Mobile Floating Arrow Buttons (Bottom Center) - foolproof mobile navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 pointer-events-auto md:hidden bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-2.5 shadow-2xl">
        <button
          onClick={handlePrevMobile}
          className="px-4 py-2 border border-slate-800 bg-slate-900 rounded-lg text-[10px] font-orbitron tracking-wider text-slate-400 active:text-neon-cyan active:border-neon-cyan select-none cursor-none"
        >
          ◀ BACK
        </button>
        <div className="h-4 w-[1px] bg-slate-800" />
        <button
          onClick={handleNextMobile}
          className="px-4 py-2 border border-slate-800 bg-slate-900 rounded-lg text-[10px] font-orbitron tracking-wider text-slate-400 active:text-neon-cyan active:border-neon-cyan select-none cursor-none"
        >
          NEXT ▶
        </button>
      </div>

      {/* Scroll Dial status HUD (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-md backdrop-blur-md hidden sm:block shadow-lg">
        <span className="font-share text-[10px] text-neon-cyan tracking-widest uppercase block leading-none">
          TIMELINE_SECTOR: {Math.round(scrollPercent * 100)}%
        </span>
      </div>

      {/* Technical HUD borders around the edges */}
      <div className="fixed top-0 left-0 w-full h-full border-[10px] border-slate-950/40 pointer-events-none z-40" />
    </div>
  );
}
