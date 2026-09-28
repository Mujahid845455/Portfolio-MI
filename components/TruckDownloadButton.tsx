'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, Check, RotateCcw } from 'lucide-react';
import './TruckDownloadButton.css';

export interface TruckDownloadButtonProps {
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  buttonText?: string;
  variant?: 'standard' | 'compact';
  className?: string;
}

export default function TruckDownloadButton({
  fileUrl = '/resume.pdf',
  fileName = 'Mujahidul_Islam_Resume.pdf',
  fileSize = '2.4 MB',
  buttonText = 'Download Resume',
  variant = 'standard',
  className = '',
}: TruckDownloadButtonProps) {
  const [buttonState, setButtonState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [speedText, setSpeedText] = useState('0.0 MB/s');
  const [isBoostExit, setIsBoostExit] = useState(false);

  const truckRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext lazily on user gesture
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioClass) {
        audioCtxRef.current = new AudioClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Sound 1: Mechanical tactile click sound
  const playTactileClick = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      // Ignore audio errors gracefully
    }
  };

  // Sound 2: Engine rev sweep sound
  const playEngineRev = (durationMs: number) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const durSec = durationMs / 1000;

      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      subOsc.type = 'sawtooth';

      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + durSec * 0.5);
      osc.frequency.exponentialRampToValueAtTime(220, now + durSec);

      subOsc.frequency.setValueAtTime(28, now);
      subOsc.frequency.exponentialRampToValueAtTime(110, now + durSec);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);
      filter.frequency.linearRampToValueAtTime(550, now + durSec * 0.8);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      gain.gain.setValueAtTime(0.12, now + durSec * 0.85);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durSec + 0.05);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + durSec + 0.06);
      subOsc.stop(now + durSec + 0.06);
    } catch (e) {
      // Ignore audio errors
    }
  };

  // Sound 3: Soft completion chime chords
  const playSuccessChime = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime + i * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      });
    } catch (e) {
      // Ignore audio errors
    }
  };

  // Trigger actual PDF file download
  const triggerRealDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.warn('Resume download link:', e);
    }
  };

  const startAnimation = () => {
    if (buttonState === 'running') return;
    if (buttonState === 'completed') {
      resetToIdle();
      return;
    }

    setButtonState('running');
    playTactileClick();
    setIsBoostExit(false);

    const duration = 1800; // 1.8s duration
    const startTime = performance.now();
    playEngineRev(duration);

    const btnWidth = buttonRef.current?.offsetWidth || 380;
    const startX = -120;
    const targetX = btnWidth - 110;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);

      // Ease in-out
      const ease =
        currentProgress < 0.5
          ? 4 * currentProgress * currentProgress * currentProgress
          : 1 - Math.pow(-2 * currentProgress + 2, 3) / 2;

      const currentX = startX + (targetX - startX) * ease;
      if (truckRef.current) {
        truckRef.current.style.transform = `translateX(${currentX}px)`;
      }

      const percent = Math.floor(currentProgress * 100);
      setProgress(percent);

      const simulatedSpeed = (12 + Math.sin(currentProgress * 8) * 6 + currentProgress * 18).toFixed(1);
      setSpeedText(`${simulatedSpeed} MB/s`);

      if (currentProgress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        finishAnimation();
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const finishAnimation = () => {
    setProgress(100);
    setSpeedText('Delivered');
    setIsBoostExit(true);

    setTimeout(() => {
      setButtonState('completed');
      playSuccessChime();
      triggerRealDownload();
    }, 280);
  };

  const resetToIdle = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    playTactileClick();
    setButtonState('idle');
    setIsBoostExit(false);
    setProgress(0);
    setSpeedText('0.0 MB/s');

    if (truckRef.current) {
      truckRef.current.style.transform = 'translateX(0px)';
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const isCompact = variant === 'compact';

  return (
    <button
      ref={buttonRef}
      onClick={startAnimation}
      className={`neu-truck-button ${buttonState === 'running' ? 'active running' : buttonState} ${isCompact ? 'compact' : ''} ${className}`}
      aria-label={buttonText}
    >
      {/* ── STATE 1: IDLE VIEW ──────────────────────────────── */}
      <div
        className={`w-full h-full flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isCompact ? 'px-4' : 'px-6'
        } ${buttonState !== 'idle' ? 'opacity-0 pointer-events-none hidden' : 'opacity-100 flex'}`}
      >
        <div className="neu-inset-icon shrink-0">
          <Download size={isCompact ? 14 : 18} />
        </div>
        <div className={`font-bold text-white leading-tight whitespace-nowrap ${isCompact ? 'text-xs' : 'text-sm sm:text-base'}`}>
          {buttonText}
        </div>
      </div>

      {/* ── STATE 2: ACTIVE HIGHWAY TRENCH & TRUCK RUN ──────── */}
      <div className={`highway-stage ${buttonState === 'running' ? 'active z-10' : ''}`}>
        {/* Moving dashed lane markings */}
        <div className="road-track-line" />

        {/* Speed HUD readout */}
        {!isCompact && (
          <div className="absolute top-2 right-4 z-30 flex items-center gap-2 text-[10px] font-mono">
            <span className="px-1.5 py-0.5 rounded bg-black/70 text-gray-300 border border-white/10">
              {speedText}
            </span>
            <span className="font-bold text-emerald-400">{progress}%</span>
          </div>
        )}

        {/* Animated Truck Rig with User's Exact Red Delivery Truck Graphic */}
        <div
          ref={truckRef}
          className={`truck-container ${isBoostExit ? 'truck-boost-exit' : ''}`}
        >
          <div className="exhaust-puff" />
          <div className="headlight-cone" />

          {/* SVG Red Delivery Truck matching user's image */}
          <svg className="truck-body-bounce w-full h-full" viewBox="0 0 105 48" fill="none">
            {/* Off-white Cargo Container */}
            <rect x="2" y="8" width="50" height="28" fill="#faf5f5" rx="1" />
            
            {/* Light Lavender/Grey Rear Container Stripe */}
            <rect x="52" y="8" width="12" height="28" fill="#e9ecf2" />

            {/* Dark Crimson Vertical Accent Stripe */}
            <rect x="64" y="11" width="6" height="25" fill="#a10035" />

            {/* Bright Red Cab Shell */}
            <path d="M70 11H88L99 24V36H70V11Z" fill="#ff385c" />

            {/* White Windshield Glass Window */}
            <path d="M76 16H87L95.5 24H76V16Z" fill="#ffffff" />

            {/* Wheel 1 (Rear Left) */}
            <g transform="translate(17, 36)">
              <circle cx="0" cy="0" r="8" fill="#0c4a60" />
              <g className="wheel-rotation">
                <circle cx="0" cy="0" r="3.8" fill="#aee2ea" />
                <circle cx="0" cy="0" r="1.5" fill="#0c4a60" />
              </g>
            </g>

            {/* Wheel 2 (Rear Right) */}
            <g transform="translate(41, 36)">
              <circle cx="0" cy="0" r="8" fill="#0c4a60" />
              <g className="wheel-rotation">
                <circle cx="0" cy="0" r="3.8" fill="#aee2ea" />
                <circle cx="0" cy="0" r="1.5" fill="#0c4a60" />
              </g>
            </g>

            {/* Wheel 3 (Front Cab Wheel) */}
            <g transform="translate(85, 36)">
              <circle cx="0" cy="0" r="8" fill="#0c4a60" />
              <g className="wheel-rotation">
                <circle cx="0" cy="0" r="3.8" fill="#88bdbc" />
                <circle cx="0" cy="0" r="1.5" fill="#0c4a60" />
              </g>
            </g>
          </svg>
        </div>

        {/* Debossed Progress Fill Track */}
        <div className="neu-progress-slot">
          <div className="neu-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* ── STATE 3: COMPLETED SUCCESS STATE ─────────────────── */}
      <div
        className={`completion-stage w-full h-full flex items-center justify-center gap-2.5 px-4 ${
          buttonState === 'completed' ? 'opacity-100 pointer-events-auto z-20 flex' : 'opacity-0 pointer-events-none hidden'
        }`}
      >
        <div className="neu-check-socket shrink-0">
          <svg className={isCompact ? 'w-4 h-4' : 'w-5 h-5'} viewBox="0 0 24 24" fill="none">
            <circle className="tick-circle-fill" cx="12" cy="12" r="10" fill="#10b981" />
            <path
              className="tick-path"
              d="M7 12.5L10.5 16L17 9"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={`font-bold text-emerald-400 whitespace-nowrap ${isCompact ? 'text-xs' : 'text-sm sm:text-base'}`}>
          Downloaded!
        </div>
        <div className="neu-inset-icon shrink-0 ml-1" title="Reset & Download Again">
          <RotateCcw size={isCompact ? 12 : 14} />
        </div>
      </div>
    </button>
  );
}
