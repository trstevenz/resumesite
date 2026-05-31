import { useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import CanvasContainer from './components/3D/CanvasContainer';
import Navbar from './components/Navbar';

// Import details sections
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';

const getActiveSection = (pct: number) => {
  if (pct <= 0.12) return 'home';
  if (pct <= 0.32) return 'about';
  if (pct <= 0.52) return 'experience';
  if (pct <= 0.70) return 'skills';
  if (pct <= 0.82) return 'projects';
  if (pct <= 0.92) return 'education';
  return 'contact';
};

export default function App() {
  const [scrollPercent, setScrollPercent] = useState(0);

  // Track standard vertical scrolling to drive the background 3D camera sweeps
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(Math.min(Math.max(pct, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check once on initial load

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeSection = getActiveSection(scrollPercent);

  return (
    <div className="relative min-h-screen bg-cyber-bg text-slate-100 selection:bg-neon-cyan/30">
      {/* 3D Canvas Background Scene (Fixed, pointer-events-none) */}
      <CanvasContainer scrollPercent={scrollPercent} />

      {/* Dark overlay to increase text contrast over background 3D */}
      <div className="fixed inset-0 bg-slate-950/65 md:bg-slate-950/45 pointer-events-none z-1" />

      {/* Custom trail cursor */}
      <CustomCursor />

      {/* High-Tech Navbar Header */}
      <Navbar scrollPercent={scrollPercent} activeSection={activeSection} />


      {/* Scroll Dial status HUD (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-md backdrop-blur-md hidden sm:block shadow-lg select-none">
        <span className="font-share text-[10px] text-neon-cyan tracking-widest uppercase block leading-none">
          TIMELINE_SECTOR: {Math.round(scrollPercent * 100)}%
        </span>
      </div>

      {/* Technical HUD borders around the edges */}
      <div className="fixed top-0 left-0 w-full h-full border-[10px] border-slate-950/40 pointer-events-none z-40" />

      {/* Static Vertically Scrollable Web Content stacked on top of WebGL */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-28 flex flex-col gap-32 pointer-events-auto">
        <section id="home" className="min-h-[85vh] flex items-center justify-center">
          <div className="w-full">
            <Hero />
          </div>
        </section>
        
        <section id="about" className="scroll-mt-28">
          <About />
        </section>

        <section id="experience" className="scroll-mt-28">
          <Experience />
        </section>

        <section id="skills" className="scroll-mt-28">
          <Skills />
        </section>

        <section id="projects" className="scroll-mt-28">
          <Projects />
        </section>

        <section id="education" className="scroll-mt-28">
          <Education />
        </section>

        <section id="contact" className="scroll-mt-28">
          <Contact />
        </section>
      </main>
    </div>
  );
}
