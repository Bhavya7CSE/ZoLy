import React, { useEffect, useRef, useState } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  vx: number;
  vy: number;
  shape: 'snowflake' | 'petal' | 'star';
}

interface CustomCursorProps {
  currentView?: 'entrance' | 'zoey-world' | 'lily-world';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ currentView = 'entrance' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const particlesRef = useRef<TrailParticle[]>([]);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const viewRef = useRef(currentView);

  useEffect(() => {
    viewRef.current = currentView;
  }, [currentView]);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop/mouse)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function handleMouseMove(e: MouseEvent) {
      setIsVisible(true);
      lastPosRef.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }

      // World-specific particle palettes
      if (!prefersReducedMotion) {
        let palette = ['#B8DDF8', '#D8C5F5', '#F4D98A', '#FCE7F3', '#FFF8F1'];
        let shape: 'snowflake' | 'petal' | 'star' = 'star';

        if (viewRef.current === 'zoey-world') {
          palette = ['#B8DDF8', '#D0EAFF', '#FFFFFF', '#E2F1FC'];
          shape = 'snowflake';
        } else if (viewRef.current === 'lily-world') {
          palette = ['#D8C5F5', '#FCE7F3', '#F4D98A', '#E9D5FF'];
          shape = 'petal';
        }

        for (let i = 0; i < 2; i++) {
          const color = palette[Math.floor(Math.random() * palette.length)];
          particlesRef.current.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            size: 2.5 + Math.random() * 3.5,
            color,
            alpha: 1.0,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.4,
            shape,
          });
        }
      }
    }

    function handleMouseLeave() {
      setIsVisible(false);
    }

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;
    function render() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.035;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size < 0.5) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        const r = p.size;

        if (p.shape === 'snowflake') {
          // 6-arm icy snowflake particle
          ctx.arc(p.x, p.y, r * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          for (let arm = 0; arm < 3; arm++) {
            ctx.moveTo(p.x - r, p.y);
            ctx.lineTo(p.x + r, p.y);
            ctx.stroke();
          }
        } else if (p.shape === 'petal') {
          // Soft moonflower petal particle
          ctx.ellipse(p.x, p.y, r * 1.2, r * 0.6, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // 4-point celestial star
          ctx.moveTo(p.x, p.y - r);
          ctx.lineTo(p.x + r * 0.35, p.y - r * 0.35);
          ctx.lineTo(p.x + r, p.y);
          ctx.lineTo(p.x + r * 0.35, p.y + r * 0.35);
          ctx.lineTo(p.x, p.y + r);
          ctx.lineTo(p.x - r * 0.35, p.y + r * 0.35);
          ctx.lineTo(p.x - r, p.y);
          ctx.lineTo(p.x - r * 0.35, p.y - r * 0.35);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const isZoeyWorld = currentView === 'zoey-world';
  const isLilyWorld = currentView === 'lily-world';

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 hidden md:block"
        style={{ mixBlendMode: 'screen' }}
      />

      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-50 -ml-2.5 -mt-2.5 hidden md:block transition-opacity duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`relative transition-transform duration-100 ${
            isPointer ? 'scale-125 -rotate-12' : 'scale-100'
          }`}
        >
          {/* World-Specific Wand Cursor Tip */}
          {isZoeyWorld ? (
            /* Zoey's Crystal Snowflake Wand */
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="filter drop-shadow-[0_2px_6px_rgba(74,155,232,0.6)]"
            >
              <circle cx="12" cy="12" r="4" fill="#B8DDF8" stroke="#4a9be8" strokeWidth="1.5" />
              <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" stroke="#4a9be8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : isLilyWorld ? (
            /* Lily's Crescent Moonflower Wand */
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="filter drop-shadow-[0_2px_6px_rgba(138,92,184,0.6)]"
            >
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                fill="#D8C5F5"
                stroke="#8a5cb8"
                strokeWidth="1.5"
              />
              <circle cx="15" cy="8" r="2.5" fill="#F4D98A" />
            </svg>
          ) : (
            /* Shared Celestial Star Wand */
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="filter drop-shadow-[0_2px_4px_rgba(164,62,104,0.4)]"
            >
              <path
                d="M12 2L14.2 8.5L21 9.5L16 14.2L17.5 21L12 17.5L6.5 21L8 14.2L3 9.5L9.8 8.5L12 2Z"
                fill={isPointer ? '#F4D98A' : '#FFF8F1'}
                stroke="#A43E68"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="2" fill="#A43E68" />
            </svg>
          )}

          {/* Halo ring on hover */}
          <div
            className={`absolute -inset-1 rounded-full border opacity-50 animate-ping ${
              isZoeyWorld
                ? 'border-[#B8DDF8]'
                : isLilyWorld
                ? 'border-[#D8C5F5]'
                : 'border-[#F4D98A]'
            } ${isPointer ? 'block' : 'hidden'}`}
          />
        </div>
      </div>
    </>
  );
};
