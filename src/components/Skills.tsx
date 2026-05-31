import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';

interface Skill {
  name: string;
  level: number; // 0 to 100
  desc: string;
}

interface SkillCategory {
  title: string;
  desc: string;
  skills: Skill[];
}

export default function Skills() {
  const { playSound } = useSound();
  const [activeCategory, setActiveCategory] = useState(0);

  const categories: SkillCategory[] = [
    {
      title: 'Automation & Scripting',
      desc: 'Formulating robust test libraries and regression pipelines using code-first environments.',
      skills: [
        { name: 'Playwright (TypeScript)', level: 85, desc: 'E2E automated flow scripting' },
        { name: 'Selenium (Java)', level: 80, desc: 'Web UI regression automation' },
        { name: 'Java Programming', level: 75, desc: 'Object-oriented test structure building' },
        { name: 'Excel Macros', level: 85, desc: 'VBA automated reports and spreadsheets' },
      ],
    },
    {
      title: 'QA & Test Process',
      desc: 'Planning, executing, and reporting verification runs across complex insurance setups.',
      skills: [
        { name: 'Manual Verification', level: 95, desc: 'Form comparisons and field validation maps' },
        { name: 'Agile & Scrum', level: 90, desc: 'Agile ceremonies, sprints, and standups' },
        { name: 'Rally & JIRA', level: 90, desc: 'Defect logging and test run management' },
        { name: 'Postman (API)', level: 75, desc: 'Functional backend endpoint checks' },
      ],
    },
    {
      title: 'Guidewire Domains',
      desc: 'Functional verification of transactional suites and policy-to-claim packages.',
      skills: [
        { name: 'Guidewire Policy Center', level: 90, desc: 'Policy transactions, packages, integrations' },
        { name: 'Guidewire Claim Center', level: 80, desc: 'Defect intake and claim logging checkups' },
        { name: 'InsuranceNow Suite', level: 85, desc: 'End-to-end P&C billing and forms verification' },
        { name: 'Agent Portal', level: 80, desc: 'Agent workflow and submission validation' },
      ],
    },
    {
      title: 'AI & Diagnostics',
      desc: 'Leveraging generative technologies to optimize analysis speeds and troubleshoot systems.',
      skills: [
        { name: 'AI Prompt Engineering', level: 85, desc: 'Generative tools for writing test templates' },
        { name: 'SQL Querying (Basic)', level: 70, desc: 'DB verification and dataset querying' },
        { name: 'Hardware Diagnostics', level: 75, desc: 'System setups and hardware configuration' },
        { name: 'Analytical Thinking', level: 90, desc: 'Root cause bug diagnostics' },
      ],
    },
  ];

  return (
    <section
      id="skills-card"
      className="w-full relative p-6 bg-slate-950/90 border border-slate-800 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        
        {/* LEFT COLUMN: CATEGORY MENU */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-share text-xs tracking-widest text-neon-cyan uppercase">
              // UNIT_TEST: SKILL_GRID
            </span>
            <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
              Coverage Grid
            </h2>
            <div className="h-[1px] w-20 bg-neon-cyan mt-1" />
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Observe connection nodes in the 3D test cluster, or select module databases below to verify skill coverages.
          </p>

          <div className="flex flex-col gap-3 mt-4">
            {categories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => {
                  setActiveCategory(idx);
                  playSound('unlock');
                }}
                onMouseEnter={() => playSound('hover')}
                className={`p-4 rounded-xl border text-left cursor-none transition-all duration-300 relative group overflow-hidden ${
                  activeCategory === idx
                    ? 'bg-slate-950/80 border-slate-700 shadow-[0_0_15px_rgba(0,240,118,0.05)]'
                    : 'bg-slate-950/20 border-slate-900 hover:border-slate-800'
                }`}
              >
                {activeCategory === idx && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute left-0 top-0 w-1 h-full bg-neon-cyan"
                  />
                )}
                
                <span className="font-share text-[10px] text-slate-500 block uppercase tracking-widest">
                  COVERAGE_MATRIX_0{idx + 1}
                </span>
                <span className={`font-orbitron font-bold text-sm block mt-1 transition-colors ${
                  activeCategory === idx ? 'text-neon-cyan' : 'text-slate-300 group-hover:text-slate-200'
                }`}>
                  {cat.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: SKILLS PROGRESS HUD */}
        <div className="lg:col-span-7 w-full">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative w-full h-full min-h-[400px]">
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-slate-700" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-slate-700" />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-slate-700" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-slate-700" />

            <div className="mb-6">
              <span className="font-share text-[10px] text-neon-cyan uppercase tracking-widest block mb-1">
                // ACTIVE_DATABASE: {categories[activeCategory].title.toUpperCase()}
              </span>
              <p className="text-slate-200 text-xs sm:text-sm italic">
                "{categories[activeCategory].desc}"
              </p>
            </div>

            {/* List of Skills with animated bars */}
            <div className="space-y-6">
              {categories[activeCategory].skills.map((skill, idx) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="font-orbitron text-xs sm:text-sm font-bold text-slate-200 block">
                        {skill.name}
                      </span>
                      <span className="font-share text-[10px] text-slate-400 block">
                        SPEC_VERIFY: {skill.desc}
                      </span>
                    </div>
                    <span className="font-share text-xs text-neon-cyan font-bold">
                      {skill.level}% COVERAGE
                    </span>
                  </div>

                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-violet rounded-full shadow-[0_0_8px_rgba(0,240,118,0.4)]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Micro-telemetry HUD detail */}
            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-slate-500 font-share text-[9px] uppercase tracking-widest">
              <span>SUITE_RUNNER: NORMAL</span>
              <span>ASSERTION_INTEGRITY: 100% SECURE</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
