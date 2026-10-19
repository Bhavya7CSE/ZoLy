import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface StorybookProps {
  onClose: () => void;
}

interface PageData {
  chapter: string;
  title: string;
  illustration: string;
  text: string;
  quote?: string;
  badgeColor: string;
}

const STORY_PAGES: PageData[] = [
  {
    chapter: 'Chapter I',
    title: 'The Moonlit Wish',
    illustration: '🌕 ✨ 🌊',
    text: 'Long before the two kingdoms were spoken of, there was only a quiet, silver lake stretching into the endless horizon. On a silent night, a wish of pure wonder rose from the quiet water towards the stars.',
    quote: '"If love could wander between sky and water, what form would it take?"',
    badgeColor: 'bg-[#F4D98A]/30 text-amber-900 border-[#F4D98A]',
  },
  {
    chapter: 'Chapter II',
    title: 'The Crystal Spark of North Peak',
    illustration: '❄️ 🫧 🏔️',
    text: 'The moon listened, and split the wish in two. The first beam fell upon the highest snow-capped mountain, crystallizing into a blanket of icy-blue starlight. From that cool cradle awoke Zoey, with eyes the color of winter frost.',
    quote: '"Where quiet souls ponder, diamonds bloom without a sound."',
    badgeColor: 'bg-[#B8DDF8]/40 text-[#182635] border-[#B8DDF8]',
  },
  {
    chapter: 'Chapter III',
    title: 'The Lavender Ribbon of Twilight',
    illustration: '🌙 🌸 🎨',
    text: 'The second beam descended into the warm southern meadows, weaving soft ribbons of twilight and wild moonflowers. Here awoke Lily, crowned with a golden crescent, her fingers stirring glowing auroras into the air.',
    quote: '"With every stroke of curiosity, the universe learns a brand new color."',
    badgeColor: 'bg-[#D8C5F5]/40 text-[#2d1b38] border-[#D8C5F5]',
  },
  {
    chapter: 'Chapter IV',
    title: 'The Silver Thread of Sisterhood',
    illustration: '✨ 🧵 💫',
    text: 'Though separated by the great lake, a shimmering silver thread of starlight linked the two baby princesses from their first breath. Whenever Zoey laughed, Lily felt warmth in her cheek; whenever Lily painted an aurora, Zoey saw the reflection in her crystal glass.',
    quote: '"Distance is but a whisper when hearts share the same sky."',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
  },
  {
    chapter: 'Chapter V',
    title: 'Bubbles and Auroras',
    illustration: '🫧 🌌 🕊️',
    text: 'When Zoey was happy, thousands of iridescent bubbles floated into the upper atmosphere. When Lily noticed them drifting over the lake, she danced with her moonflower wand, wrapping each bubble in brilliant aurora ribbons.',
    quote: '"Happiness multiplies the moment it is celebrated together."',
    badgeColor: 'bg-[#B8DDF8]/30 text-[#182635] border-[#B8DDF8]',
  },
  {
    chapter: 'Chapter VI',
    title: 'Two Little Wishes, One Endless Sky',
    illustration: '👑 👑 🌟',
    text: 'And so the sisters watch over dreamers everywhere. Whenever a baby rests, Zoey sends a peaceful snowflake lullaby, and Lily spreads a cozy nightlight across the clouds. Two sisters, forever united.',
    quote: '"Sleep softly, little dreamer; the princesses are watching."',
    badgeColor: 'bg-[#A43E68]/15 text-[#A43E68] border-[#A43E68]/30',
  },
];

export const Storybook: React.FC<StorybookProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  function goToNext() {
    if (currentPage < STORY_PAGES.length - 1) {
      fairytaleAudio.playChime(659.25, 'warm');
      setCurrentPage((p) => p + 1);
    }
  }

  function goToPrev() {
    if (currentPage > 0) {
      fairytaleAudio.playChime(587.33, 'crystal');
      setCurrentPage((p) => p - 1);
    }
  }

  const page = STORY_PAGES[currentPage];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFF8F1] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#F4D98A]/50 flex flex-col justify-between min-h-[500px] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
          aria-label="Close Storybook"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Book Header */}
        <div className="flex items-center justify-between border-b border-[#2D221E]/10 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#A43E68]" />
            <span className="text-xs font-mono-tech text-[#2D221E]/70 uppercase tracking-widest">
              The Legend of Zoey &amp; Lily
            </span>
          </div>
          <span className="text-xs font-mono-tech text-[#A43E68] font-bold">
            Page {currentPage + 1} of {STORY_PAGES.length}
          </span>
        </div>

        {/* Page Content with Flip Feel */}
        <div className="flex-1 flex flex-col justify-center text-center px-2 sm:px-6">
          {/* Decorative Badge */}
          <div className="mb-3">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-mono-tech border ${page.badgeColor} font-semibold`}
            >
              {page.chapter}
            </span>
          </div>

          {/* Chapter Title */}
          <h2 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#2D221E] mb-4">
            {page.title}
          </h2>

          {/* Whimsical Illustration Symbol Art */}
          <div className="text-4xl sm:text-5xl my-3 select-none filter drop-shadow">
            {page.illustration}
          </div>

          {/* Narrative Body */}
          <p className="text-sm sm:text-base text-[#2D221E]/85 leading-relaxed max-w-lg mx-auto font-sans mt-3">
            {page.text}
          </p>

          {/* Character Quote */}
          {page.quote && (
            <p className="font-fairytale italic text-[#A43E68] text-sm mt-4">
              {page.quote}
            </p>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="flex items-center justify-between border-t border-[#2D221E]/10 pt-4 mt-6">
          <button
            onClick={goToPrev}
            disabled={currentPage === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 disabled:opacity-40 text-xs font-medium border border-stone-200 transition-all active:scale-95 cursor-pointer shadow-xs"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-xs text-[#2D221E]/50 font-mono-tech hidden sm:inline">
            Use &larr; / &rarr; keys or buttons
          </span>

          <button
            onClick={goToNext}
            disabled={currentPage === STORY_PAGES.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#A43E68] hover:bg-[#8f3258] disabled:opacity-40 text-white text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer"
            aria-label="Next Page"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
