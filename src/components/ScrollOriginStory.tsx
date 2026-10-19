import React from 'react';
import { Sparkles } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface ScrollOriginStoryProps {
  onOpenStorybook: () => void;
}

interface SceneItem {
  id: number;
  chapter: string;
  title: string;
  symbol: string;
  badge: string;
  text: string;
  quote: string;
}

const SCENES: SceneItem[] = [
  {
    id: 1,
    chapter: 'Scene I',
    title: 'The Silver Lake at Midnight',
    symbol: '🌕',
    badge: 'The Beginning',
    text: 'A quiet, mirrored lake reflects a thousand slumbering stars. Before morning arrives, a pure, innocent wish rises from the stillness, calling out to the sky.',
    quote: 'Two sisters waiting to be born under a canopy of silver light.',
  },
  {
    id: 2,
    chapter: 'Scene II',
    title: 'Zoey & the North Peak',
    symbol: '❄️',
    badge: "Zoey's Kingdom",
    text: 'The moon sent an icy-blue beam northwards, weaving frost and diamonds into a cradle on the highest mountain peak. There rested Zoey, whose laughter creates iridescent crystal bubbles.',
    quote: 'Quiet, thoughtful, with a heart pure like early morning snow.',
  },
  {
    id: 3,
    chapter: 'Scene III',
    title: 'Lily & the Twilight Valley',
    symbol: '🌙',
    badge: "Lily's Kingdom",
    text: 'To the southern meadows fell the lavender beam, brushing petals of wild moonflowers and sparking vibrant ribbons across the dark. Here woke Lily, painting auroras across the sky.',
    quote: 'Gentle, curious, bringing color and warmth to every quiet cloud.',
  },
  {
    id: 4,
    chapter: 'Scene IV',
    title: 'The Unbreakable Silver Thread',
    symbol: '✨',
    badge: 'Forever Connected',
    text: 'Though their kingdoms sit across the great water, moonlight bridges them forever. When Zoey blows a bubble, it glows with Lily’s aurora light. Two little wishes, one endless sky.',
    quote: 'Distance means nothing when you share the same night sky.',
  },
];

export const ScrollOriginStory: React.FC<ScrollOriginStoryProps> = ({ onOpenStorybook }) => {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-16" aria-label="Scroll-driven Origin Chronicle">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-md border border-[#A43E68]/20 text-xs font-mono-tech text-[#A43E68] mb-2 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Origin Chronicle &bull; haX.baby Tier 1</span>
        </div>
        <h2 className="font-fairytale text-3xl sm:text-4xl font-bold text-[#2D221E]">
          How Two Wishes Became Sisters
        </h2>
        <p className="text-xs sm:text-sm text-[#2D221E]/70 max-w-md mx-auto mt-1 font-sans">
          Follow the celestial starlight thread that brought Zoey and Lily into the world.
        </p>
      </div>

      {/* Seamless Illuminated Fairytale Narrative (No bulky cards) */}
      <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#B8DDF8] via-[#F4D98A] to-[#D8C5F5]">
        {SCENES.map((scene, idx) => (
          <div key={scene.id} className="relative group">
            {/* Glowing Celestial Node along the thread */}
            <div className="absolute -left-6 sm:-left-10 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#A43E68] shadow-md flex items-center justify-center text-xs group-hover:scale-125 transition-transform">
              <span className="text-[10px] text-[#A43E68] font-bold">✦</span>
            </div>

            {/* Narrative Content */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono-tech font-bold text-[#A43E68]">
                    {scene.chapter}
                  </span>
                  <span className="text-xs text-[#2D221E]/60 font-medium">
                    &bull; {scene.badge}
                  </span>
                </div>

                <h3 className="font-fairytale text-xl sm:text-2xl font-bold text-[#2D221E] mb-2">
                  {scene.title}
                </h3>

                <p className="text-sm text-[#2D221E]/85 leading-relaxed font-sans mb-2">
                  {scene.text}
                </p>

                <p className="font-fairytale italic text-[#A43E68] text-xs sm:text-sm">
                  &ldquo;{scene.quote}&rdquo;
                </p>
              </div>

              {/* Physical Floating Celestial Emblem */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/70 backdrop-blur-md border border-[#2D221E]/10 flex items-center justify-center text-3xl select-none shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform shrink-0">
                {scene.symbol}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Storybook CTA */}
      <div className="mt-14 text-center">
        <button
          onClick={() => {
            fairytaleAudio.playSparkle();
            onOpenStorybook();
          }}
          className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#A43E68] to-[#c24f7e] hover:brightness-105 text-white font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="group-hover:rotate-12 transition-transform">📖</span>
          <span>Open Full Interactive Storybook (6 Chapters)</span>
        </button>
      </div>
    </section>
  );
};
