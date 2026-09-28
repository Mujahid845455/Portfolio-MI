'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  ExternalLink, Star, Code, Lightbulb, Layers, Cpu,
  ChevronLeft, ChevronRight, RotateCcw,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import FlipCard from '@/components/FlipCard';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const tabs = [
  { id: 'overview', label: 'Overview', icon: Star },
  { id: 'features', label: 'Features', icon: Lightbulb },
  { id: 'tech', label: 'Tech Stack', icon: Code },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'challenges', label: 'Challenges', icon: Cpu },
];

const featuredProject = {
  name: 'GestureLink AI',
  category: 'AI/ML • Full Stack',
  shortDesc: 'Real-Time Sign Language Communication Platform',
  overview: {
    problem: 'Communication barrier between deaf and hearing individuals limits social inclusion and professional opportunities.',
    solution: 'AI-powered platform enabling real-time bidirectional communication through sign language recognition and generation.',
    impact: 'Empowers the deaf community with seamless communication tools, reducing dependency on interpreters.',
  },
  features: [
    'Real-time sign language recognition using AI and MediaPipe',
    'Text/speech to animated sign language conversion',
    'Two-way communication with 3D avatar animations',
    'Video-based gesture detection and translation',
    'Multi-user video chat support',
    'Secure authentication and user profiles',
  ],
  techStack: {
    frontend: ['React.js', 'Three.js', 'Socket.io', 'TailwindCSS'],
    backend: ['Flask', 'Node.js', 'Express.js'],
    ai: ['TensorFlow', 'MediaPipe', 'OpenCV'],
    database: ['PostgreSQL', 'Redis'],
    tools: ['Docker', 'AWS/GCP'],
  },
  architecture: [
    { layer: 'Frontend', desc: 'React + Three.js for 3D avatar rendering' },
    { layer: 'WebSocket', desc: 'Real-time communication via Socket.io' },
    { layer: 'AI Engine', desc: 'TensorFlow + MediaPipe for gesture recognition' },
    { layer: 'Backend', desc: 'Flask API for processing and Node.js for WebSocket' },
    { layer: 'Database', desc: 'PostgreSQL for user data, Redis for caching' },
  ],
  challenges: [
    'Optimizing real-time gesture recognition for low latency',
    'Creating realistic 3D sign language animations',
    'Handling concurrent video streams efficiently',
    'Ensuring accuracy across different sign language dialects',
  ],
  github: 'https://github.com/mujahidul885/gesturelink-ai',
  demo: 'https://gesture-link-ai-68mc.vercel.app/',
  image: '/projects/gesturelink.jpg',
};

const otherProjects = [
  {
    name: 'Intelli-Credit',
    desc: 'AI-Powered Corporate Credit Appraisal System that automates risk assessment and generates CAM reports in under 30 minutes.',
    tech: ['FastAPI', 'React', 'Python', 'PostgreSQL', 'XGBoost', 'Docker', 'AWS'],
    category: 'AI/ML',
    github: 'https://github.com/mujahidul885/intelli-credit',
    demo: 'https://intelli-credit-system.vercel.app/',
    image: '/projects/intellicredit.jpg',
    status: 'Live',
  },
  {
    name: 'PlaceReady AI',
    desc: 'AI-driven platform that analyzes GitHub projects and generates personalized technical interview questions with voice mock interviews.',
    tech: ['Next.js', 'TypeScript', 'AWS Bedrock', 'DynamoDB', 'S3', 'Lambda'],
    category: 'AI/ML',
    github: 'https://github.com/mujahidul885/placeready-ai',
    demo: 'https://place-ready-ai.vercel.app/',
    image: '/projects/placeready.jpg',
    status: 'Live',
  },
  {
    name: 'AgentPay',
    desc: 'Agentic commerce platform with AI discovery, recommendation engine, server-side financial policy gateway, and Razorpay test payment integration.',
    tech: ['Next.js', 'Node.js', 'Razorpay', 'AI Agent', 'FastAPI'],
    category: 'AI/ML',
    github: 'https://github.com/Mujahid845455/ai-commerce-agent-frontend',
    demo: 'https://ai-commerce-agent-frontend-xi.vercel.app/',
    image: '/projects/agentpay.jpg',
    status: 'Live',
  },
  {
    name: 'AI Marine Data Platform',
    desc: 'Platform for analyzing marine data using AI to provide insights for environmental conservation and research.',
    tech: ['React', 'Node.js', 'Python', 'MongoDB', 'TensorFlow'],
    category: 'AI/ML',
    github: '#',
    demo: 'https://ai-driven-data-platform2.vercel.app/',
    image: '/projects/ai-driven.png',
    status: 'Live',
  },
  {
    name: 'Task Management System',
    desc: 'Collaborative task management tool with real-time updates, team collaboration, and project tracking features.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Docker'],
    category: 'Full Stack',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    status: 'Live',
  },
  {
    name: 'LogiSense-AI',
    desc: 'Smart AI logistics & supply chain intelligence platform with automated route optimization and inventory forecasting.',
    tech: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'Full Stack',
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    status: 'Live',
  },
];

