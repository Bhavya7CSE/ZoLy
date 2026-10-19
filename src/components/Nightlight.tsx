import React, { useState, useRef, useEffect } from 'react';
import { X, Lamp, Eye, SunMedium } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface NightlightProps {
  onClose: () => void;
}

interface SecretMessage {
  x: number;
  y: number;
  text: string;
  symbol: string;
}

const SECRETS: SecretMessage[] = [
  { x: 20, y: 30, symbol: '❄️', text: 'Zoey leaves tiny ice feathers on sleepy windowpanes' },
  { x: 75, y: 25, symbol: '🌙', text: 'Lily weaves the lavender mist of the night sky' },
  { x: 30, y: 70, symbol: '🫧', text: 'Every bubble holds an unspoken goodnight wish' },
  { x: 80, y: 75, symbol: '✿', text: 'Moonflowers only blossom when the sisters dream together' },
  { x: 50, y: 50, symbol: '✦', text: 'The Lake reflects dreams from all corners of the world' },
];

export const Nightlight: React.FC<NightlightProps> = ({ onClose }) => {
  const [flashlightOn, setFlashlightOn] = useState(true);
  const [revealAll, setRevealAll] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 240, y: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    function render() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (revealAll || !flashlightOn) {
        // Bright mode
        ctx.fillStyle = 'rgba(255, 248, 241, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Dark veil with circular torch cutout
        ctx.fillStyle = 'rgba(10, 16, 32, 0.94)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Flashlight beam
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        const grad = ctx.createRadialGradient(
          pointerRef.current.x,
          pointerRef.current.y,
          10,
          pointerRef.current.x,
          pointerRef.current.y,
          95
        );
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.7, 'rgba(0,0,0,0.85)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pointerRef.current.x, pointerRef.current.y, 95, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [flashlightOn, revealAll]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    pointerRef.current = { x, y };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFF8F1] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2D221E]/10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
          aria-label="Close Moonlight Nightlamp"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <span className="text-3xl">🕯️</span>
          <h2 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#2D221E] mt-1">
            Moonlight Nightlamp
          </h2>
          <p className="text-xs text-[#2D221E]/70 max-w-md mx-auto">
            Move your cursor or finger to illuminate the hidden bedtime secrets in the dark.
          </p>
        </div>

        {/* Nightlight Interactive Scene */}
        <div
          onPointerMove={handlePointerMove}
          className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0a1220] via-[#14233c] to-[#1c2d4a] border border-[#B8DDF8]/30 shadow-inner select-none touch-none cursor-none"
        >
          {/* Hidden layer containing glowing secrets */}
          <div className="absolute inset-0 p-6 pointer-events-none">
            {SECRETS.map((sec, idx) => (
              <div
                key={idx}
                style={{ left: `${sec.x}%`, top: `${sec.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 max-w-[180px] text-center"
              >
                <span className="text-2xl filter drop-shadow">{sec.symbol}</span>
                <span className="text-[11px] font-fairytale text-[#FFF8F1] font-semibold leading-tight drop-shadow-md">
                  {sec.text}
                </span>
              </div>
            ))}
          </div>

          {/* Canvas Darkness Overlay Mask */}
          <canvas
            ref={canvasRef}
            width={480}
            height={320}
            className="absolute inset-0 w-full h-full block"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => {
              setFlashlightOn(!flashlightOn);
              fairytaleAudio.playChime(659.25, 'warm');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              flashlightOn
                ? 'bg-[#F4D98A] text-amber-950 border-amber-400 font-bold'
                : 'bg-stone-100 text-stone-700 border-stone-200'
            }`}
          >
            <Lamp className="w-4 h-4" />
            {flashlightOn ? 'Flashlight ON' : 'Flashlight OFF'}
          </button>

          <button
            onClick={() => {
              setRevealAll(!revealAll);
              fairytaleAudio.playSparkle();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-xs font-medium text-stone-700 transition-all cursor-pointer"
          >
            {revealAll ? <SunMedium className="w-4 h-4 text-amber-500" /> : <Eye className="w-4 h-4 text-[#A43E68]" />}
            {revealAll ? 'Restore Darkness' : 'Reveal All Secrets'}
          </button>
        </div>
      </div>
    </div>
  );
};
