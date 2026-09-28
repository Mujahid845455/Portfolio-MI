'use client';

import {
  useRef, useState, useCallback, ReactNode,
} from 'react';
import { useSpring, animated, to } from '@react-spring/web';

/* ─────────────────────────────────────────────────────────────
   Props
───────────────────────────────────────────────────────────── */
interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  width?: number | string;
  height?: number | string;
  radius?: number;
  axis?: 'x' | 'y';
  perspective?: number;
  flipOnClick?: boolean;
  draggable?: boolean;
  dragDistance?: number;       // px to trigger flip
  tilt?: boolean;
  tiltMax?: number;       // degrees
  glare?: boolean;
  glareOpacity?: number;
  hoverScale?: number;
  stiffness?: number;
  damping?: number;
  background?: string;
  color?: string;
  shadow?: boolean;
  shadowColor?: string;
  shadowOpacity?: number;
  onFlipChange?: (flipped: boolean) => void;
  className?: string;
}

/* ─────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────── */
export default function FlipCard({
  front,
  back,
  width = '100%',
  height = 420,
  radius = 20,
  axis = 'y',
  perspective = 1100,
  flipOnClick = true,
  draggable = true,
  dragDistance = 60,
  tilt = true,
  tiltMax = 12,
  glare = true,
  glareOpacity = 0.22,
  hoverScale = 1.04,
  stiffness = 170,
  damping = 20,
  background = '#0d1117',
  color = '#f5f5f5',
  shadow = true,
  shadowColor = '#000000',
  shadowOpacity = 0.45,
  onFlipChange,
  className = '',
}: FlipCardProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  /* ── spring for flip + tilt ────────────────────────────── */
  const [{ rotateX, rotateY, scale, glareBg }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareBg: '0deg',
    config: { stiffness, damping },
  }));

  /* ── flip state setter ─────────────────────────────────── */
  const flip = useCallback((next: boolean) => {
    setFlipped(next);
    onFlipChange?.(next);
    api.start({
      rotateY: next && axis === 'y' ? 180 : 0,
      rotateX: next && axis === 'x' ? 180 : 0,
    });
  }, [api, axis, onFlipChange]);

  /* ── mouse enter ───────────────────────────────────────── */
  const handleMouseEnter = () => {
    setHovering(true);
    api.start({ scale: hoverScale });
  };

  /* ── mouse move (tilt + glare) ─────────────────────────── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 → +1
    const dy = (e.clientY - cy) / (rect.height / 2);

    const ry = dx * tiltMax;
    const rx = -dy * tiltMax;

    // glare angle
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const targetRotateY = (flipped && axis === 'y' ? 180 : 0) + ry;
    const targetRotateX = (flipped && axis === 'x' ? 180 : 0) + (flipped && axis === 'y' ? -rx : rx);

    api.start({
      rotateX: targetRotateX,
      rotateY: targetRotateY,
      glareBg: `${angle + 90}deg`,
    });
  }, [api, tilt, tiltMax, flipped, axis]);

  /* ── mouse leave ───────────────────────────────────────── */
  const handleMouseLeave = () => {
    setHovering(false);
    api.start({
      rotateX: flipped && axis === 'x' ? 180 : 0,
      rotateY: flipped && axis === 'y' ? 180 : 0,
      scale: 1,
    });
  };

  /* ── click to flip ─────────────────────────────────────── */
  const handleClick = () => {
    if (!flipOnClick) return;
    flip(!flipped);
  };

  /* ── drag to flip ──────────────────────────────────────── */
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggable || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const dist = axis === 'y' ? Math.abs(dx) : Math.abs(dy);
    if (dist > (dragDistance ?? 60)) {
      const sign = axis === 'y' ? dx : dy;
      if (!flipped && sign < 0) flip(true);
      if (flipped && sign > 0) flip(false);
    }
    dragStart.current = null;
  };

  /* ── shadow string ─────────────────────────────────────── */
  const hex = shadowColor ?? '#000';
  const op = shadowOpacity ?? 0.45;
  const shadowCSS = shadow
    ? `0 30px 70px 0 ${hex}${Math.round(op * 255).toString(16).padStart(2, '0')}`
    : 'none';

  /* ── face style ────────────────────────────────────────── */
  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: radius,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    background,
    color,
    boxShadow: hovering ? shadowCSS : 'none',
    transition: 'box-shadow 0.3s ease',
  };

  return (
    <div
      ref={containerRef}
      className={`flip-card-root ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        perspective: `${perspective}px`,
        cursor: flipOnClick ? 'pointer' : 'default',
        userSelect: 'none',
        touchAction: 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Animated wrapper */}
      <animated.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: to(
            [rotateX, rotateY, scale],
            (rx, ry, s) => `rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
          ),
        }}
      >
        {/* FRONT */}
        <div style={faceStyle}>
          {front}

          {/* Glare */}
          {glare && (
            <animated.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: radius,
                pointerEvents: 'none',
                background: glareBg.to(
                  angle => `linear-gradient(${angle}, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`
                ),
                opacity: hovering ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            />
          )}
        </div>

        {/* BACK */}
        <div
          style={{
            ...faceStyle,
            transform: axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)',
          }}
        >
          {back}

          {/* Glare back */}
          {glare && (
            <animated.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: radius,
                pointerEvents: 'none',
                background: glareBg.to(
                  angle => `linear-gradient(${angle}, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`
                ),
                opacity: hovering ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            />
          )}
        </div>
      </animated.div>
    </div>
  );
}

