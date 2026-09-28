'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useId } from 'react';
import { Trophy, Award, Code, ExternalLink, Eye, X, ChevronDown, ChevronUp, ArrowRight, Sparkles } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import { FaAmazon, FaMicrosoft } from 'react-icons/fa';
import Image from 'next/image';
import CertificateCoverflowSlider from '@/components/CertificateCoverflowSlider';

const achievements = [
  {
    id: 'google-ambassador',
    title: 'Google Student Ambassador',
    organization: 'Google',
    icon: SiGoogle,
    color: '#4285F4',
    bgGradient: 'from-blue-600/40 via-indigo-600/20 to-transparent',
    description: 'Selected as Google Student Ambassador to lead tech initiatives and Developer Study Jams.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    ctaText: 'Google Developers',
    ctaLink: 'https://developers.google.com/',
    highlights: [
      'Organized technical workshops and Google Cloud Study Jams for 300+ students.',
      'Promoted Android development, Web Vitals, and Gemini AI APIs across campus.',
      'Led developer community initiatives in collaboration with GDSC.',
    ],
  },
  {
    id: 'amazon-ml',
    title: 'Amazon ML Summer School',
    organization: 'Amazon',
    icon: FaAmazon,
    color: '#FF9900',
    bgGradient: 'from-amber-600/40 via-orange-600/20 to-transparent',
    description: 'Selected for Round 2 in Amazon ML Summer School among top engineering applicants across India.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    ctaText: 'Amazon Science',
    ctaLink: 'https://www.amazon.science/',
    highlights: [
      'Intensive ML training led by Senior Amazon Machine Learning Scientists.',
      'Deep dive into Supervised Learning, Deep Neural Networks, & Recommendation Systems.',
      'Hands-on machine learning models built using PyTorch & AWS SageMaker.',
    ],
  },
  {
    id: 'flipkart-grid',
    title: 'Flipkart GRID 8.0',
    organization: 'Flipkart',
    icon: Trophy,
    color: '#2874F0',
    bgGradient: 'from-blue-700/40 via-sky-600/20 to-transparent',
    description: 'Advanced to Round 2 in Flipkart GRID 8.0 flagship national engineering hackathon.',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=800&q=80',
    ctaText: 'Flipkart GRID',
    ctaLink: 'https://unstop.com/',
    highlights: [
      'Solved real-world E-Commerce logistics & Robotics AI challenges.',
      'Designed high-performance algorithms for automated supply chain route optimization.',
      'Competed among 100,000+ top engineering candidates nationwide.',
    ],
  },
  {
    id: 'microsoft-imagine-cup',
    title: 'Microsoft Imagine Cup',
    organization: 'Microsoft',
    icon: FaMicrosoft,
    color: '#00A4EF',
    bgGradient: 'from-cyan-600/40 via-blue-600/20 to-transparent',
    description: 'Participated in Microsoft Imagine Cup global competition utilizing Azure AI & Cloud.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    ctaText: 'Imagine Cup',
    ctaLink: 'https://imaginecup.microsoft.com/',
    highlights: [
      'Engineered AI-driven assistive solution leveraging Azure Cloud & OpenAI services.',
      'Pitched prototype evaluated on Technical Rigor, UX Design, and Social Impact.',
      'Recognized for innovative application of Computer Vision & Accessibility AI.',
    ],
  },
];

const hackathons = [
  {
    name: 'Adobe University Hackathon',
    organizer: 'Adobe & Unstop',
    result: 'Participant',
    date: '9th Aug 2026',
    certificateImage: '/certificates/adobe-hackathon-cert.png',
  },
  {
    name: 'National AI/ML Hackathon',
    organizer: 'Vivriti Capital & IIT Hyderabad',
    result: 'Participant',
    date: '2026',
    certificateImage: '/certificates/vivriti-aiml-cert.jpg',
  },
  {
    name: 'Solution Challenge 2026: Build with AI',
    organizer: 'Google & Hack2Skill',
    result: 'Participant',
    date: '22nd Jul 2026',
    certificateImage: '/certificates/solution-challenge-cert.png',
  },
];

