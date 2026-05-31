import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export default function Education() {
  const { playSound } = useSound();

  const achievements = [
    {
      title: 'Guidewire Policy Verification',
      issuer: 'Internal QA / Client Workflows',
      desc: 'Form testing, validations, triggering rules, rating, billing configuration verification.',
    },
    {
      title: 'AI Prompt Engineering',
      issuer: 'Self-Directed / Testing Optimization',
      desc: 'Prompting methodologies applied to automate repetitive QA documentation writing and bug reporting.',
    },
    {
      title: 'VBA Scripting & Report Macros',
      issuer: 'Tenure Projects',
      desc: 'Formulating complex spreadsheet scripts to aggregate bug databases and sprint testing statistics.',
    },
  ];

  return (
    <section
      id="education-card"
      className="w-full relative p-6 bg-[#070b0e]/30 backdrop-blur-xs border-2 border-emerald-500/25 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.03)]"
    >
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
        
        {/* LEFT COLUMN: EDUCATION CARD */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-share text-xs tracking-widest text-neon-cyan uppercase">
              // CREDENTIAL_REGISTRY: ED
            </span>
            <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white uppercase">
              Education
            </h2>
            <div className="h-[1px] w-20 bg-neon-cyan mt-1" />
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            Detailed credentials verifying academic foundations and specialized technology certifications.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => playSound('hover')}
            className="p-6 glass-panel rounded-2xl border border-slate-800 relative select-none cursor-none mt-4"
          >
            {/* Tech bracket corners */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-cyan" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-cyan" />

            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
                <GraduationCap className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-slate-100 text-lg leading-snug">
                  Computer Applications
                </h3>
                <span className="font-share text-xs text-neon-cyan block uppercase tracking-wider mt-0.5">
                  Graduation Year: 2024
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <p className="font-inter">
                **Adaikala Madha Arts & Science College**, Thanjavur.
              </p>
              <p className="text-xs text-slate-400 font-share uppercase tracking-wide">
                (Affiliated with Bharathidasan University)
              </p>
              <div className="flex items-center gap-2 mt-2 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md max-w-max">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-violet" />
                <span className="text-[10px] font-share text-slate-400">STUDY_MODE: PART_TIME</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* RIGHT COLUMN: ADDITIONAL CERTIFICATIONS */}
        <div className="lg:col-span-7 w-full">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative w-full h-full">
            {/* Tech corners */}
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-slate-700" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-slate-700" />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-slate-700" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-slate-700" />

            <h3 className="font-orbitron font-bold text-slate-200 text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-neon-cyan" />
              // SPECIALIZED_TRAINING_MODULES
            </h3>

            <div className="space-y-6 text-left">
              {achievements.map((ach, idx) => (
                <motion.div
                  key={ach.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg mt-0.5">
                    <Award className="w-4 h-4 text-neon-violet" />
                  </div>
                  <div>
                    <h4 className="font-orbitron text-sm font-bold text-slate-200">
                      {ach.title}
                    </h4>
                    <span className="font-share text-[10px] text-slate-500 block uppercase tracking-wider mt-0.5">
                      ISSUED_BY: {ach.issuer}
                    </span>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      {ach.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
