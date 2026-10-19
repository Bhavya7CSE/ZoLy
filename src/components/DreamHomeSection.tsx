import React from 'react';
import { ActiveView } from '../types';
import {
  CrystalMusicBoxObject,
  EnchantedBookObject,
  GlowingMapObject,
  ToyArcadeObject,
  MoonLanternObject,
  CrystalTelephoneObject,
  FloatingEnvelopeObject,
  CelestialLocketObject,
  CharacterProfilesObject,
} from './EnchantedObjects';
import { ArrowUp } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface DreamHomeSectionProps {
  onOpenActivity: (activity: ActiveView) => void;
  onScrollToTop: () => void;
}

export const DreamHomeSection: React.FC<DreamHomeSectionProps> = ({
  onOpenActivity,
  onScrollToTop,
}) => {
  return (
    <section
      id="dream-home"
      className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-6 select-none"
      aria-label="Zoey & Lily's Dream Home"
    >
      {/* Background starlight ambient glow */}
      <div className="pointer-events-none absolute -top-16 left-1/4 w-80 h-80 rounded-full bg-[#B8DDF8]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-1/4 w-80 h-80 rounded-full bg-[#D8C5F5]/20 blur-3xl" />

      {/* Section Header with Clean Anti-Slop Editorial Hierarchy */}
      <div className="text-center mb-14 relative z-10">
        <div className="text-xs font-mono-tech tracking-wider text-[#A43E68] font-bold uppercase mb-2">
          The Dream Home &bull; 9 Enchanted Collectibles
        </div>

        <h2 className="font-fairytale text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2D221E] tracking-tight">
          Welcome to the Dream Home
        </h2>

        <p className="text-sm text-[#2D221E]/80 font-sans mt-3 max-w-xl mx-auto leading-relaxed">
          Every magical object below is a physical wonder placed inside Zoey and Lily’s world.
          Click or tap any collectible toy to play songs, read their story, catch stardust, or send a wish.
        </p>
      </div>

      {/* 9 Balanced Handcrafted Toy Objects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 place-items-center relative z-10 py-4">
        {/* 1. Crystal Music Box (Lullaby Lab) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <CrystalMusicBoxObject onActivate={onOpenActivity} />
        </div>

        {/* 2. Enchanted Book (Storybook) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <EnchantedBookObject onActivate={onOpenActivity} />
        </div>

        {/* 3. Glowing Map (Dream Delivery Map) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <GlowingMapObject onActivate={onOpenActivity} />
        </div>

        {/* 4. Tiny Toy Arcade (Catch Mini-Game) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <ToyArcadeObject onActivate={onOpenActivity} />
        </div>

        {/* 5. Moon Lantern (Nightlight Torch) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <MoonLanternObject onActivate={onOpenActivity} />
        </div>

        {/* 6. Crystal Telephone (Sister Chat) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <CrystalTelephoneObject onActivate={onOpenActivity} />
        </div>

        {/* 7. Floating Envelope (Dream Mail / Guestbook) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <FloatingEnvelopeObject onActivate={onOpenActivity} />
        </div>

        {/* 8. Secret Celestial Locket (Hidden Lore) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <CelestialLocketObject onActivate={onOpenActivity} />
        </div>

        {/* 9. Royal Twin Cameo (Character Profiles) */}
        <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-3xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-white/70 transition-all duration-300 hover:shadow-lg w-full max-w-[240px]">
          <CharacterProfilesObject onActivate={onOpenActivity} />
        </div>
      </div>

      {/* Return to Entrance Button */}
      <div className="mt-14 text-center relative z-10">
        <button
          onClick={() => {
            fairytaleAudio.playChime(880, 'crystal');
            onScrollToTop();
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/85 hover:bg-white border border-[#2D221E]/15 text-xs font-mono-tech font-bold text-[#2D221E] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#A43E68] focus:outline-none"
          aria-label="Return to full-screen entrance at top"
        >
          <ArrowUp className="w-4 h-4 text-[#A43E68]" />
          <span>Return to Entrance &amp; Princesses</span>
        </button>
      </div>
    </section>
  );
};
