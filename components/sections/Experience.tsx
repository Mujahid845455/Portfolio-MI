'use client';

import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle, Code } from 'lucide-react';
import { MacbookScroll } from '@/components/ui/macbook-scroll';

const experiences = [
  {
    role: 'Web Development Intern',
    company: 'UptoSkills',
    type: 'Internship',
    location: 'Remote',
    period: 'Dec 2025 - Mar 2026',
    duration: '3 Months',
    responsibilities: [
      'Developed responsive web pages using HTML, CSS, JavaScript, and React.js',
      'Integrated REST APIs and implemented authentication features',
      'Collaborated with development team to debug issues and enhance UI/UX',
      'Assisted in frontend and backend development tasks under mentor guidance',
    ],
    technologies: ['React.js', 'JavaScript', 'HTML/CSS', 'REST APIs', 'Git'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-16 overflow-hidden">
      
      {/* ── Aceternity Macbook Scroll Experience Feature ───── */}
      <div className="w-full overflow-hidden">
        <MacbookScroll
          title={
            <span>
              Work Experience & Internships <br />
              <span className="text-gray-400 text-lg md:text-xl font-normal block mt-2">
                Building scalable web applications & real-world software solutions
              </span>
            </span>
          }
          badge={
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] -rotate-12 hover:scale-110 transition-transform">
              <div className="w-full h-full bg-[#0a0d18] rounded-full flex items-center justify-center text-white font-extrabold text-xs">
                MI
              </div>
            </div>
          }
        >
          {/* Macbook Screen Content */}
          <div className="w-full h-full bg-[#070a14] p-3.5 sm:p-4 flex flex-col justify-between text-left font-sans overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border border-white/10 rounded-lg">
            
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/90 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/90 shadow-[0_0_6px_rgba(234,179,8,0.5)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/90 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                uptoskills.com/internship
              </div>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full font-medium">
                Verified Internship
              </span>
            </div>

            {/* Internship Dashboard Content */}
            <div className="space-y-2.5 flex-1 flex flex-col justify-between">
              
              {/* Header Info */}
              <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded text-[9px] font-mono font-semibold">
                      UptoSkills
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">• Remote</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-tight">
                    Web Development Intern
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] font-mono text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded text-nowrap block">
                    Dec 2025 - Mar 2026
                  </span>
                  <span className="text-[9px] text-gray-400 mt-0.5 block font-mono">
                    3 Months Duration
                  </span>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="space-y-1.5 text-[10px] sm:text-[11px] text-gray-300">
                <div className="text-[9px] font-mono text-blue-400 uppercase tracking-wider font-bold mb-1">
                  Key Deliverables & Tasks
                </div>
                {experiences[0].responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 leading-tight">
                    <span className="text-blue-400 font-bold shrink-0 mt-0.5">▹</span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex flex-wrap gap-1">
                  {experiences[0].technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono px-2 py-0.5 bg-blue-500/10 border border-blue-500/25 text-blue-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </MacbookScroll>
      </div>

      {/* ── Timeline Section Below ────────────────────────── */}
      <div className="container mx-auto px-4 relative z-10 max-w-4xl -mt-20">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative pl-20 pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-gray-900 glow" />

              {/* Content Card */}
              <div className="glass rounded-2xl p-8 glow-hover hover:scale-[1.01] transition-transform border border-white/10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-lg text-blue-400 mb-2 font-medium">
                      <Briefcase size={20} />
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-4 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {exp.period} ({exp.duration})
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {exp.location}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3 text-white flex items-center gap-2">
                    <CheckCircle size={18} className="text-blue-400" /> Key Responsibilities
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start gap-3 text-gray-300 text-sm">
                        <span className="text-blue-400 mt-1">▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-gray-400 flex items-center gap-2">
                    <Code size={16} /> Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 glass glass-hover rounded-lg text-sm text-gray-300 border border-white/10 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
