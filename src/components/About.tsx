import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Folder, FileCode, Cpu, CheckCircle2, Lock } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export default function About() {
  const { playSound } = useSound();
  const [selectedFile, setSelectedFile] = useState<'profile' | 'capabilities' | 'stats'>('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStage, setLoginStage] = useState<'lock' | 'typing' | 'authenticating' | 'success'>('lock');
  const [passwordDots, setPasswordDots] = useState('');

  // Run automated login sequence on mount
  useEffect(() => {
    // 1. Initial lock screen delay
    const t1 = setTimeout(() => {
      setLoginStage('typing');
      playSound('click');
    }, 1000);

    // 2. Simulate typing password dots
    let dots = '';
    const interval = setInterval(() => {
      if (dots.length < 8) {
        dots += '•';
        setPasswordDots(dots);
        playSound('hover');
      } else {
        clearInterval(interval);
      }
    }, 150);

    // 3. Trigger authentication
    const t2 = setTimeout(() => {
      setLoginStage('authenticating');
      playSound('unlock');
    }, 2500);

    // 4. Grant access
    const t3 = setTimeout(() => {
      setLoginStage('success');
      playSound('success');
    }, 4200);

    // 5. Load terminal shell
    const t4 = setTimeout(() => {
      setIsLoggedIn(true);
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
    };
  }, []);

  const files = [
    { id: 'profile', name: 'profile_bio.config', icon: <FileCode className="w-4 h-4 text-neon-cyan" /> },
    { id: 'capabilities', name: 'capabilities.db', icon: <FileCode className="w-4 h-4 text-neon-violet" /> },
    { id: 'stats', name: 'telemetry_metrics.log', icon: <FileCode className="w-4 h-4 text-neon-magenta" /> },
  ];

  return (
    <section
      id="about-card"
      className="w-full h-full bg-[#06080c] text-slate-100 flex flex-col font-share select-text border-2 border-slate-900 shadow-2xl rounded-md overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          /* ========================================================= */
          /* 1. CORPORATE LOGIN LOCKSCREEN SCREEN (Automated Animation) */
          /* ========================================================= */
          <motion.div
            key="lockscreen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-grow flex flex-col items-center justify-center p-8 bg-[#0a0e14] relative"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="w-full max-w-sm z-10 space-y-6 text-center">
              {/* User Avatar Circle */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 flex items-center justify-center border-2 border-slate-800 bg-slate-950/80 rounded-full shadow-lg">
                  <Lock className={`w-8 h-8 ${loginStage === 'success' ? 'text-neon-cyan animate-pulse' : 'text-slate-500'}`} />
                  {loginStage === 'authenticating' && (
                    <span className="absolute inset-0 border-2 border-t-neon-cyan border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                  )}
                </div>
                <h3 className="font-orbitron font-extrabold text-lg text-slate-100 mt-3 tracking-wide">
                  Stephen Raj S
                </h3>
                <span className="font-share text-[10px] text-neon-cyan tracking-widest uppercase">
                  QA Automation Tester
                </span>
              </div>

              {/* Login Fields */}
              <div className="bg-[#05070a]/90 border border-slate-850 p-5 rounded-2xl space-y-3.5 shadow-2xl relative">
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-700" />
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-700" />
                
                {/* Username */}
                <div className="text-left space-y-1">
                  <label className="block text-[8px] text-slate-550 font-orbitron uppercase tracking-widest">
                    domain_user
                  </label>
                  <div className="px-3 py-2 bg-slate-950 border border-slate-900 text-xs text-slate-300 rounded font-share">
                    stephen.raj
                  </div>
                </div>

                {/* Password */}
                <div className="text-left space-y-1">
                  <label className="block text-[8px] text-slate-550 font-orbitron uppercase tracking-widest">
                    security_passkey
                  </label>
                  <div className="px-3 py-2 bg-slate-950 border border-slate-900 text-xs text-neon-cyan rounded font-share flex items-center justify-between min-h-[34px]">
                    <span>{passwordDots || (loginStage === 'lock' ? '' : '|')}</span>
                    {loginStage === 'typing' && <span className="w-1.5 h-3 bg-neon-cyan animate-pulse" />}
                  </div>
                </div>

                {/* Login Button State */}
                <div className="pt-2">
                  <div className={`w-full py-2 rounded text-center text-xs font-orbitron font-bold transition-all duration-300 ${
                    loginStage === 'success'
                      ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan'
                      : loginStage === 'authenticating'
                      ? 'bg-slate-950 border border-slate-900 text-slate-500'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}>
                    {loginStage === 'success' ? 'ACCESS_GRANTED' : loginStage === 'authenticating' ? 'AUTHENTICATING...' : 'SECURE_CONNECT'}
                  </div>
                </div>
              </div>

              {/* Login Live Logs */}
              <div className="min-h-[50px] font-share text-[10px] text-left p-3.5 bg-slate-950/80 border border-slate-900 rounded-lg text-slate-400 space-y-0.5">
                {loginStage === 'lock' && <div>[SYS] Waiting for workstation login trigger...</div>}
                {loginStage === 'typing' && <div className="text-neon-violet">[SYS] Typing passcode assertions...</div>}
                {loginStage === 'authenticating' && (
                  <>
                    <div className="text-neon-violet">[SYS] Sending auth ticket to secure domain...</div>
                    <div className="text-slate-400">[SYS] PolicyCenter & ClaimCenter credentials verified.</div>
                  </>
                )}
                {loginStage === 'success' && (
                  <>
                    <div className="text-neon-cyan">[PASS] Identity Handshake Successful!</div>
                    <div className="text-neon-cyan">[PASS] Workstation decrypt done. Loading profile...</div>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        ) : (
          /* ========================================================= */
          /* 2. DEVELOPER WORKSPACE TERMINAL (Interactive Dashboard)  */
          /* ========================================================= */
          <motion.div
            key="workspace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-grow flex flex-col overflow-hidden"
          >
            {/* Top Bar */}
            <div className="bg-[#0b0e14] border-b border-slate-900 px-4 py-2 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-magenta/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-violet/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan/80" />
                </div>
                <span className="text-[10px] text-slate-500 font-orbitron font-bold tracking-widest ml-2 uppercase">
                  QA_WORKSTATION_v3.9 // stephen_raj.sh
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500">
                <span>PORT: 8080</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>

            <div className="flex flex-grow overflow-hidden h-[410px]">
              {/* File Explorer Sidebar */}
              <div className="w-52 bg-[#080b0f] border-r border-slate-900 p-3 select-none flex flex-col gap-4 text-left">
                <div>
                  <span className="text-[9px] text-slate-500 font-orbitron uppercase tracking-wider block mb-2">
                    WORKSPACE_EXPLORER
                  </span>
                  
                  {/* Folder Header */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold mb-2">
                    <Folder className="w-4 h-4 text-neon-violet" />
                    <span>Stephen_Raj/</span>
                  </div>
                  
                  {/* File List */}
                  <div className="flex flex-col gap-1 pl-4">
                    {files.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => {
                          setSelectedFile(file.id as any);
                          playSound('click');
                        }}
                        onMouseEnter={() => playSound('hover')}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded text-left text-xs transition-colors cursor-none ${
                          selectedFile === file.id
                            ? 'bg-slate-950 border border-slate-800 text-neon-cyan'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {file.icon}
                        <span className="truncate">{file.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-900 pt-3">
                  <span className="text-[8px] text-slate-600 block leading-tight font-share">
                    ENGINE_SYS: STABLE
                  </span>
                  <span className="text-[8px] text-slate-600 block leading-tight font-share">
                    GUIDEWIRE_LOADED: TRUE
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-grow bg-[#05070a] p-4 flex flex-col overflow-y-auto scrollbar-thin text-left">
                <div className="border-b border-slate-900/60 pb-3 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-neon-cyan" />
                    <span className="text-[11px] text-slate-300 font-bold">
                      C:\Stephen_Raj\dossier\{files.find(f => f.id === selectedFile)?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] text-slate-500 font-share">
                    <span>LINES: 42</span>
                    <span>CHARSET: UTF-8</span>
                  </div>
                </div>

                {selectedFile === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-3.5 bg-slate-950/60 border border-slate-900 rounded-lg">
                      <span className="font-share text-[10px] text-neon-cyan block mb-1">
                        // PROFILE_NARRATIVE_LOG
                      </span>
                      <h3 className="font-orbitron font-extrabold text-xl text-white mb-2 uppercase tracking-wide">
                        Stephen Raj S
                      </h3>
                      <p className="text-slate-300 text-xs leading-relaxed font-inter">
                        Dedicated QA Automation Engineer with **3.9 years** of active tenure specializing in the functional verification of Guidewire ecosystems (PolicyCenter, ClaimCenter, and InsuranceNow). Proficient in structuring regression test scenarios, evaluating compliance rules, and automating E2E transaction pipelines.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-lg">
                        <div className="flex items-center gap-2 text-xs text-slate-200 font-bold mb-2">
                          <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                          <span>Guidewire Core Domain</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed font-inter">
                          Configuration verification, transaction testing, mandatory validation gates, and rating logic rules analysis across multiple lines of business (Commercial Auto, Inland Marine, Workers Compensation).
                        </p>
                      </div>

                      <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-lg">
                        <div className="flex items-center gap-2 text-xs text-slate-200 font-bold mb-2">
                          <Cpu className="w-4 h-4 text-neon-violet" />
                          <span>Automated Regression</span>
                        </div>
                        <p className="text-slate-400 text-[11px] leading-relaxed font-inter">
                          Engineering stable modular test scripts using Playwright (TypeScript) and Selenium (Java), resulting in substantial manual time reductions during regression sprint cycles.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedFile === 'capabilities' && (
                  <motion.div
                    key="capabilities"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3.5"
                  >
                    <span className="font-share text-[10px] text-neon-violet block mb-1">
                      // SYSTEM_CAPABILITIES_MANIFEST
                    </span>
                    
                    <div className="space-y-2 font-share text-xs">
                      <div className="flex items-center justify-between p-2 bg-slate-950/80 border border-slate-900 rounded">
                        <span className="text-slate-300">Automation Frameworks:</span>
                        <span className="text-neon-cyan font-bold">Playwright (TS), Selenium (Java)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/80 border border-slate-900 rounded">
                        <span className="text-slate-300">Guidewire Products:</span>
                        <span className="text-neon-cyan font-bold">PolicyCenter, ClaimCenter, InsuranceNow</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/80 border border-slate-900 rounded">
                        <span className="text-slate-300">Process Methodologies:</span>
                        <span className="text-neon-cyan font-bold">Agile/Scrum, Agile Ceremonies, Sprint Logs</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/80 border border-slate-900 rounded">
                        <span className="text-slate-300">Tool Suite Integration:</span>
                        <span className="text-neon-cyan font-bold">JIRA, Rally, Postman API, VBA Macros</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/80 border border-slate-900 rounded">
                        <span className="text-slate-300">Database & Scripts:</span>
                        <span className="text-neon-cyan font-bold">SQL Queries, Excel VBA Data Processing</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedFile === 'stats' && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-lg">
                      <span className="font-share text-[10px] text-neon-magenta block mb-1">
                        // TELEMETRY_METRICS_DUMP
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                        <div className="border-l border-slate-800 pl-2">
                          <span className="block text-[8px] text-slate-500 font-orbitron uppercase">TENURE</span>
                          <span className="text-lg font-bold text-white">3.9 Yrs</span>
                          <span className="block text-[8px] text-slate-400">QA Active</span>
                        </div>
                        <div className="border-l border-slate-800 pl-2">
                          <span className="block text-[8px] text-slate-500 font-orbitron uppercase">COMPLETED</span>
                          <span className="text-lg font-bold text-neon-cyan">100%</span>
                          <span className="block text-[8px] text-slate-400">Spec Verif</span>
                        </div>
                        <div className="border-l border-slate-800 pl-2">
                          <span className="block text-[8px] text-slate-500 font-orbitron uppercase">REG_SPEED</span>
                          <span className="text-lg font-bold text-neon-violet">+30%</span>
                          <span className="block text-[8px] text-slate-400">Automated</span>
                        </div>
                        <div className="border-l border-slate-800 pl-2">
                          <span className="block text-[8px] text-slate-500 font-orbitron uppercase">SUITE_INTEG</span>
                          <span className="text-lg font-bold text-neon-cyan">PASSED</span>
                          <span className="block text-[8px] text-slate-400">Rally / JIRA</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950 font-share text-[10px] text-neon-cyan/80 border border-slate-900 rounded-lg space-y-1">
                      <div>[INFO] Scanning system metrics...</div>
                      <div className="text-neon-violet">[WARN] Dynamic dropdown bounds verified.</div>
                      <div>[PASS] InsuranceNow billing transactions map correctly.</div>
                      <div>[PASS] E2E Policy transaction loop assertion successful.</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