const certifications = [
  {
    name: 'Introduction to MERN Stack',
    issuer: 'Online Platform',
    date: 'Dec 2025',
    link: '#',
  },
  {
    name: 'SQL Analytics and BI on Databricks',
    issuer: 'Databricks',
    date: 'Dec 2025',
    link: '#',
  },
  {
    name: 'Introduction to Generative AI Studio',
    issuer: 'Google Cloud',
    date: 'Dec 2025',
    link: '#',
  },
];

const codingProfiles = [
  { platform: 'LeetCode', username: 'mujahidul885', link: '#' },
  { platform: 'HackerRank', username: 'mujahidul885', link: '#' },
  { platform: 'CodeChef', username: 'mujahidul885', link: '#' },
  { platform: 'Codeforces', username: 'mujahidul885', link: '#' },
];

export default function Achievements() {
  const [activeAchievement, setActiveAchievement] = useState<typeof achievements[number] | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    image: string;
    issuer: string;
  } | null>(null);

  const [showAllHackathons, setShowAllHackathons] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Escape key & outside click handling for Expandable Card
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveAchievement(null);
      }
    }
    if (activeAchievement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeAchievement]);

  const INITIAL_HACKATHONS_COUNT = 3;
  const INITIAL_CERTS_COUNT = 3;

  const visibleHackathons = showAllHackathons
    ? hackathons
    : hackathons.slice(0, INITIAL_HACKATHONS_COUNT);

  const visibleCertifications = showAllCerts
    ? certifications
    : certifications.slice(0, INITIAL_CERTS_COUNT);

  return (
    <section id="achievements" className="relative py-24 overflow-hidden">
      
      {/* Background glow ambient */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Achievements & Recognition
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Awards, certifications, hackathon participation, and competitive programming journey
          </p>
        </motion.div>

        {/* ── Aceternity Expandable Card Backdrop ────────────── */}
        <AnimatePresence>
          {activeAchievement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveAchievement(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md h-full w-full z-[90]"
            />
          )}
        </AnimatePresence>

        {/* ── Aceternity Expandable Card Modal ───────────────── */}
        <AnimatePresence>
          {activeAchievement ? (
            <div className="fixed inset-0 grid place-items-center z-[100] p-4 sm:p-6 overflow-y-auto">
              <motion.div
                layoutId={`card-${activeAchievement.id}-${id}`}
                ref={modalRef}
                className="w-full max-w-[620px] bg-[#0c101d] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto"
              >
                {/* Banner Image */}
                <motion.div layoutId={`image-${activeAchievement.id}-${id}`} className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                  <Image
                    src={activeAchievement.image}
                    alt={activeAchievement.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 620px"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${activeAchievement.bgGradient}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101d] via-transparent to-black/50" />

                  {/* Close button */}
                  <button
                    onClick={() => setActiveAchievement(null)}
                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 border border-white/20 rounded-full text-white transition-all hover:scale-110 z-20"
                  >
                    <X size={18} />
                  </button>

                  {/* Organization Tag */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-full flex items-center gap-2 text-white font-medium text-xs">
                    <activeAchievement.icon size={16} style={{ color: activeAchievement.color }} />
                    {activeAchievement.organization}
                  </div>
                </motion.div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-white/10">
                    <div>
                      <motion.h3
                        layoutId={`title-${activeAchievement.id}-${id}`}
                        className="text-2xl font-extrabold text-white mb-1"
                      >
                        {activeAchievement.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${activeAchievement.id}-${id}`}
                        className="text-gray-400 text-sm"
                      >
                        {activeAchievement.description}
                      </motion.p>
                    </div>

                    <motion.a
                      layoutId={`button-${activeAchievement.id}-${id}`}
                      href={activeAchievement.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-black hover:bg-gray-200 transition-all flex items-center gap-2 whitespace-nowrap shadow-lg hover:scale-105 shrink-0"
                    >
                      <span>{activeAchievement.ctaText}</span>
                      <ExternalLink size={14} />
                    </motion.a>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Sparkles size={14} className="text-yellow-400" /> Key Highlights & Impact
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      {activeAchievement.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* ── Major Achievements (Expandable Cards List) ────── */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <Trophy className="text-yellow-400" size={28} />
              Major Achievements
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    layoutId={`card-${achievement.id}-${id}`}
                    key={achievement.id}
                    onClick={() => setActiveAchievement(achievement)}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="glass rounded-2xl p-6 glow-hover cursor-pointer border border-white/10 hover:border-white/20 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        layoutId={`image-${achievement.id}-${id}`}
                        className="p-3.5 rounded-2xl shrink-0"
                        style={{ backgroundColor: `${achievement.color}20`, border: `1px solid ${achievement.color}40` }}
                      >
                        <Icon size={32} style={{ color: achievement.color }} />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <motion.h4
                            layoutId={`title-${achievement.id}-${id}`}
                            className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors truncate"
                          >
                            {achievement.title}
                          </motion.h4>
                          <span className="text-xs text-gray-500 font-mono shrink-0">{achievement.organization}</span>
                        </div>

                        <motion.p
                          layoutId={`description-${achievement.id}-${id}`}
                          className="text-gray-400 text-sm line-clamp-2 mb-3"
                        >
                          {achievement.description}
                        </motion.p>

                        <div className="flex items-center justify-between text-xs font-semibold pt-1">
                          <span className="text-blue-400 group-hover:underline flex items-center gap-1">
                            Click to expand <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                          <motion.button
                            layoutId={`button-${achievement.id}-${id}`}
                            className="px-3 py-1.5 rounded-full bg-white/10 text-gray-300 group-hover:bg-white group-hover:text-black transition-colors"
                          >
                            View
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Hackathons (3D Coverflow Swiper Slider) ───────── */}
          <div>
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-3 text-white">
              <Code className="text-purple-400" size={28} />
              Hackathon Participations & Certificates
            </h3>
            
            <CertificateCoverflowSlider
              hackathons={hackathons}
              onSelectCertificate={(cert) => setSelectedCertificate(cert)}
            />
          </div>

          {/* ── Certifications ────────────────────────────────── */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
              <Award className="text-blue-400" size={28} />
              Certifications
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {visibleCertifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 glow-hover hover:scale-105 transition-transform border border-white/10"
                >
                  <h4 className="font-semibold text-white mb-2">{cert.name}</h4>
                  <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs mb-3">{cert.date}</p>
                  <a
                    href={cert.link}
                    className="inline-flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink size={14} />
                    View Certificate
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Show More / Show Less Certifications Button */}
            {certifications.length > INITIAL_CERTS_COUNT && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="px-8 py-3.5 glass glass-hover glow-hover rounded-full font-semibold text-white inline-flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 border border-white/10"
                >
                  <span>
                    {showAllCerts
                      ? 'Show Less Certifications'
                      : `Show More Certifications (${certifications.length - INITIAL_CERTS_COUNT} More)`}
                  </span>
                  {showAllCerts ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            )}
          </div>

          {/* ── Coding Profiles ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 text-center border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Competitive Programming Profiles</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {codingProfiles.map((profile, index) => (
                <motion.a
                  key={index}
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="px-6 py-3 glass glass-hover rounded-xl font-medium flex items-center gap-2 text-white border border-white/10"
                >
                  <Code size={18} />
                  {profile.platform}
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedCertificate.title}</h3>
                  <p className="text-gray-400 text-sm">{selectedCertificate.issuer}</p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 rounded-full glass glass-hover text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="relative aspect-[4/3] w-full bg-black/50 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 80vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