const categories = ['All', 'AI/ML', 'Full Stack'];

const tabSlideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { x: { type: 'spring' as const, stiffness: 320, damping: 30 }, opacity: { duration: 0.2 } } },
  exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, opacity: 0, transition: { duration: 0.15 } }),
};

/* ─────────────────────────────────────────────────────────────
   FLIP CARD FACES
───────────────────────────────────────────────────────────── */
function CardFront({ project }: { project: typeof otherProjects[0] }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20 }}>
      {/* Browser mockup image */}
      <div style={{ flex: '0 0 auto', padding: '14px 14px 0' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
          <div style={{ background: '#1a1a1a', padding: '8px 12px', display: 'flex', gap: 6, alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28ca41' }} />
            <div style={{ flex: 1, textAlign: 'center', fontSize: 9, color: '#666', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {project.demo !== '#' ? project.demo.replace(/^https?:\/\//, '') : project.name.toLowerCase() + '.app'}
            </div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 160, background: '#111' }}>
            <Image src={project.image} alt={project.name} fill style={{ objectFit: 'cover', objectPosition: 'top' }} sizes="360px" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, padding: '14px 18px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <h4 style={{ fontSize: 17, fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{project.name}</h4>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 99, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399' }} />Live
            </span>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5, margin: '0 0 10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {project.tech.slice(0, 4).map(t => (
              <span key={t} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#cbd5e1', fontFamily: 'monospace' }}>{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}>+{project.tech.length - 4}</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <RotateCcw size={11} color="#818cf8" />
          <span style={{ fontSize: 10, color: '#818cf8', fontWeight: 600 }}>Click card to flip details & links</span>
        </div>
      </div>
    </div>
  );
}

function CardBack({ project }: { project: typeof otherProjects[0] }) {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', display: 'flex', flexDirection: 'column', padding: 20 }}>
      {/* Header */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#6366f1', textTransform: 'uppercase', marginBottom: 4 }}>{project.category}</div>
        <h4 style={{ fontSize: 20, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em' }}>{project.name}</h4>
      </div>

      {/* Description */}
      <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.65, margin: '0 0 14px' }}>{project.desc}</p>

      {/* Tech */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Tech Stack</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontSize: 10, padding: '4px 9px', borderRadius: 6, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc', fontFamily: 'monospace' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
        <a
          href={project.demo} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 12px', borderRadius: 10, background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.45)', color: '#a5b4fc', fontSize: 11, fontWeight: 700, textDecoration: 'none', transition: 'background 0.2s' }}
        >
          <ExternalLink size={13} /> Live Demo
        </a>
        <a
          href={project.github} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#ccc', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}
        >
          <FaGithub size={13} /> Code
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeTab, setActiveTab] = useState('overview');
  const [tabDirection, setTabDirection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);

  const CARDS_PER_PAGE = 3;

  const filteredProjects = selectedCategory === 'All'
    ? otherProjects
    : otherProjects.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / CARDS_PER_PAGE) || 1;
  const safeIndex = Math.min(currentIndex, totalPages - 1);
  const pageCards = filteredProjects.slice(safeIndex * CARDS_PER_PAGE, (safeIndex + 1) * CARDS_PER_PAGE);

  const handleTabChange = (id: string) => {
    const prev = tabs.findIndex(t => t.id === activeTab);
    const next = tabs.findIndex(t => t.id === id);
    setTabDirection(next > prev ? 1 : -1);
    setActiveTab(id);
  };

  const paginate = (dir: number) => {
    if (totalPages <= 1) return;
    setSlideDirection(dir);
    setCurrentIndex(prev => (prev + dir + totalPages) % totalPages);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setSlideDirection(0);
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Featured Projects</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Innovative solutions showcasing technical expertise and problem-solving skills
          </p>
        </motion.div>

        {/* ── Featured Project ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-24"
        >
          <div className="glass rounded-[32px] overflow-hidden glow p-6 sm:p-8 border border-white/10">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Preview */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative group">
                <div className="relative p-4 sm:p-5 rounded-3xl bg-gradient-to-tr from-purple-900/70 via-indigo-900/50 to-purple-600/40 border border-purple-500/20 shadow-2xl overflow-hidden group-hover:border-purple-400/60 transition-all duration-300">
                  <div className="rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-2xl">
                    <div className="bg-gray-950/90 px-4 py-2.5 flex items-center justify-between border-b border-white/10">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <div className="text-xs text-gray-400 font-mono">{featuredProject.demo}</div>
                      <div className="w-6" />
                    </div>
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <Image src={featuredProject.image} alt={featuredProject.name} fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Details */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-semibold">⭐ FEATURED PROJECT</span>
                </div>
                <h3 className="text-3xl font-extrabold mb-2 text-white">{featuredProject.name}</h3>
                <p className="text-gray-400 mb-4">{featuredProject.category}</p>
                <p className="text-lg text-gray-300 mb-6">{featuredProject.shortDesc}</p>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white text-black' : 'glass glass-hover text-gray-400'}`}
                      ><Icon size={16} />{tab.label}</button>
                    );
                  })}
                </div>

                <div className="relative overflow-hidden min-h-[140px] flex-1 mb-6">
                  <AnimatePresence mode="wait" custom={tabDirection}>
                    <motion.div key={activeTab} custom={tabDirection} variants={tabSlideVariants} initial="enter" animate="center" exit="exit" className="w-full">
                      {activeTab === 'overview' && (
                        <div className="space-y-4">
                          {(['problem', 'solution', 'impact'] as const).map(k => (
                            <div key={k}><h4 className="font-semibold text-white mb-2 capitalize">{k}</h4><p className="text-gray-300 text-sm">{featuredProject.overview[k]}</p></div>
                          ))}
                        </div>
                      )}
                      {activeTab === 'features' && (
                        <ul className="space-y-3">{featuredProject.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300 text-sm"><span className="text-white mt-1">✓</span>{f}</li>
                        ))}</ul>
                      )}
                      {activeTab === 'tech' && (
                        <div className="space-y-4">{Object.entries(featuredProject.techStack).map(([cat, techs]) => (
                          <div key={cat}><h4 className="font-semibold text-white mb-2 capitalize">{cat}</h4>
                            <div className="flex flex-wrap gap-2">{(techs as string[]).map(t => (
                              <span key={t} className="px-3 py-1.5 glass rounded-lg border border-white/10 text-xs font-mono text-gray-300">{t}</span>
                            ))}</div>
                          </div>
                        ))}</div>
                      )}
                      {activeTab === 'architecture' && (
                        <div className="space-y-3">{featuredProject.architecture.map((l, i) => (
                          <div key={i} className="flex items-center gap-3"><div className="w-24 text-sm font-semibold text-white">{l.layer}</div><div className="flex-1 text-sm text-gray-300">{l.desc}</div></div>
                        ))}</div>
                      )}
                      {activeTab === 'challenges' && (
                        <ul className="space-y-3">{featuredProject.challenges.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300 text-sm"><span className="text-white mt-1">⚠</span>{c}</li>
                        ))}</ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex gap-4">
                  <a href={featuredProject.demo} target="_blank" rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-medium flex items-center justify-center gap-2 transition-all">
                    <ExternalLink size={18} />Live Demo
                  </a>
                  <a href={featuredProject.github} target="_blank" rel="noopener noreferrer"
                    className="px-6 py-3 glass glass-hover glow-hover rounded-full font-medium flex items-center gap-2">
                    <FaGithub size={18} />GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Other Projects — FlipCard Carousel ──────────────── */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">Other Projects</h3>
              <p className="text-gray-500 text-sm mt-1">Click card to flip · Hover to tilt · Drag to browse</p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-white text-black shadow-white scale-105' : 'glass glass-hover text-gray-400'}`}
                >{cat}</button>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div className="relative py-6">
            {/* Left arrow */}
            {totalPages > 1 && (
              <button onClick={() => paginate(-1)}
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass glass-hover glow-hover rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all border border-white/20"
              ><ChevronLeft size={22} /></button>
            )}
            {/* Right arrow */}
            {totalPages > 1 && (
              <button onClick={() => paginate(1)}
                className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 glass glass-hover glow-hover rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all border border-white/20"
              ><ChevronRight size={22} /></button>
            )}

            {/* Cards */}
            <div className="overflow-hidden px-2 py-4">
              <AnimatePresence initial={false} custom={slideDirection} mode="wait">
                <motion.div
                  key={safeIndex}
                  custom={slideDirection}
                  variants={{
                    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
                    center: { x: 0, opacity: 1, transition: { x: { type: 'spring', stiffness: 280, damping: 28 }, opacity: { duration: 0.3 } } },
                    exit: (d: number) => ({ x: d < 0 ? 300 : -300, opacity: 0, transition: { duration: 0.25 } }),
                  }}
                  initial="enter" animate="center" exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
                >
                  {pageCards.map((project, idx) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      className="w-full max-w-[360px]"
                    >
                      <FlipCard
                        front={<CardFront project={project} />}
                        back={<CardBack project={project} />}
                        axis="y"
                        flipOnClick
                        draggable
                        dragDistance={60}
                        tilt
                        tiltMax={12}
                        glare
                        glareOpacity={0.18}
                        hoverScale={1.04}
                        perspective={1100}
                        stiffness={170}
                        damping={20}
                        width="100%"
                        height={420}
                        radius={20}
                        background="#0d1117"
                        color="#f5f5f5"
                        shadow
                        shadowColor="#000000"
                        shadowOpacity={0.5}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => { setSlideDirection(i > safeIndex ? 1 : -1); setCurrentIndex(i); }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${i === safeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
