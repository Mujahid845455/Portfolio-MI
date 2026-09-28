'use client';

import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/mujahidul885', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/mujahidul-islam', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/mujahidul885', label: 'Twitter' },
  { icon: Mail, href: 'mailto:mujahidulI845455@gmail.com', label: 'Email' },
];

const quickLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative glass border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Mujahidul Islam</h3>
            <p className="text-gray-400 mb-4">
              Full Stack Web Developer passionate about creating innovative solutions with modern technologies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 glass glass-hover rounded-lg glow-hover"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:mujahidulI845455@gmail.com" className="hover:text-blue-400 transition-colors">
                  mujahidulI845455@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918603629937" className="hover:text-blue-400 transition-colors">
                  +91 8603629937
                </a>
              </li>
              <li>Darbhanga, Bihar, India</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mujahidul Islam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
