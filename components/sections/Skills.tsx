'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  SiPython, SiJavascript, SiTypescript, SiC, SiCplusplus,
  SiReact, SiNextdotjs, SiBootstrap, SiTailwindcss, SiNodedotjs, SiExpress,
  SiFastapi, SiFlask, SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiNumpy,
  SiPandas, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiGit,
  SiGithub, SiDocker, SiPostman, SiLinux, SiVercel, SiFigma
} from 'react-icons/si';
import { FaAws, FaJava, FaCode, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { Sparkles, Terminal, Database, Layers, Wrench, Cpu } from 'lucide-react';

const skillRows = [
  // Row 1 (11 skills)
  [
    { name: 'Python', icon: SiPython, color: '#3776AB', category: 'Languages' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', category: 'Languages' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', category: 'Languages' },
    { name: 'C', icon: SiC, color: '#A8B9CC', category: 'Languages' },
    { name: 'C++', icon: SiCplusplus, color: '#00599C', category: 'Languages' },
    { name: 'Java', icon: FaJava, color: '#007396', category: 'Languages' },
    { name: 'HTML5', icon: FaHtml5, color: '#E34F26', category: 'Languages' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', category: 'Languages' },
    { name: 'React', icon: SiReact, color: '#61DAFB', category: 'Frontend' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', category: 'Frontend' },
    { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3', category: 'Frontend' },
  ],
  // Row 2 (10 skills)
  [
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933', category: 'Backend' },
    { name: 'Express', icon: SiExpress, color: '#ffffff', category: 'Backend' },
    { name: 'FastAPI', icon: SiFastapi, color: '#009688', category: 'Backend' },
    { name: 'Flask', icon: SiFlask, color: '#ffffff', category: 'Backend' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00', category: 'AI/ML' },
    { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C', category: 'AI/ML' },
    { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E', category: 'AI/ML' },
    { name: 'OpenCV', icon: SiOpencv, color: '#5C3EE8', category: 'AI/ML' },
    { name: 'NumPy', icon: SiNumpy, color: '#4DABF7', category: 'AI/ML' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', category: 'Frontend' },
  ],
  // Row 3 (8 skills)
  [
    { name: 'Pandas', icon: SiPandas, color: '#150458', category: 'AI/ML' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1', category: 'Database' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', category: 'Database' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', category: 'Database' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', category: 'Database' },
    { name: 'Redis', icon: SiRedis, color: '#DC382D', category: 'Database' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED', category: 'Tools' },
    { name: 'AWS', icon: FaAws, color: '#FF9900', category: 'Tools' },
  ],
  // Row 4 (6 skills)
  [
    { name: 'Git', icon: SiGit, color: '#F05032', category: 'Tools' },
    { name: 'GitHub', icon: SiGithub, color: '#ffffff', category: 'Tools' },
    { name: 'Linux', icon: SiLinux, color: '#FCC624', category: 'Tools' },
    { name: 'VS Code', icon: VscCode, color: '#007ACC', category: 'Tools' },
    { name: 'Vercel', icon: SiVercel, color: '#ffffff', category: 'Tools' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37', category: 'Tools' },
  ],
  // Row 5 (4 skills)
  [
    { name: 'DSA (Java)', icon: FaJava, color: '#E76F51', category: 'Languages' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E', category: 'Tools' },
    { name: 'REST APIs', icon: Terminal, color: '#A855F7', category: 'Backend' },
    { name: 'System Design', icon: Cpu, color: '#3B82F6', category: 'Backend' },
  ],
];

const filterCategories = [
  { id: 'All', label: 'All Stack', icon: Sparkles },
  { id: 'Languages', label: 'Languages', icon: FaCode },
  { id: 'Frontend', label: 'Frontend', icon: Layers },
  { id: 'Backend', label: 'Backend', icon: Terminal },
  { id: 'AI/ML', label: 'AI & Data', icon: Cpu },
  { id: 'Database', label: 'Database', icon: Database },
  { id: 'Tools', label: 'DevOps & Tools', icon: Wrench },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <section id="skills" className="relative py-24 overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4 tracking-wider uppercase">
            <Sparkles size={14} className="animate-pulse text-purple-400" />
            Core Stack & Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Technical Stack
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interactive pyramid layout of technologies, frameworks, AI/ML models & developer tools
          </p>
        </motion.div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-16 max-w-4xl mx-auto">
          {filterCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-300 border ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-105'
                    : 'glass border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Inverted Pyramid / Honeycomb Grid Layout */}
        <div className="flex flex-col items-center gap-4.5 max-w-6xl mx-auto">
          {skillRows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: rowIndex * 0.08 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full"
            >
              {row.map((skill) => {
                const Icon = skill.icon;
                const isMatch = activeCategory === 'All' || skill.category === activeCategory;

                return (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.15, y: -6 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className={`group relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 p-2.5 glass rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isMatch
                        ? 'border-white/10 bg-white/[0.04] opacity-100 hover:border-purple-400/80 hover:bg-purple-500/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]'
                        : 'border-white/5 bg-white/[0.01] opacity-30 hover:opacity-75'
                    }`}
                  >
                    {/* Glowing Aura on Hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Icon
                        size={28}
                        className="transition-all duration-300 group-hover:scale-110"
                        style={{ color: isMatch ? skill.color : '#777777' }}
                      />
                      <span className="text-[10px] sm:text-xs text-gray-300 font-medium text-center truncate max-w-full mt-1.5 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
