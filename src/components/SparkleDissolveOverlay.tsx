import React, { useEffect, useRef } from 'react';

interface SparkleDissolveOverlayProps {
  targetWorld: 'zoey' | 'lily' | 'home' | null;
  onMidpoint?: () => void;
  onComplete: () => void;
}

export const SparkleDissolveOverlay: React.FC<SparkleDissolveOverlayProps> = ({
  targetWorld,
  onMidpoint,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const midpointFiredRef = useRef(false);

  useEffect(() => {
    if (!targetWorld) return;
    midpointFiredRef.current = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      rotation: number;
      vr: number;
      type: 'star' | 'bubble' | 'spark';
    }[] = [];

    // Kingdom specific palette
    const isZoey = targetWorld === 'zoey';
    const isLily = targetWorld === 'lily';
    const colors = isZoey
      ? ['#B8DDF8', '#D0EAFF', '#FFFFFF', '#E2F1FC', '#8ec9f6', '#9dd5fc']
      : isLily
      ? ['#D8C5F5', '#FCE7F3', '#F4D98A', '#E9D5FF', '#b795ea', '#f8d2e8']
      : ['#B8DDF8', '#D8C5F5', '#F4D98A', '#FFF8F1', '#FCE7F3'];

    // Spawn 140 sparkle dissolve particles radiating outwards
    const originX = isZoey ? canvas.width * 0.35 : isLily ? canvas.width * 0.65 : canvas.width * 0.5;
    const originY = canvas.height * 0.5;

    for (let i = 0; i < 140; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 12;
      const typeRand = Math.random();
      particles.push({
        x: originX + (Math.random() - 0.5) * 80,
        y: originY + (Math.random() - 0.5) * 80,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        rotation: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        type: typeRand < 0.65 ? 'star' : typeRand < 0.85 ? 'bubble' : 'spark',
      });
    }

    let progress = 0;
    let animId: number;

    function render() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      progress += 0.022;

      // Check midpoint trigger for smooth seamless view swap
      if (progress >= 0.45 && !midpointFiredRef.current) {
        midpointFiredRef.current = true;
        onMidpoint?.();
      }

      // Soft radiant flash
      const flashAlpha = Math.sin(Math.min(progress, 1) * Math.PI) * 0.65;
      const bgGrad = ctx.createRadialGradient(
        originX,
        originY,
        20,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.75
      );

      if (isZoey) {
        bgGrad.addColorStop(0, `rgba(226, 241, 252, ${flashAlpha * 0.9})`);
        bgGrad.addColorStop(0.5, `rgba(184, 221, 248, ${flashAlpha * 0.7})`);
        bgGrad.addColorStop(1, `rgba(255, 248, 241, 0)`);
      } else if (isLily) {
        bgGrad.addColorStop(0, `rgba(252, 231, 243, ${flashAlpha * 0.9})`);
        bgGrad.addColorStop(0.5, `rgba(216, 197, 245, ${flashAlpha * 0.7})`);
        bgGrad.addColorStop(1, `rgba(255, 248, 241, 0)`);
      } else {
        bgGrad.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha * 0.95})`);
        bgGrad.addColorStop(0.6, `rgba(255, 248, 241, ${flashAlpha * 0.6})`);
        bgGrad.addColorStop(1, `rgba(255, 248, 241, 0)`);
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render sparkles and crystals
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.alpha -= 0.018;
        p.rotation += p.vr;

        if (p.alpha <= 0) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;

        if (p.type === 'star') {
          // 4-point Fairytale Star
          ctx.beginPath();
          const r = p.size;
          ctx.moveTo(0, -r);
          ctx.lineTo(r * 0.28, -r * 0.28);
          ctx.lineTo(r, 0);
          ctx.lineTo(r * 0.28, r * 0.28);
          ctx.lineTo(0, r);
          ctx.lineTo(-r * 0.28, r * 0.28);
          ctx.lineTo(-r, 0);
          ctx.lineTo(-r * 0.28, -r * 0.28);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'bubble') {
          // Iridescent bubble ring
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.fill();
        } else {
          // Diamond spark
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      if (progress < 1.0) {
        animId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    }

    animId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animId);
  }, [targetWorld]);

  if (!targetWorld) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none transition-opacity duration-300"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
