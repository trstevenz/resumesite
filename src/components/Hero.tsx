import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

export default function Hero() {
  const { playSound } = useSound();
  const [terminalText, setTerminalText] = useState('');
  const fullTerminalText = `[SYS] Init Playwright Automation Suite...\n[RUN] Scanning PolicyCenter & InsuranceNow forms...\n[PASS] WRG Policy verification matches specifications.\n[PASS] Southern Pioneer workflow checks passed.\n[PASS] AFR Mutual transaction mappings secure.\n[DONE] Assertions: 485/485 Passed. Build: STABLE.`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullTerminalText.length) {
        setTerminalText((prev) => prev + fullTerminalText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    playSound('success');
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
      `STEPHEN RAJ S\nEmail: sstephenraj@newdreamdatasystems.com\nQA Automation Tester (Guidewire, Playwright, Selenium)\n\nExtracted details: 3.9 years manual & automated systems testing.`
    );
    link.download = 'Stephen_Raj_QA_Automation_Resume.txt';
    link.click();
  };

  const handleExplore = () => {
    playSound('click');
    window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { sectionId: 'about' } }));
  };

  return (
    <section
      id="home-card"
      className="w-full relative p-5 sm:p-10 bg-slate-950/45 backdrop-blur-md border-2 border-slate-800/80 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden"
      style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}
    >
      {/* Chrome wall mounts for the glass board */}
      <span className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-500 shadow-inner block opacity-80" />
      <span className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-500 shadow-inner block opacity-80" />
      <span className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-500 shadow-inner block opacity-80" />
      <span className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-500 shadow-inner block opacity-80" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 text-left">
        
        {/* LEFT COLUMN: HERO HEADLINE & META */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-4 md:gap-6">
          
          {/* Cyber HUD pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 border border-neon-cyan/30 bg-neon-cyan/5 rounded-full text-xs font-share text-neon-cyan select-none"
          >
            <Shield className="w-3.5 h-3.5 animate-pulse" />
            <span>TEST_ENVIRONMENT: PROD_VERIFY_ACTIVE</span>
          </motion.div>

          {/* Glitch Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glitch-wrapper select-none"
          >
            <h1 
              data-text="STEPHEN RAJ S"
              className="glitch-text font-orbitron font-black text-3xl sm:text-5xl md:text-7xl xl:text-8xl tracking-tighter text-white leading-none"
            >
              STEPHEN RAJ S
            </h1>
          </motion.div>

          {/* Subtext typing intro */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="font-share text-neon-cyan tracking-widest text-sm sm:text-base md:text-lg border-b border-slate-800 pb-4 w-full"
          >
            QA AUTOMATION ARCHITECT // SPECIALIZING IN GUIDEWIRE SYSTEMS TESTING
          </motion.p>

          {/* Short introduction narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl font-inter leading-relaxed"
          >
            Experienced QA Tester proficient in both manual and automation testing with **3 years 11 Months** of hands-on experience in Guidewire Policy Center, Claim Center, and InsuranceNow ecosystems.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <button
              onClick={handleExplore}
              onMouseEnter={() => playSound('hover')}
              className="flex items-center gap-2 px-6 py-3 bg-neon-cyan text-black rounded-lg font-orbitron font-bold text-xs tracking-wider uppercase border border-neon-cyan hover:bg-transparent hover:text-neon-cyan transition-all duration-300 shadow-[0_0_15px_rgba(0,240,118,0.4)] hover:shadow-none cursor-none"
            >
              <span>EXPLORE PIPELINE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              onMouseEnter={() => playSound('hover')}
              className="px-6 py-3 bg-slate-950/60 border border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white rounded-lg font-orbitron font-bold text-xs tracking-wider uppercase transition-all duration-300 cursor-none"
            >
              <span>EXPORT SPEC DOSSIER</span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: CLI TERMINAL OVERLAY */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-md p-5 glass-panel-cyan rounded-xl relative select-none"
          >
            {/* Tech Corners */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-cyan" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-cyan" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-cyan" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-cyan" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2 text-slate-500">
                <Terminal className="w-4 h-4 text-neon-cyan" />
                <span className="font-share text-xs tracking-widest uppercase">TEST_RUNNER_CONSOLE</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-980" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-980" />
                <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
              </div>
            </div>

            {/* Terminal Output */}
            <div className="min-h-[140px] text-left font-share text-xs text-neon-cyan/90 leading-relaxed whitespace-pre-line select-none">
              {terminalText}
              <span className="inline-block w-1.5 h-3 bg-neon-cyan ml-0.5 animate-pulse" />
            </div>
            
            {/* Terminal Statistics */}
            <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-4 text-left">
              <div>
                <span className="block text-[10px] text-slate-500 font-orbitron uppercase tracking-widest">SUITE_STATUS</span>
                <span className="font-share text-sm text-neon-cyan">ALL_PASSED</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-orbitron uppercase tracking-widest">GATE_VERIFY</span>
                <span className="font-share text-sm text-slate-300">STABLE_100</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
