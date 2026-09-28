'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Heart } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech in Cybersecurity',
    institution: 'Darbhanga College of Engineering, Darbhanga',
    period: '2024 - 2028 (Expected)',
    status: 'Current'
  },
  {
    degree: 'Intermediate',
    institution: 'T.P. Verma College, Narkatiaganj',
    period: '2022',
    percentage: '79.8%'
  },
  {
    degree: 'Matriculation',
    institution: '+2 High School, Narkatiaganj',
    period: '2020',
    percentage: '78.7%'
  }
];

const experience = {
  role: 'Web Development Intern',
  company: 'UptoSkills',
  period: 'Dec 2025 - Mar 2026',
  duration: '3 Months',
  type: 'Internship'
};

export default function About() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">About Me</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer with a strong foundation in web technologies and cybersecurity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-3xl p-8 glow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/10 rounded-xl">
                <GraduationCap size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="border-l-2 border-white/30 pl-4 hover:border-white transition-colors"
                >
                  <h4 className="font-semibold text-lg mb-1">{edu.degree}</h4>
                  <p className="text-gray-400 mb-1">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{edu.period}</span>
                    {edu.percentage && <span>• {edu.percentage}</span>}
                    {edu.status && (
                      <span className="px-2 py-0.5 bg-white/20 text-white rounded-full text-xs">
                        {edu.status}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience & Summary */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Briefcase size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Experience</h3>
              </div>
              <div className="border-l-2 border-white/30 pl-4 hover:border-white transition-colors">
                <h4 className="font-semibold text-lg mb-1">{experience.role}</h4>
                <p className="text-gray-400 mb-1">{experience.company}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{experience.period}</span>
                  <span>•</span>
                  <span>{experience.duration}</span>
                  <span className="px-2 py-0.5 bg-white/20 text-white rounded-full text-xs">
                    {experience.type}
                  </span>
                </div>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Developed responsive web pages using React.js and modern JavaScript</li>
                  <li>• Integrated REST APIs and authentication features</li>
                  <li>• Collaborated with team to enhance UI/UX and debug issues</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-3xl p-8 glow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Heart size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Web Development', 'AI/ML', 'Cybersecurity', 'Cloud Computing', 'Open Source', 'Hackathons'].map(
                  (interest, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 glass glass-hover rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
