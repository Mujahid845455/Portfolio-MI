'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');

  // Prevent body scroll during loading
  useEffect(() => {
    if (phase === 'loading') {
      document.body.style.overflow = 'hidden';
    } else if (phase === 'done') {
      document.body.style.overflow = '';
    }
  }, [phase]);

  const handleAnimationComplete = () => {
    // Start fade-out of loading screen
    setPhase('fading');
    // After fade transition ends, fully remove loading screen
    setTimeout(() => setPhase('done'), 900);
  };

  return (
    <>
      {/* Loading Screen — fades out after animation */}
      {phase !== 'done' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            opacity: phase === 'fading' ? 0 : 1,
            transition: 'opacity 0.9s ease-in-out',
            pointerEvents: phase === 'fading' ? 'none' : 'auto',
          }}
        >
          <LoadingScreen onComplete={handleAnimationComplete} />
        </div>
      )}

      {/* Actual Page Content — fades in as loading screen fades out */}
      <div
        style={{
          opacity: phase === 'loading' ? 0 : 1,
          transition: 'opacity 0.9s ease-in-out',
          transitionDelay: phase === 'done' ? '0s' : '0.4s',
        }}
      >
        {children}
      </div>
    </>
  );
}
