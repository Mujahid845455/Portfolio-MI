'use client';

import { motion } from 'framer-motion';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useState, FormEvent } from 'react';
import WorldMap from '@/components/ui/world-map';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('loading');

    // Simulate submission (replace with EmailJS or backend API if needed)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="rounded-2xl sm:rounded-3xl md:rounded-[36px] border border-white/10 bg-[#070a14]/90 p-4 sm:p-8 lg:p-16 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
            
            {/* Left Content (Text Info + World Map with Glowing Pin) */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 flex flex-col justify-between h-full">
              <div>
                {/* Top Glowing Mail Icon Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#131b2e] border border-blue-500/30 text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.35)] mb-4 sm:mb-8"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>

                {/* Main Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6"
                >
                  Contact us
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-400 text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl"
                >
                  We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
                </motion.p>

                {/* Contact Email/Phone/Location Info bar */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400 font-mono break-all"
                >
                  <a href="mailto:mujahidulI845455@gmail.com" className="hover:text-blue-400 transition-colors break-all">
                    mujahidulI845455@gmail.com
                  </a>
                  <span className="hidden sm:inline text-gray-600">•</span>
                  <a href="tel:+918603629937" className="hover:text-blue-400 transition-colors">
                    +91 8603629937
                  </a>
                  <span className="hidden sm:inline text-gray-600">•</span>
                  <span className="text-gray-300">Darbhanga, Bihar, India</span>
                </motion.div>
              </div>

              {/* World Map Section with Location Pin */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative mt-4 sm:mt-6 pt-4 border-t border-white/5"
              >
                <WorldMap
                  dots={[
                    {
                      start: { lat: 28.6139, lng: 77.209, label: 'India' },
                      end: { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: 'India' },
                      end: { lat: -15.7975, lng: -47.8919, label: 'Brazil' },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: 'India' },
                      end: { lat: 38.7223, lng: -9.1393, label: 'Lisbon' },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: 'India' },
                      end: { lat: 51.5074, lng: -0.1278, label: 'London' },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: 'India' },
                      end: { lat: 43.1332, lng: 131.9113, label: 'Vladivostok' },
                    },
                    {
                      start: { lat: 28.6139, lng: 77.209, label: 'India' },
                      end: { lat: -1.2921, lng: 36.8219, label: 'Nairobi' },
                    },
                  ]}
                />
              </motion.div>
            </div>

            {/* Right Column: Aceternity Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-2xl sm:rounded-3xl bg-[#0c101d]/90 border border-white/10 p-4 sm:p-8 md:p-10 shadow-2xl overflow-hidden">
                
                {/* Background Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-6">
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Manu Arora"
                      className={`w-full px-4 py-3.5 bg-[#141a29]/90 border ${
                        errors.name ? 'border-red-500/80 focus:ring-red-500/50' : 'border-white/10 focus:border-blue-500/60 focus:ring-blue-500/30'
                      } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="support@aceternity.com"
                      className={`w-full px-4 py-3.5 bg-[#141a29]/90 border ${
                        errors.email ? 'border-red-500/80 focus:ring-red-500/50' : 'border-white/10 focus:border-blue-500/60 focus:ring-blue-500/30'
                      } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition-all duration-200`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Aceternity Labs LLC"
                      className="w-full px-4 py-3.5 bg-[#141a29]/90 border border-white/10 focus:border-blue-500/60 focus:ring-blue-500/30 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message here"
                      className={`w-full px-4 py-3.5 bg-[#141a29]/90 border ${
                        errors.message ? 'border-red-500/80 focus:ring-red-500/50' : 'border-white/10 focus:border-blue-500/60 focus:ring-blue-500/30'
                      } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 transition-all duration-200 resize-none`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={12} />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Success notification */}
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-xs sm:text-sm font-medium"
                    >
                      <CheckCircle size={18} />
                      <span>Message sent successfully! I will get back to you shortly.</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-7 py-3 bg-[#1e2538] hover:bg-[#28324a] active:bg-[#181e2e] text-white text-sm font-semibold rounded-xl border border-white/15 shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                        status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit'
                      )}
                    </motion.button>
                  </div>

                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
