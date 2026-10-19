import React, { useState, useEffect } from 'react';
import { CelestialThemeToggle, MagicWandToggle, MusicBoxToggle } from './FairytaleToggles';
import { fairytaleAudio } from '../audio/synthEngine';

interface TopControlsProps {
  isNight: boolean;
  onToggleTheme: () => void;
  onOpenCredits: () => void;
  onMagicBurst: () => void;
}

export const TopControls: React.FC<TopControlsProps> = ({
  isNight,
  onToggleTheme,
  onOpenCredits,
  onMagicBurst,
}) => {
  const [isMuted, setIsMuted] = useState(fairytaleAudio.getMuted());
  const [visitorNumber, setVisitorNumber] = useState<number>(1042);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    // Visitor memory in localStorage
    const storedCount = localStorage.getItem('zl_visitor_count');
    const storedSeen = localStorage.getItem('zl_has_visited');

    let count = storedCount ? parseInt(storedCount, 10) : 1042;
    if (!storedSeen) {
      count += 1;
      localStorage.setItem('zl_visitor_count', count.toString());
      localStorage.setItem('zl_has_visited', 'true');
      setIsReturning(false);
    } else {
      setIsReturning(true);
    }
    setVisitorNumber(count);

    const unsub = fairytaleAudio.subscribe(() => {
      setIsMuted(fairytaleAudio.getMuted());
    });
    return unsub;
  }, []);

  function handleToggleSound() {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    fairytaleAudio.setMuted(nextMuted);
    if (!nextMuted) {
      fairytaleAudio.playChime(659.25, 'crystal');
    }
  }

  return (
    <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3 w-full bg-white/40 hover:bg-white/60 backdrop-blur-md border-b border-[#2D221E]/10 transition-colors">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <span className="text-[#A43E68] text-xl animate-pulse-soft" aria-hidden="true">✦</span>
        <div className="flex flex-col">
          <span className="font-fairytale font-bold text-lg sm:text-xl text-[#2D221E] tracking-tight flex items-center gap-1.5">
            Zoey <span className="text-[#A43E68] font-normal">&amp;</span> Lily
          </span>
          <span className="text-[10px] text-[#2D221E]/60 -mt-0.5 tracking-wider font-mono-tech hidden sm:block">
            Two Little Wishes, One Endless Sky
          </span>
        </div>
      </div>

      {/* Handcrafted Fairytale Toggles & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Returning visitor badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 border border-[#2D221E]/15 text-xs text-[#2D221E]/80 shadow-xs backdrop-blur-xs"
          title={isReturning ? 'Welcome back to the fairylands!' : 'Your first journey into their world'}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono-tech text-[11px]">
            {isReturning ? 'Dreamer #' : 'Visitor #'}
            <span className="font-bold text-[#A43E68] ml-0.5">{visitorNumber}</span>
          </span>
        </div>

        {/* 1. Miniature Music Box Toggle (Opens when sound enabled, closes when muted) */}
        <MusicBoxToggle isMuted={isMuted} onToggle={handleToggleSound} />

        {/* 2. Tiny Magic Wand Toggle (Rotates and releases sparkles) */}
        <MagicWandToggle onBurst={onMagicBurst} />

        {/* 3. Celestial Day/Night Toggle (Sun slides behind crescent moon) */}
        <CelestialThemeToggle isNight={isNight} onToggle={onToggleTheme} />

        {/* 4. Lore & Credits Parchment Toggle */}
        <button
          onClick={onOpenCredits}
          className="group relative flex items-center justify-center p-2 rounded-2xl bg-white/40 hover:bg-white/70 backdrop-blur-md border border-[#2D221E]/15 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs font-mono-tech"
          title="Open Fairytale Credits & Lore"
          aria-label="View Fairytale Credits and Lore"
        >
          <span className="text-base">📜</span>
        </button>
      </div>
    </header>
  );
};
