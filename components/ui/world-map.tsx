'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface MapDot {
  start: MapPoint;
  end: MapPoint;
}

export interface WorldMapProps {
  dots?: MapDot[];
  lineColor?: string;
  className?: string;
}

// Helper to project lat/lng to SVG coordinates on a 800x400 map canvas
function projectPoint(lat: number, lng: number, width = 800, height = 400) {
  const x = ((lng + 180) / 360) * width;
  // Equirectangular projection mapping
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

// Helper to create curved Bezier arc path string
function createCurvedPath(
  start: { x: number; y: number },
  end: { x: number; y: number }
) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - Math.abs(start.x - end.x) * 0.25;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export default function WorldMap({
  dots = [
    {
      start: { lat: 28.6139, lng: 77.209, label: 'India' }, // New Delhi / India
      end: { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
    },
    {
      start: { lat: 28.6139, lng: 77.209, label: 'India' },
      end: { lat: 51.5074, lng: -0.1278, label: 'London' },
    },
    {
      start: { lat: 28.6139, lng: 77.209, label: 'India' },
      end: { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
    },
    {
      start: { lat: 28.6139, lng: 77.209, label: 'India' },
      end: { lat: -33.8688, lng: 151.2093, label: 'Sydney' },
    },
  ],
  lineColor = '#60a5fa',
  className = '',
}: WorldMapProps) {
  const SVG_WIDTH = 800;
  const SVG_HEIGHT = 400;

  // Primary origin point (India / Home)
  const homePoint = useMemo(() => {
    return projectPoint(28.6139, 77.209, SVG_WIDTH, SVG_HEIGHT);
  }, []);

  // Compute curved paths and endpoint coordinates
  const connections = useMemo(() => {
    return dots.map((dot) => {
      const p1 = projectPoint(dot.start.lat, dot.start.lng, SVG_WIDTH, SVG_HEIGHT);
      const p2 = projectPoint(dot.end.lat, dot.end.lng, SVG_WIDTH, SVG_HEIGHT);
      const pathD = createCurvedPath(p1, p2);
      return { p1, p2, pathD, startLabel: dot.start.label, endLabel: dot.end.label };
    });
  }, [dots]);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-[#030712] border border-white/10 p-4 shadow-2xl ${className}`}>
      
      {/* Map Header / Title overlay */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
        <span className="text-xs font-mono text-gray-300 font-semibold uppercase tracking-wider">
          Global Connectivity • Remote Active
        </span>
      </div>

      <div className="relative w-full aspect-[2/1] min-h-[260px]">
        {/* World Map SVG Canvas */}
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-full text-slate-800 pointer-events-none select-none"
        >
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="world-map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
            </pattern>

            <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#world-map-grid)" />

          {/* World Continents Rough Map Paths */}
          <g fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5">
            {/* North America */}
            <path d="M 120 70 Q 180 50 240 80 T 260 160 T 180 180 T 100 130 Z" />
            {/* South America */}
            <path d="M 230 200 Q 280 220 270 290 T 220 360 T 190 280 Z" />
            {/* Europe */}
            <path d="M 380 60 Q 450 50 490 80 T 460 140 T 390 120 Z" />
            {/* Africa */}
            <path d="M 390 150 Q 480 150 490 230 T 430 310 T 380 230 Z" />
            {/* Asia */}
            <path d="M 500 60 Q 640 40 730 80 T 720 180 T 570 190 Z" />
            {/* India Subcontinent */}
            <path d="M 550 160 Q 600 170 600 230 T 540 230 Z" />
            {/* Australia */}
            <path d="M 640 250 Q 730 240 730 300 T 640 310 Z" />
          </g>

          {/* Animated Curved Connecting Arc Paths */}
          {connections.map((conn, idx) => (
            <g key={idx}>
              {/* Static faint guide line */}
              <path
                d={conn.pathD}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Animated glowing stroke */}
              <motion.path
                d={conn.pathD}
                fill="none"
                stroke="url(#arc-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: [0, 1], opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 3 + idx * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: idx * 0.4,
                }}
              />
            </g>
          ))}

          {/* End Point Markers */}
          {connections.map((conn, idx) => (
            <g key={`end-${idx}`}>
              <circle cx={conn.p2.x} cy={conn.p2.y} r="3" fill="#818cf8" />
              <circle cx={conn.p2.x} cy={conn.p2.y} r="6" fill="#818cf8" opacity="0.3" />
            </g>
          ))}
        </svg>

        {/* 📍 WE ARE HERE Floating Laser Pin (India Coordinates) */}
        <div
          style={{
            left: `${(homePoint.x / SVG_WIDTH) * 100}%`,
            top: `${(homePoint.y / SVG_HEIGHT) * 100}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-full z-30 flex flex-col items-center pointer-events-none"
        >
          {/* Floating Pill Label "We are here" */}
          <motion.div
            initial={{ y: -4 }}
            animate={{ y: 2 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="px-3 py-1 bg-[#090d18] text-white font-mono text-[11px] font-bold rounded-lg border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center gap-1.5 whitespace-nowrap mb-1"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>We are here</span>
          </motion.div>

          {/* Glowing Pin Needle Line */}
          <div className="w-[2px] h-7 bg-gradient-to-t from-blue-400 via-indigo-500 to-transparent shadow-[0_0_12px_#3b82f6]" />

          {/* Glowing Radar Pulse Rings at Pin Base */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-blue-500/30 rounded-full animate-ping" />
            <div className="absolute w-6 h-6 bg-blue-500/50 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-[0_0_15px_#3b82f6]" />
          </div>
        </div>

      </div>
    </div>
  );
}
