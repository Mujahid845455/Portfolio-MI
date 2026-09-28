'use client';

import { useEffect, useRef } from 'react';

export default function PlexusNameAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // ─── Config ───────────────────────────────────────────────────────────────
    const CONNECTION_DISTANCE   = 80;
    const EXTRA_BG_PARTICLES    = 100;
    const TEXT_STEP             = 14;   // spacing between sampled text dots
    const TOGGLE_INTERVAL_MS    = 5000; // 5s — same as reference
    const BURST_SLOW_DELAY_MS   = 1000; // 1s burst before slow-down

    // ─── State ────────────────────────────────────────────────────────────────
    let particlesArray: Particle[] = [];
    let isFormingText = false;
    let rafId: number;
    let intervalId: ReturnType<typeof setInterval>;
    let burstTimeout: ReturnType<typeof setTimeout>;

    // ─── Particle class (mirroring the reference exactly) ────────────────────
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      targetX: number;
      targetY: number;
      isBackgroundNode: boolean;

      constructor(isBackgroundNode = false) {
        const w = canvas ? canvas.width : window.innerWidth;
        const h = canvas ? canvas.height : window.innerHeight;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.targetX = this.x;
        this.targetY = this.y;
        this.isBackgroundNode = isBackgroundNode;
      }

      update() {
        if (isFormingText && !this.isBackgroundNode) {
          // Spring toward text target
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.x += dx * 0.05;
          this.y += dy * 0.05;
        } else {
          // Float freely (background nodes always, text nodes when dissolving)
          this.x += this.speedX;
          this.y += this.speedY;
          const w = canvas ? canvas.width : window.innerWidth;
          const h = canvas ? canvas.height : window.innerHeight;
          if (this.x > w || this.x < 0) this.speedX = -this.speedX;
          if (this.y > h || this.y < 0) this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        // Glow halo
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
        glow.addColorStop(0,   'rgba(0, 255, 255, 0.6)');
        glow.addColorStop(0.4, 'rgba(0, 200, 255, 0.2)');
        glow.addColorStop(1,   'rgba(0,  80, 200, 0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.fillStyle = 'rgba(0, 255, 255, 0.85)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ─── Sample text pixels (offscreen so it never pollutes main canvas) ──────
    function getTextCoordinates(): { x: number; y: number }[] {
      if (!canvas) return [];
      const off = document.createElement('canvas');
      off.width  = canvas.width;
      off.height = canvas.height;
      const oc   = off.getContext('2d');
      if (!oc) return [];

      const fontSize = Math.min(canvas.width / 12, 100);
      oc.fillStyle    = 'white';
      oc.font         = `bold ${fontSize}px Arial`;
      oc.textAlign    = 'center';
      oc.textBaseline = 'middle';
      oc.fillText('MUJAHIDUL', canvas.width / 2, canvas.height / 2 - fontSize * 0.6);
      oc.fillText('ISLAM',     canvas.width / 2, canvas.height / 2 + fontSize * 0.6);

      const { data, width, height } = oc.getImageData(0, 0, canvas.width, canvas.height);
      const coords: { x: number; y: number }[] = [];

      for (let y = 0; y < height; y += TEXT_STEP) {
        for (let x = 0; x < width; x += TEXT_STEP) {
          if (data[(y * width + x) * 4 + 3] > 128) {
            coords.push({ x, y });
          }
        }
      }
      return coords;
    }

    // ─── Init ─────────────────────────────────────────────────────────────────
    function init() {
      particlesArray = [];
      const textCoordinates = getTextCoordinates();

      // Text-forming particles
      textCoordinates.forEach((coord) => {
        const p = new Particle(false);
        p.targetX = coord.x;
        p.targetY = coord.y;
        particlesArray.push(p);
      });

      // Always-floating background particles
      for (let i = 0; i < EXTRA_BG_PARTICLES; i++) {
        particlesArray.push(new Particle(true));
      }
    }

    // ─── Animate ──────────────────────────────────────────────────────────────
    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Connections
        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx   = particlesArray[i].x - particlesArray[j].x;
          const dy   = particlesArray[i].y - particlesArray[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.4;
            ctx.strokeStyle = `rgba(0, 220, 255, ${opacity})`;
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    // ─── Toggle every 5s — exactly like the reference ─────────────────────────
    intervalId = setInterval(() => {
      isFormingText = !isFormingText;

      if (!isFormingText) {
        // Burst speed when dissolving
        particlesArray.forEach((p) => {
          if (!p.isBackgroundNode) {
            p.speedX = (Math.random() - 0.5) * 2;
            p.speedY = (Math.random() - 0.5) * 2;
          }
        });

        // After 1 second, slow back down
        burstTimeout = setTimeout(() => {
          particlesArray.forEach((p) => {
            if (!p.isBackgroundNode) {
              p.speedX = (Math.random() - 0.5) * 0.4;
              p.speedY = (Math.random() - 0.5) * 0.4;
            }
          });
        }, BURST_SLOW_DELAY_MS);
      }
    }, TOGGLE_INTERVAL_MS);

    // ─── Resize ───────────────────────────────────────────────────────────────
    function handleResize() {
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
      clearTimeout(burstTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
