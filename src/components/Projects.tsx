import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface Project {
  title: string;
  scope: string;
  details: string;
  technologies: string[];
  metrics: { label: string; val: string }[];
  accentColor: string;
}

export default function Projects() {
  const { playSound } = useSound();

  const projectsList: Project[] = [
    {
      title: 'LOB UI Regression Suite',
      scope: 'Verifying field validations, mandatory triggers, and rating logic across multiple Lines of Business.',
      details: 'Tested policy flows in Commercial Auto, Inland Marine, Workers Compensation, and Commercial Package Policies, ensuring form triggers and UI mappings matched requirements.',
      technologies: ['Guidewire PolicyCenter', 'Functional QA', 'Rally', 'VBA Macros'],
      metrics: [
        { label: 'LOBs Tested', val: '5+' },
        { label: 'Defect Accuracy', val: '99.5%' },
      ],
      accentColor: 'group-hover:border-neon-cyan/40',
    },
    {
      title: 'Policy-to-Claim Sync Gates',
      scope: 'Verifying integration flows and message triggers between PolicyCenter and ClaimCenter platforms.',
      details: 'Tested policy package syncs and integration transactions, verifying claim intake synchronization without data truncation or mapping dropouts.',
      technologies: ['PolicyCenter', 'ClaimCenter', 'JSON/XML Mappings', 'Postman'],
      metrics: [
        { label: 'Integration Sync', val: '100%' },
        { label: 'Verification Cases', val: '40+' },
      ],
      accentColor: 'group-hover:border-neon-violet/40',
    },
    {
      title: 'InsuranceNow Playwright Suite',
      scope: 'Engineering automated end-to-end policy lifecycles and transactions using Playwright frameworks.',
      details: 'Automated happy paths and complex policy transaction flows using Playwright and TypeScript, reducing manual regression testing overhead by 40%.',
      technologies: ['Playwright', 'TypeScript', 'InsuranceNow', 'Git'],
      metrics: [
        { label: 'Manual Effort Shift', val: '-40%' },
        { label: 'Run Stability', val: '98%' },
      ],
      accentColor: 'group-hover:border-neon-magenta/40',
    },
  ];

  return (
    <section
      id="projects-card"
      className="w-full relative p-6 bg-slate-950/90 border border-slate-800 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col gap-12 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-share text-xs tracking-widest text-neon-cyan uppercase">
            // LOG: TEST_REPOSITORIES
          </span>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
            TestSuite Repositories
          </h2>
          <div className="h-[1px] w-20 bg-neon-cyan mt-1" />
        </div>

        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Comprehensive test automation frameworks and functional QA projects executed across core insurance packages.
        </p>

        {/* 3D project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsList.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              onMouseEnter={() => playSound('hover')}
              className={`glass-panel p-6 rounded-2xl border border-slate-900 hover:border-slate-700 transition-all duration-500 cursor-none flex flex-col justify-between group relative overflow-hidden ${proj.accentColor}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                {/* Tech icons header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                  <div className="flex gap-2">
                    <span className="p-2 bg-slate-950/60 rounded-lg border border-slate-800 group-hover:border-slate-700">
                      <Layers className="w-4 h-4 text-neon-cyan" />
                    </span>
                  </div>
                  <span className="font-share text-[10px] text-slate-500 tracking-wider">
                    TEST_SUITE_0{i + 1}
                  </span>
                </div>

                <h3 className="font-orbitron font-bold text-slate-100 group-hover:text-neon-cyan transition-colors text-lg">
                  {proj.title}
                </h3>
                <span className="font-share text-[10px] text-neon-violet tracking-widest uppercase block mt-1">
                  Target: {proj.technologies[0]}
                </span>
                
                <p className="text-slate-300 text-xs leading-relaxed mt-4">
                  {proj.scope}
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed mt-2 italic">
                  {proj.details}
                </p>
              </div>

              {/* Technologies & Metrics footer */}
              <div className="mt-8 pt-4 border-t border-slate-800/80 space-y-4">
                
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-slate-950 border border-slate-900 rounded text-[9px] font-share text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  {proj.metrics.map((m) => (
                    <div key={m.label} className="border-l border-slate-800 pl-2">
                      <span className="block text-[8px] text-slate-500 font-orbitron uppercase tracking-widest">
                        {m.label}
                      </span>
                      <span className="font-share text-sm text-neon-cyan font-bold">
                        {m.val}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
