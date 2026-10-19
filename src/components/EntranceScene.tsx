import React from 'react';
import { CharacterStage3D } from './ThreeCanvas/CharacterStage3D';
import { Mood } from '../types';
import { CelestialMoodDial } from './CelestialMoodDial';

interface EntranceSceneProps {
  isNight: boolean;
  activeMood: Mood;
  onSelectKingdom: (kingdom: 'zoey' | 'lily') => void;
  onSelectMood: (mood: Mood) => void;
  onScrollToDreamHome: () => void;
}

export const EntranceScene: React.FC<EntranceSceneProps> = ({
  isNight,
  activeMood,
  onSelectKingdom,
  onSelectMood,
  onScrollToDreamHome,
}) => {
  return (
    <section
      className="relative w-full h-screen min-h-[680px] max-h-[960px] flex flex-col justify-between overflow-hidden select-none"
      aria-label="Fairytale Entrance World"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. LAYERED BACKGROUND: Moving Clouds, Mist & Parallax
          ───────────────────────────────────────────────────────────── */}
      {/* Upper Drifting Clouds Layer */}
      <div
        className="pointer-events-none absolute -top-12 -left-[50%] w-[200%] h-56 opacity-45 z-0 animate-[shimmer_50s_linear_infinite]"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 25% 40%, rgba(255,255,255,0.9) 0%, transparent 70%), radial-gradient(ellipse 45% 45% at 75% 30%, rgba(216,197,245,0.65) 0%, transparent 70%)',
          filter: 'blur(22px)',
        }}
      />

      {/* Mid Atmospheric Mist Layer */}
      <div
        className="pointer-events-none absolute top-24 -right-[50%] w-[200%] h-48 opacity-35 z-0 animate-[shimmer_40s_linear_infinite_reverse]"
        style={{
          background:
            'radial-gradient(ellipse 65% 45% at 35% 55%, rgba(184,221,248,0.75) 0%, transparent 75%), radial-gradient(ellipse 55% 45% at 80% 65%, rgba(252,231,243,0.65) 0%, transparent 75%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          2. 3D INTERACTIVE THREE.JS SCENE (Princesses Zoey & Lily)
          Main focus: characters standing cleanly over the Silver Lake
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full z-10">
        <CharacterStage3D
          isNight={isNight}
          activeMood={activeMood}
          onSelectKingdom={onSelectKingdom}
          onScrollToDreamHome={onScrollToDreamHome}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. TOP FAIRYTALE TITLE & MOOD AMULET DIAL
          Clean, unobtrusive, perfectly balanced above the sisters
          ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 text-center pt-3 px-4 pointer-events-none flex flex-col items-center">
        <h1 className="font-fairytale text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#2D221E] drop-shadow-xs">
          Zoey <span className="text-[#A43E68] font-normal">&amp;</span> Lily
        </h1>
        <p className="text-xs sm:text-sm text-[#2D221E]/75 font-sans mt-0.5 max-w-md mx-auto">
          Two little wishes, one endless sky.
        </p>

        {/* Tactile Celestial Mood Amulet (Shared mood state controller) */}
        <div className="pointer-events-auto mt-2">
          <CelestialMoodDial activeMood={activeMood} onSelectMood={onSelectMood} />
        </div>
      </div>

      {/* Empty bottom spacer to let 3D stage controls breathe */}
      <div className="relative z-20 pointer-events-none pb-4" />
    </section>
  );
};
