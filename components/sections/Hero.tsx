'use client';

import { motion } from 'framer-motion';
import { Mail, Download, ChevronDown, Eye } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import TechText from '@/components/TechText';
import TruckDownloadButton from '@/components/TruckDownloadButton';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/mujahidul885', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/mujahidul-islam', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:mujahidulI845455@gmail.com', label: 'Email' },
];

export default function Hero() {
  const [text, setText] = useState('');
  const roles = ['Web Developer', 'Full Stack Developer', 'Cybersecurity Student'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && text !== currentRole) {
          setText(currentRole.substring(0, text.length + 1));
        } else if (!isDeleting && text === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text !== '') {
          setText(currentRole.substring(0, text.length - 1));
        } else if (isDeleting && text === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-lg md:text-xl text-gray-400 mb-2 font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I&apos;m
            </motion.h2>

            {/* React Bits TechText Name Animation */}
            <motion.div
              className="w-full h-[140px] sm:h-[180px] md:h-[220px] relative mx-auto my-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <TechText
                text="Mujahidul Islam"
                fontWeight={800}
                fontSize={120}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                color="#ffffff"
                accentColor="#60a5fa"
                letterSpacing={-0.03}
                reach={200}
                softness={0.7}
                strokeWidth={1.8}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep
              />
            </motion.div>
            <motion.div
              className="text-2xl md:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span>{text}</span>
              <span className="animate-pulse ml-1">|</span>
            </motion.div>
            <motion.p
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              B.Tech Cybersecurity student passionate about building innovative web applications
              and AI-powered solutions. Specialized in MERN stack with a focus on creating
              impactful digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#projects"
                className="h-[50px] px-6 rounded-full bg-[#0c101d] border border-white/15 font-semibold text-white text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all hover:scale-105 shadow-[inset_2px_2px_6px_#04070f,inset_-2px_-2px_6px_#162035] hover:border-emerald-500/40 hover:shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
              >
                <Eye size={18} className="text-emerald-400" />
                <span>View Projects</span>
              </a>
              <div className="w-[230px] sm:w-[250px]">
                <TruckDownloadButton
                  fileUrl="/resume.pdf"
                  fileName="Mujahidul_Islam_Resume.pdf"
                  buttonText="Download Resume"
                  variant="standard"
                />
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass glass-hover rounded-lg glow-hover"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors">
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown size={24} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
