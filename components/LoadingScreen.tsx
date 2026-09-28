'use client';

import { useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ── Background Stars ──────────────────────────────────────────────────────
    interface BGStar { x: number; y: number; size: number; alpha: number; alphaChange: number }
    const bgStars: BGStar[] = [];
    for (let i = 0; i < 220; i++) {
      bgStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        alpha: Math.random(),
        alphaChange: (Math.random() * 0.02) - 0.01,
      });
    }

    // ── State ─────────────────────────────────────────────────────────────────
    let particlesArray: Particle[] = [];
    let letterCenters: { x: number; y: number }[] = [];
    let totalLettersCount = 0;
    let revealedLetters: boolean[] = [];
    let currentTargetLetterIndex = 0;
    let isHoldingFullText = false;
    let holdStartTime = 0;
    let completionTriggered = false;

    // ── Sample Text Data ──────────────────────────────────────────────────────
    function getTextData() {
      if (!canvas || !ctx) return [];
      const coords: { x: number; y: number; letterIndex: number }[] = [];
      letterCenters = [];

      const words = ['MUJAHIDUL', 'ISLAM'];
      const fontSize = Math.min(canvas.width / 12, 90);
      ctx.font = `900 ${fontSize}px "Arial Black", Arial, sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      const yOffsets = [-fontSize * 0.65, fontSize * 0.65];
      let globalLetterIndex = 0;
      const step = 13;

      words.forEach((word, wIdx) => {
        const totalWidth = ctx.measureText(word).width;
        let startX = (canvas.width - totalWidth) / 2;
        const yPos = canvas.height / 2 + yOffsets[wIdx];

        for (let i = 0; i < word.length; i++) {
          const char = word[i];
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = 'white';
          ctx.fillText(char, startX, yPos);

          const charWidth = ctx.measureText(char).width;
          const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          letterCenters.push({ x: startX + charWidth / 2, y: yPos });

          for (let y = 0; y < textData.height; y += step) {
            for (let x = 0; x < textData.width; x += step) {
              if (textData.data[(y * textData.width + x) * 4 + 3] > 128) {
                coords.push({ x, y, letterIndex: globalLetterIndex });
              }
            }
          }
          startX += charWidth;
          globalLetterIndex++;
        }
      });

      totalLettersCount = globalLetterIndex;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return coords;
    }

    // ── Impact Sparks ─────────────────────────────────────────────────────────
    const sparks: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];

    function createSparks(x: number, y: number) {
      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          size: Math.random() * 2 + 1,
        });
      }
    }

    // ── Targeted Shooting Star ────────────────────────────────────────────────
    interface StarObj {
      x: number; y: number;
      targetX: number; targetY: number;
      letterIndex: number;
      speed: number;
      reached: boolean;
    }
    let currentStar: StarObj | null = null;

    function createStar(targetX: number, targetY: number, letterIndex: number): StarObj {
      const offsetDistance = 500;
      const angle = Math.PI * 0.25;
      return {
        x: targetX - Math.cos(angle) * offsetDistance,
        y: targetY - Math.sin(angle) * offsetDistance,
        targetX, targetY, letterIndex,
        speed: 24,
        reached: false,
      };
    }

    function updateStar(star: StarObj) {
      const dx = star.targetX - star.x;
      const dy = star.targetY - star.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= star.speed) {
        star.x = star.targetX;
        star.y = star.targetY;
        star.reached = true;
        revealedLetters[star.letterIndex] = true;
        createSparks(star.targetX, star.targetY);
      } else {
        star.x += (dx / dist) * star.speed;
        star.y += (dy / dist) * star.speed;
      }
    }

    function drawStar(star: StarObj) {
      if (!ctx) return;
      const dx = star.targetX - star.x;
      const dy = star.targetY - star.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const trailX = star.x - (dx / (dist || 1)) * 90;
      const trailY = star.y - (dy / (dist || 1)) * 90;

      const grad = ctx.createLinearGradient(star.x, star.y, trailX, trailY);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, 'rgba(0,255,255,0.8)');
      grad.addColorStop(1, 'transparent');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(trailX, trailY);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00ffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── Particles ─────────────────────────────────────────────────────────────
    interface Particle {
      x: number; y: number;
      size: number;
      speedX: number; speedY: number;
      targetX?: number; targetY?: number;
      letterIndex: number;
    }

    function createParticle(targetInfo?: { x: number; y: number; letterIndex: number }): Particle {
      const w = canvas ? canvas.width : window.innerWidth;
      const h = canvas ? canvas.height : window.innerHeight;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 5,
        speedY: (Math.random() - 0.5) * 5,
        targetX: targetInfo?.x,
        targetY: targetInfo?.y,
        letterIndex: targetInfo?.letterIndex ?? -1,
      };
    }

    function updateParticle(p: Particle) {
      if (p.letterIndex !== -1 && revealedLetters[p.letterIndex]) {
        p.x += (p.targetX! - p.x) * 0.12;
        p.y += (p.targetY! - p.y) * 0.12;
      } else {
        p.x += p.speedX;
        p.y += p.speedY;
        const w = canvas ? canvas.width : window.innerWidth;
        const h = canvas ? canvas.height : window.innerHeight;
        if (p.x > w || p.x < 0) p.speedX = -p.speedX;
        if (p.y > h || p.y < 0) p.speedY = -p.speedY;
      }
    }

    function drawParticle(p: Particle) {
      if (!ctx) return;
      const active = p.letterIndex !== -1 && revealedLetters[p.letterIndex];
      ctx.fillStyle = active ? 'rgba(0,255,255,1)' : 'rgba(0,255,255,0.4)';
      ctx.shadowBlur = active ? 10 : 0;
      ctx.shadowColor = '#00ffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    function init() {
      particlesArray = [];
      revealedLetters = [];
      const textCoords = getTextData();
      for (let i = 0; i < totalLettersCount; i++) revealedLetters.push(false);
      textCoords.forEach(c => particlesArray.push(createParticle(c)));
      for (let i = 0; i < 90; i++) particlesArray.push(createParticle());
      currentTargetLetterIndex = 0;
      currentStar = null;
      isHoldingFullText = false;
    }

    // ── Animation Loop ────────────────────────────────────────────────────────
    let rafId: number;
    let lastStarTime = Date.now();

    function animate() {
      if (!canvas || !ctx) return;
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Background stars
      bgStars.forEach(s => {
        s.alpha += s.alphaChange;
        if (s.alpha <= 0.1 || s.alpha >= 1) s.alphaChange *= -1;
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Star spawning
      const now = Date.now();
      if (!isHoldingFullText) {
        if (!currentStar && currentTargetLetterIndex < totalLettersCount) {
          if (now - lastStarTime > 250) {
            const target = letterCenters[currentTargetLetterIndex];
            currentStar = createStar(target.x, target.y, currentTargetLetterIndex);
            currentTargetLetterIndex++;
            lastStarTime = now;
          }
        }
      } else {
        // Hold for 2s then trigger completion (user sees name, then page loads)
        if (now - holdStartTime > 2000 && !completionTriggered) {
          completionTriggered = true;
          onComplete(); // Signal parent to fade out
        }
      }

      // 3. Current star
      if (currentStar) {
        updateStar(currentStar);
        drawStar(currentStar);
        if (currentStar.reached) {
          currentStar = null;
          if (currentTargetLetterIndex >= totalLettersCount) {
            isHoldingFullText = true;
            holdStartTime = Date.now();
          }
        }
      }

      // 4. Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy; s.alpha -= 0.04;
        ctx.fillStyle = `rgba(0,255,255,${Math.max(s.alpha, 0)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        if (s.alpha <= 0) sparks.splice(i, 1);
      }

      // 5. Particles + connections
      for (let i = 0; i < particlesArray.length; i++) {
        updateParticle(particlesArray[i]);
        drawParticle(particlesArray[i]);

        for (let j = i + 1; j < particlesArray.length; j++) {
          const p1 = particlesArray[i];
          const p2 = particlesArray[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const p1Active = p1.letterIndex !== -1 && revealedLetters[p1.letterIndex];
          const p2Active = p2.letterIndex !== -1 && revealedLetters[p2.letterIndex];
          const maxDist = (p1Active && p2Active) ? 24 : 95;

          if (distance < maxDist) {
            const opacity = 1 - distance / maxDist;
            const lineAlpha = (p1Active && p2Active) ? opacity * 0.9 : opacity * 0.25;
            ctx.strokeStyle = `rgba(0,255,255,${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'block',
        background: '#050816',
      }}
    />
  );
}
