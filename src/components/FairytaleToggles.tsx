import React, { useState } from 'react';
import { fairytaleAudio } from '../audio/synthEngine';

interface CelestialThemeToggleProps {
  isNight: boolean;
  onToggle: () => void;
}

export const CelestialThemeToggle: React.FC<CelestialThemeToggleProps> = ({ isNight, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="group relative flex items-center justify-center p-2 rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-md border border-[#2D221E]/15 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      title={isNight ? 'Sun emerges from behind crescent moon (Switch to Day)' : 'Sun slides behind crescent moon (Switch to Night)'}
      aria-label={isNight ? 'Switch to daylight - sun emerges from crescent moon' : 'Switch to moonlit night - sun slides behind crescent moon'}
    >
      <div className="relative w-14 h-8 flex items-center justify-between px-1 bg-gradient-to-r from-[#FFF8F1] to-[#E2F1FC] rounded-full border border-[#D8C5F5]/60 shadow-inner overflow-hidden">
        {/* Animated Sun Object */}
        <div
          className={`absolute top-1.5 w-5 h-5 rounded-full bg-gradient-to-tr from-[#F4D98A] to-[#ffb347] shadow-[0_0_8px_rgba(244,217,138,0.8)] transition-all duration-700 ease-in-out ${
            isNight
              ? 'left-7 opacity-20 scale-75 translate-x-1'
              : 'left-1.5 opacity-100 scale-100'
          }`}
        >
          {/* Sun rays aura */}
          <div className="absolute inset-0 rounded-full animate-spin duration-3000 opacity-60 border border-dashed border-amber-300" />
        </div>

        {/* Crescent Moon Object */}
        <div
          className={`absolute top-1.5 w-5 h-5 transition-all duration-700 ease-in-out ${
            isNight
              ? 'left-7 scale-110 drop-shadow-[0_0_8px_rgba(216,197,245,0.9)]'
              : 'left-7 opacity-30 scale-90'
          }`}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#8a5cb8] stroke-[#D8C5F5] stroke-1">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>

        {/* Tiny stars in night mode */}
        <span
          className={`absolute left-2 text-[9px] text-[#A43E68] transition-opacity duration-500 ${
            isNight ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
        >
          ✦
        </span>
      </div>
      <span className="sr-only">Toggle Day and Night</span>
    </button>
  );
};

interface MagicWandToggleProps {
  onBurst: () => void;
}

export const MagicWandToggle: React.FC<MagicWandToggleProps> = ({ onBurst }) => {
  const [isRotating, setIsRotating] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  function handleClick() {
    setIsRotating(true);
    fairytaleAudio.playSparkle();
    onBurst();

    // Spawn 5 burst sparkle stars
    const newSparkles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 36,
      y: -10 - Math.random() * 24,
    }));
    setSparkles(newSparkles);

    setTimeout(() => {
      setIsRotating(false);
      setSparkles([]);
    }, 900);
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex items-center justify-center p-2 rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-md border border-[#2D221E]/15 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      title="Twirl magic wand to release celestial sparkles"
      aria-label="Twirl magic wand to release celestial sparkles"
    >
      <div className="relative w-9 h-8 flex items-center justify-center">
        {/* Physical Wand Object that rotates 360deg */}
        <div
          className={`relative transition-transform duration-700 ease-out origin-center ${
            isRotating ? 'rotate-[360deg] scale-125' : 'group-hover:rotate-12'
          }`}
        >
          {/* Wand shaft */}
          <div className="w-1 h-6 bg-gradient-to-t from-[#B8DDF8] via-[#F4D98A] to-white rounded-full shadow-xs" />
          {/* Wand star head */}
          <div className="absolute -top-1.5 -left-1.5 text-[#F4D98A] filter drop-shadow-[0_0_6px_rgba(244,217,138,0.9)] text-xs">
            ✦
          </div>
        </div>

        {/* Released floating sparkles */}
        {sparkles.map((sp) => (
          <span
            key={sp.id}
            style={{ transform: `translate(${sp.x}px, ${sp.y}px)` }}
            className="absolute text-[10px] text-[#A43E68] pointer-events-none animate-ping duration-700 font-bold"
          >
            ✧
          </span>
        ))}
      </div>
      <span className="sr-only">Twirl Magic Wand</span>
    </button>
  );
};

interface MusicBoxToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

export const MusicBoxToggle: React.FC<MusicBoxToggleProps> = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="group relative flex items-center justify-center p-2 rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-md border border-[#2D221E]/15 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      title={isMuted ? 'Open miniature music box (Sound On)' : 'Close miniature music box (Mute Sound)'}
      aria-label={isMuted ? 'Open miniature music box to play sound' : 'Close miniature music box to mute sound'}
    >
      <div className="relative w-9 h-8 flex flex-col items-center justify-center">
        {/* Miniature Ornate Music Box */}
        <div className="relative w-7 h-5 perspective-500">
          {/* Box Lid that hinges open or closes */}
          <div
            className={`w-7 h-2 bg-gradient-to-r from-[#B8DDF8] via-[#d0eaff] to-[#FCE7F3] rounded-t-md border border-[#4a9be8]/60 shadow-xs origin-bottom transition-transform duration-500 ease-in-out ${
              !isMuted ? '-rotate-x-45 -translate-y-1.5' : 'rotate-x-0'
            }`}
          >
            <div className="w-1.5 h-1 bg-amber-400 rounded-full mx-auto -mt-0.5" />
          </div>

          {/* Box Base */}
          <div className="w-7 h-3.5 bg-gradient-to-b from-[#182635] to-[#25394e] rounded-b-md border border-[#4a9be8]/40 shadow-inner flex items-center justify-center overflow-hidden">
            {/* Spinning crystal cylinder when active */}
            {!isMuted ? (
              <div className="w-4 h-1 bg-[#F4D98A] rounded-full animate-pulse shadow-[0_0_4px_#F4D98A]" />
            ) : (
              <div className="w-3 h-0.5 bg-stone-500 rounded-full" />
            )}
          </div>
        </div>

        {/* Rising Music Notes when open */}
        {!isMuted && (
          <span className="absolute -top-1.5 right-0 text-[10px] text-[#A43E68] animate-bounce duration-1000">
            ♪
          </span>
        )}
      </div>
      <span className="sr-only">Toggle Miniature Music Box Sound</span>
    </button>
  );
};
