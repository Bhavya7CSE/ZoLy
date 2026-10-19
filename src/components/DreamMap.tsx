import React, { useState } from 'react';
import { X, Send, Sparkles, Navigation } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface DreamMapProps {
  onClose: () => void;
}

export const DreamMap: React.FC<DreamMapProps> = ({ onClose }) => {
  const [destination, setDestination] = useState<'zoey' | 'lily'>('zoey');
  const [dreamMessage, setDreamMessage] = useState('');
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [statusLog, setStatusLog] = useState('Select a destination and send a dream across the moonlit lake.');

  function handleSendDream(e: React.FormEvent) {
    e.preventDefault();
    if (isDelivering) return;

    setIsDelivering(true);
    setDeliveryProgress(0);
    setStatusLog(`Star dispatched towards ${destination === 'zoey' ? "Zoey's Crystal Peak" : "Lily's Aurora Meadow"}...`);
    fairytaleAudio.playSparkle();

    const interval = setInterval(() => {
      setDeliveryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDelivering(false);
          setStatusLog(
            `✨ Dream arrived safely at ${
              destination === 'zoey' ? "Zoey's Crystal Kingdom" : "Lily's Aurora Kingdom"
            }! The sisters felt your wish.`
          );
          setDreamMessage('');
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  }

  // Calculate star position along the curve based on progress
  const curveT = deliveryProgress / 100;
  // Bezier curve: P0(90, 110), P1(240, 40), P2(390, 110)
  const starX = (1 - curveT) * (1 - curveT) * (destination === 'zoey' ? 390 : 90) +
                2 * (1 - curveT) * curveT * 240 +
                curveT * curveT * (destination === 'zoey' ? 90 : 390);
  const starY = (1 - curveT) * (1 - curveT) * 110 +
                2 * (1 - curveT) * curveT * 40 +
                curveT * curveT * 110;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFF8F1] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2D221E]/10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
          aria-label="Close Dream Delivery Map"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <span className="text-3xl">🗺️</span>
          <h2 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#2D221E] mt-1">
            Dream Delivery Map
          </h2>
          <p className="text-xs text-[#2D221E]/70 max-w-md mx-auto">
            SVG flight paths coordinating dreams across the moonlit divide.
          </p>
        </div>

        {/* SVG Interactive Map Scene */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e1b2f] via-[#162744] to-[#0a1220] p-2 shadow-inner border border-[#B8DDF8]/30 mb-5">
          <svg viewBox="0 0 480 200" className="w-full h-auto" aria-label="Celestial Map of Kingdoms">
            <defs>
              <linearGradient id="lakeWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a3060" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0a1220" stopOpacity="0.95" />
              </linearGradient>
              <radialGradient id="moonGlowSvg" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FFF8F1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F4D98A" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="routePathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8DDF8" />
                <stop offset="50%" stopColor="#F4D98A" />
                <stop offset="100%" stopColor="#D8C5F5" />
              </linearGradient>
            </defs>

            {/* Moon in sky */}
            <circle cx="240" cy="35" r="22" fill="url(#moonGlowSvg)" />
            <circle cx="240" cy="35" r="16" fill="#FFF8F1" />
            <circle cx="245" cy="32" r="14" fill="#0e1b2f" opacity="0.12" />

            {/* Moonlit water */}
            <rect x="0" y="100" width="480" height="100" fill="url(#lakeWater)" />
            <ellipse cx="240" cy="120" rx="45" ry="10" fill="#FFF8F1" opacity="0.3" />

            {/* Zoey's Mountains (Left) */}
            <polygon points="10,100 50,45 90,100" fill="#2a5080" />
            <polygon points="50,100 80,60 110,100" fill="#3a6090" />
            <polygon points="50,45 42,58 58,58" fill="#B8DDF8" />
            <text x="60" y="125" fill="#B8DDF8" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              Zoey's Kingdom ❄️
            </text>

            {/* Lily's Hills (Right) */}
            <polygon points="370,100 410,48 450,100" fill="#4a2070" />
            <polygon points="400,100 435,62 470,100" fill="#5a3080" />
            <ellipse cx="410" cy="40" rx="35" ry="8" fill="#D8C5F5" opacity="0.4" />
            <text x="420" y="125" fill="#D8C5F5" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
              Lily's Kingdom 🌙
            </text>

            {/* The Celestial Path */}
            <path
              d="M 90 110 Q 240 40 390 110"
              fill="none"
              stroke="url(#routePathGrad)"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              opacity="0.8"
            />

            {/* Animated Traveler Star */}
            {isDelivering && (
              <g transform={`translate(${starX}, ${starY})`}>
                <circle r="8" fill="#F4D98A" className="animate-ping" opacity="0.7" />
                <circle r="5" fill="#FFF8F1" />
                <text x="0" y="3" fontSize="8" textAnchor="middle" fill="#A43E68">✦</text>
              </g>
            )}
          </svg>
        </div>

        {/* Dispatch Controls */}
        <form onSubmit={handleSendDream} className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setDestination('zoey')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                destination === 'zoey'
                  ? 'bg-[#B8DDF8] text-[#182635] border-[#4a9be8] font-bold shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              ❄️ Send to Zoey
            </button>
            <button
              type="button"
              onClick={() => setDestination('lily')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                destination === 'lily'
                  ? 'bg-[#D8C5F5] text-[#2d1b38] border-[#8a5cb8] font-bold shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              🌙 Send to Lily
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={dreamMessage}
              onChange={(e) => setDreamMessage(e.target.value)}
              placeholder="Whisper a wish or dream into the star..."
              maxLength={70}
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#A43E68]"
            />
            <button
              type="submit"
              disabled={isDelivering}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A43E68] hover:bg-[#8f3258] disabled:opacity-50 text-white font-medium text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Launch</span>
            </button>
          </div>

          {/* Delivery progress bar */}
          {isDelivering && (
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#B8DDF8] via-[#F4D98A] to-[#D8C5F5] h-full transition-all duration-100"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          )}

          <p className="text-xs text-stone-600 font-mono-tech text-center" aria-live="polite">
            {statusLog}
          </p>
        </form>
      </div>
    </div>
  );
};
