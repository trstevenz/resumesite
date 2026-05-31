import { useState } from 'react';
import { Mail, MapPin, Send, Terminal, Check } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export default function Contact() {
  const { playSound } = useSound();
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Assertion Console v1.0.4 loaded.',
    'Execute assertions or use query overrides.',
    'Type help() or select options below.'
  ]);
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const appendLog = (msg: string) => {
    setTerminalLogs((prev) => [...prev, msg]);
  };

  const handleCommandClick = (cmd: 'email' | 'location' | 'status') => {
    playSound('click');
    if (cmd === 'email') {
      appendLog('> assert.equal(Stephen.email)');
      setTimeout(() => {
        appendLog('✔ Assertion Passed: Stephen.email === "sstephenraj@newdreamdatasystems.com"');
        playSound('success');
      }, 200);
    } else if (cmd === 'location') {
      appendLog('> assert.ok(Stephen.location)');
      setTimeout(() => {
        appendLog('✔ Assertion Passed: Location verified: Thanjavur / Chennai, TN, India');
        playSound('success');
      }, 200);
    } else if (cmd === 'status') {
      appendLog('> assert.isTrue(Stephen.isQAActive)');
      setTimeout(() => {
        appendLog('✔ Assertion Passed: isQAActive === true (3.9 Yrs Experience)');
        playSound('success');
      }, 200);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    playSound('click');
    const val = inputValue.trim();
    appendLog(`> ${val}`);

    const lowerVal = val.toLowerCase();

    setTimeout(() => {
      if (lowerVal.includes('help')) {
        appendLog('Supported assertions: assert.equal(email), assert.ok(location), assert.isTrue(status), clear(), ping()');
      } else if (lowerVal.includes('email')) {
        appendLog('✔ Assertion Passed: Stephen.email === "sstephenraj@newdreamdatasystems.com"');
        playSound('success');
      } else if (lowerVal.includes('location')) {
        appendLog('✔ Assertion Passed: Location verified: Thanjavur / Chennai, TN, India');
        playSound('success');
      } else if (lowerVal.includes('status') || lowerVal.includes('qa')) {
        appendLog('✔ Assertion Passed: isQAActive === true (3.9 Yrs Experience)');
        playSound('success');
      } else if (lowerVal.includes('clear')) {
        setTerminalLogs(['Console cleared.', 'Ready.']);
      } else if (lowerVal.includes('ping')) {
        appendLog('✔ PING STABLE: link response in 12ms.');
        playSound('success');
      } else {
        appendLog(`❌ AssertionError: Expression '${val}' could not be asserted. Type help()`);
        playSound('glitch');
      }
    }, 200);

    setInputValue('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="contact-card"
      className="w-full relative p-6 bg-[#070b0e]/30 backdrop-blur-xs border-2 border-emerald-500/25 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.03)]"
    >
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
        
        {/* LEFT COLUMN: INTERACTIVE TERMINAL HUBS */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-share text-xs tracking-widest text-neon-cyan uppercase">
              // UNIT_ASSERTIONS: DIRECT
            </span>
            <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
              Assert Console
            </h2>
            <div className="h-[1px] w-20 bg-neon-cyan mt-1" />
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            Interact with the assertion suite. Click direct test triggers or type assertion queries inside the console runner.
          </p>

          {/* Quick HUD clicks */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCommandClick('email')}
              onMouseEnter={() => playSound('hover')}
              className="px-4 py-2 border border-slate-800 bg-slate-950/60 hover:border-neon-cyan text-xs font-share text-slate-300 hover:text-neon-cyan rounded-md cursor-none transition-all duration-300"
            >
              ASSERT(EMAIL)
            </button>
            <button
              onClick={() => handleCommandClick('location')}
              onMouseEnter={() => playSound('hover')}
              className="px-4 py-2 border border-slate-800 bg-slate-950/60 hover:border-neon-cyan text-xs font-share text-slate-300 hover:text-neon-cyan rounded-md cursor-none transition-all duration-300"
            >
              ASSERT(LOCATION)
            </button>
            <button
              onClick={() => handleCommandClick('status')}
              onMouseEnter={() => playSound('hover')}
              className="px-4 py-2 border border-slate-800 bg-slate-950/60 hover:border-neon-cyan text-xs font-share text-slate-300 hover:text-neon-cyan rounded-md cursor-none transition-all duration-300"
            >
              ASSERT(STATUS)
            </button>
          </div>

          {/* Terminal console */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between flex-grow min-h-[300px] relative select-none">
            {/* Corner Tech ticks */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan" />

            <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5 mb-3 text-slate-500 font-share text-[10px] uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-neon-cyan" />
              <span>ASSERTION_RUNNER_LOGS</span>
            </div>

            {/* Scrollable logs */}
            <div className="flex-grow overflow-y-auto space-y-1.5 font-share text-xs text-neon-cyan/90 min-h-[160px] max-h-[220px] scrollbar-thin">
              {terminalLogs.map((log, i) => (
                <div key={i} className={log.startsWith('❌') ? 'text-neon-magenta' : log.startsWith('✔') ? 'text-neon-cyan' : 'text-slate-300'}>
                  {log}
                </div>
              ))}
            </div>

            {/* Form CLI input */}
            <form onSubmit={handleTerminalSubmit} className="mt-4 flex gap-2 border-t border-slate-800 pt-3">
              <span className="text-neon-cyan font-share text-xs mt-1.5 shrink-0">&gt;_</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type assert query (e.g. 'email', 'location')..."
                className="w-full bg-slate-950/80 border border-slate-900 focus:border-slate-700 text-xs font-share text-slate-200 px-3 py-2 rounded focus:outline-none placeholder-slate-700 cursor-none"
              />
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: MESSAGE TERMINAL HUD */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative w-full h-full flex flex-col justify-between">
            {/* Tech Corners */}
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-slate-700" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-slate-700" />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-slate-700" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-slate-700" />

            <div>
              <h3 className="font-orbitron font-bold text-slate-200 text-sm tracking-widest uppercase mb-4">
                // TRANSMIT_COMMS: PAYLOAD_POST
              </h3>

              <div className="space-y-4 mb-6 text-xs text-slate-400 font-share">
                <div className="flex items-center gap-3.5 py-2.5 border-b border-slate-900">
                  <Mail className="w-4 h-4 text-neon-cyan" />
                  <div>
                    <span className="block text-[8px] text-slate-500 uppercase tracking-widest">EMAIL_NODE</span>
                    <a
                      href="mailto:sstephenraj@newdreamdatasystems.com"
                      className="text-slate-300 hover:text-neon-cyan transition-colors cursor-none"
                    >
                      sstephenraj@newdreamdatasystems.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 py-2.5 border-b border-slate-900">
                  <MapPin className="w-4 h-4 text-neon-cyan" />
                  <div>
                    <span className="block text-[8px] text-slate-500 uppercase tracking-widest">GEOLOCATION</span>
                    <span className="text-slate-300">Thanjavur / Chennai, TN, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-500 font-orbitron uppercase tracking-widest mb-1.5">
                  Sender Identity
                </label>
                <input
                  type="text"
                  required
                  placeholder="IDENT_USER..."
                  className="w-full bg-slate-950/80 border border-slate-900 focus:border-slate-800 text-xs font-share text-slate-200 px-3 py-2.5 rounded focus:outline-none cursor-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 font-orbitron uppercase tracking-widest mb-1.5">
                  Sender Return Link
                </label>
                <input
                  type="email"
                  required
                  placeholder="IDENT_EMAIL..."
                  className="w-full bg-slate-950/80 border border-slate-900 focus:border-slate-800 text-xs font-share text-slate-200 px-3 py-2.5 rounded focus:outline-none cursor-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 font-orbitron uppercase tracking-widest mb-1.5">
                  Payload Content
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="ENTER_PAYLOAD_CONTENT..."
                  className="w-full bg-slate-950/80 border border-slate-900 focus:border-slate-800 text-xs font-share text-slate-200 px-3 py-2.5 rounded focus:outline-none cursor-none resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => playSound('hover')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-neon-cyan text-black rounded-lg font-orbitron font-bold text-xs tracking-wider uppercase border border-neon-cyan hover:bg-transparent hover:text-neon-cyan transition-all duration-300 shadow-[0_0_12px_rgba(0,240,118,0.25)] hover:shadow-none cursor-none"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span className="text-emerald-950 font-bold">TRANSMISSION_COMPLETE</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>BROADCAST_PAYLOAD</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
