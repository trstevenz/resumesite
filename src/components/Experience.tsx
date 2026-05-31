import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckSquare, Target } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface JobDetail {
  role: string;
  client: string;
  app: string;
  duration: string;
  points: string[];
  metrics: string;
  colorClass: string;
}

export default function Experience() {
  const { playSound } = useSound();
  const [activeJob, setActiveJob] = useState(0);

  const jobs: JobDetail[] = [
    {
      role: 'Guidewire QA Tester',
      client: 'Western Reserve Group',
      app: 'Guidewire Policy Center',
      duration: 'Nov 2022 - Present (Stub)',
      points: [
        'Assigned sprint tasks based on team strengths, optimizing QA workloads and team velocity.',
        'Developed automated test scripts for happy path scenarios, improving regression testing efficiency by 30%.',
        'Led the review of test cases for Guidewire Policy Center, ensuring full specification coverage.',
        'Prepared reports and presentations on validation runs, highlighting key defect findings.',
      ],
      metrics: '30% Testing efficiency boost',
      colorClass: 'border-neon-cyan text-neon-cyan',
    },
    {
      role: 'Guidewire QA Tester',
      client: 'Southern Pioneer Property & Casualty Insurance Company',
      app: 'Guidewire InsuranceNow',
      duration: 'Mid Tenure',
      points: [
        'Compared client-provided forms with developed forms to ensure all fields, validations, and business rules were accurate.',
        'Validated forms against client requirements, including field mapping, mandatory checks, dropdown values, and workflow behaviors.',
        'Created and executed comprehensive test cases to ensure complete functional and UI test coverage.',
        'Developed and maintained automated test cases to improve regression and smoke testing efficiency.',
        'Automated policy workflows and end-to-end scenarios using Playwright to reduce manual testing effort.',
      ],
      metrics: 'Automated Playwright regression suites',
      colorClass: 'border-neon-violet text-neon-violet',
    },
    {
      role: 'Guidewire QA Tester',
      client: 'AFR Mutual Insurance Company',
      app: 'Guidewire InsuranceNow',
      duration: 'Early Tenure',
      points: [
        'Tested forms based on client-provided requirements, validating field mappings across multiple transactions.',
        'Verified triggering conditions and dynamic field behavior on InsuranceNow Policy, Claim, and Billing transactions.',
        'Executed test cases for form validations and workflows.',
        'Automated policy workflows and end-to-end scenarios using Playwright to reduce manual effort and improve test reliability.',
      ],
      metrics: 'End-to-End dynamic transaction coverage',
      colorClass: 'border-neon-magenta text-neon-magenta',
    },
  ];

  return (
    <section
      id="experience-card"
      className="w-full relative p-8 bg-[#070b0e]/85 backdrop-blur-md border-2 border-emerald-500/35 rounded-3xl shadow-2xl"
      style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.1)' }}
    >
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* LEFT COLUMN: PIPELINE TABS */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-share text-xs tracking-widest text-neon-cyan uppercase">
              // TELEMETRY: PIPELINE_RUNNER
            </span>
            <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
              Sprint History
            </h2>
            <div className="h-[1px] w-20 bg-neon-cyan mt-1" />
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            Select pipeline nodes to extract sprint verification details and spec logs.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            {jobs.map((job, index) => (
              <button
                key={job.client}
                onClick={() => {
                  setActiveJob(index);
                  playSound('unlock');
                }}
                onMouseEnter={() => playSound('hover')}
                className={`p-4 rounded-xl border text-left cursor-none transition-all duration-300 relative group overflow-hidden ${
                  activeJob === index
                    ? 'bg-slate-950/90 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                    : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                }`}
              >
                {activeJob === index && (
                  <motion.div
                    layoutId="activeJobLine"
                    className="absolute left-0 top-0 w-1 h-full bg-neon-cyan"
                  />
                )}
                
                <span className="font-share text-[10px] text-slate-500 block uppercase tracking-widest">
                  PIPELINE_STABILITY: PASSED
                </span>
                <span className={`font-orbitron font-bold text-sm block mt-1 transition-colors ${
                  activeJob === index ? 'text-neon-cyan' : 'text-slate-300 group-hover:text-slate-200'
                }`}>
                  {job.client.substring(0, 30)}...
                </span>
                <span className="font-share text-xs text-slate-400 mt-1 block">
                  {job.app}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: JOB DOSSIER DISPLAY */}
        <div className="lg:col-span-8 w-full min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJob}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 bg-slate-950/75 backdrop-blur-md rounded-2xl border-2 border-emerald-500/20 relative w-full h-full shadow-2xl"
            >
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-slate-700" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-slate-700" />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-slate-700" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-slate-700" />

              {/* Dossier Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white">
                    {jobs[activeJob].role}
                  </h3>
                  <span className="text-neon-cyan font-share text-sm tracking-widest uppercase mt-0.5 block">
                    {jobs[activeJob].client}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md text-xs font-share text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>{jobs[activeJob].duration}</span>
                </div>
              </div>

              {/* App platform badge */}
              <div className="mb-6 flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-900 rounded-lg max-w-max">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <span className="font-share text-xs text-slate-300">
                  VERIFIED_TARGET: {jobs[activeJob].app.toUpperCase()}
                </span>
              </div>

              {/* Responsibilities points */}
              <div className="space-y-4">
                <h4 className="font-orbitron text-xs text-slate-500 uppercase tracking-widest font-bold">
                  // VERIFICATION_SCRIPTS_RUN
                </h4>
                <ul className="space-y-3">
                  {jobs[activeJob].points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                      <CheckSquare className="w-4 h-4 text-neon-cyan mt-1 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics panel */}
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-neon-magenta" />
                  <span className="font-share text-xs text-slate-400 uppercase tracking-widest">
                    GATE_OUTCOME:
                  </span>
                </div>
                <span className="font-orbitron font-bold text-xs text-neon-magenta uppercase bg-neon-magenta/5 border border-neon-magenta/20 px-3 py-1 rounded-md">
                  {jobs[activeJob].metrics}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
