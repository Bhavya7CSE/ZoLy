import React, { useState } from 'react';
import { X, Sparkles, Heart, Crown, Compass, Volume2, ArrowRight } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface CharacterProfilesModalProps {
  onClose: () => void;
  onSelectKingdom?: (kingdom: 'zoey' | 'lily') => void;
}

export const CharacterProfilesModal: React.FC<CharacterProfilesModalProps> = ({
  onClose,
  onSelectKingdom,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<'both' | 'zoey' | 'lily'>('both');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  function handlePlayVoice(char: 'zoey' | 'lily') {
    fairytaleAudio.playChime(char === 'zoey' ? 739.99 : 659.25, char === 'zoey' ? 'crystal' : 'warm');
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text =
        char === 'zoey'
          ? "Hello, little dreamer! I am Princess Zoey. I weave crystal snowflakes and blow gentle bubbles to light up the night."
          : "Welcome to my sky! I am Princess Lily. I paint auroras and moonflowers so every dream feels warm and bright.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = char === 'zoey' ? 1.3 : 1.2;
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-label="Royal Character Profiles"
    >
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#FFF8F1] via-[#FFFDFB] to-[#F8F1EB] rounded-3xl border-2 border-[#A43E68]/30 shadow-2xl p-5 sm:p-8 my-auto overflow-hidden">
        {/* Soft background aura */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#B8DDF8]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#D8C5F5]/30 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-[#2D221E]/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#A43E68] via-[#F4D98A] to-[#B8DDF8] flex items-center justify-center text-2xl shadow-md">
              👑
            </div>
            <div>
              <h2 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#2D221E]">
                Royal Character Profiles
              </h2>
              <p className="text-xs sm:text-sm text-[#2D221E]/75 font-sans">
                Meet Princess Zoey &amp; Princess Lily &bull; haX.baby Original Lore
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              fairytaleAudio.playChime(523.25, 'crystal');
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#2D221E]/15 hover:bg-white text-xs font-mono-tech text-[#2D221E] shadow-sm hover:scale-105 transition-all cursor-pointer"
            aria-label="Back to Dream Home"
          >
            <span>Back to Dream Home</span>
            <X className="w-4 h-4 text-[#A43E68]" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 my-5">
          <button
            onClick={() => setSelectedCharacter('both')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-fairytale font-bold transition-all cursor-pointer ${
              selectedCharacter === 'both'
                ? 'bg-gradient-to-r from-[#B8DDF8] via-[#F4D98A] to-[#D8C5F5] text-[#2D221E] shadow-md scale-105'
                : 'bg-white/60 text-[#2D221E]/70 hover:bg-white'
            }`}
          >
            ✦ Both Sisters ✦
          </button>
          <button
            onClick={() => setSelectedCharacter('zoey')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-fairytale font-bold transition-all cursor-pointer ${
              selectedCharacter === 'zoey'
                ? 'bg-[#B8DDF8] text-[#182635] shadow-md scale-105 border border-[#4a9be8]'
                : 'bg-white/60 text-[#2D221E]/70 hover:bg-white'
            }`}
          >
            ❄️ Princess Zoey
          </button>
          <button
            onClick={() => setSelectedCharacter('lily')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-fairytale font-bold transition-all cursor-pointer ${
              selectedCharacter === 'lily'
                ? 'bg-[#D8C5F5] text-[#2d1b38] shadow-md scale-105 border border-[#8a5cb8]'
                : 'bg-white/60 text-[#2D221E]/70 hover:bg-white'
            }`}
          >
            🌙 Princess Lily
          </button>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[62vh] overflow-y-auto pr-1">
          {/* ZOEY'S PROFILE CARD */}
          {(selectedCharacter === 'both' || selectedCharacter === 'zoey') && (
            <div className="relative rounded-3xl bg-gradient-to-b from-[#E2F1FC]/80 via-white to-[#B8DDF8]/30 border-2 border-[#B8DDF8] p-5 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#B8DDF8] border-2 border-white flex items-center justify-center text-2xl shadow-sm">
                      ❄️
                    </div>
                    <div>
                      <h3 className="font-fairytale text-xl font-bold text-[#182635] leading-tight">
                        Princess Zoey
                      </h3>
                      <span className="text-[11px] font-mono-tech text-[#4a9be8] font-bold">
                        Keeper of the Crystal Peak
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayVoice('zoey')}
                    className="p-2 rounded-xl bg-white/80 border border-[#B8DDF8] hover:bg-[#B8DDF8]/40 text-[#182635] transition-all cursor-pointer shadow-xs"
                    title="Listen to Zoey's Voice"
                    aria-label="Listen to Zoey's voice"
                  >
                    <Volume2 className="w-4 h-4 text-[#4a9be8]" />
                  </button>
                </div>

                {/* Tagline */}
                <p className="font-fairytale italic text-[#4a9be8] text-xs sm:text-sm mb-3">
                  &ldquo;A little happiness, a thousand tiny bubbles.&rdquo;
                </p>

                {/* 5 Lore Fields */}
                <div className="space-y-2.5 text-xs text-[#2D221E]/85">
                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#B8DDF8]/50">
                    <span className="font-bold text-[#182635] font-mono-tech text-[10px] uppercase block text-[#4a9be8]">
                      Origin &amp; Cradle
                    </span>
                    Woven from moonbeams and frost atop the North Peak cradle. Born when the first innocent wish called to the night sky.
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#B8DDF8]/50">
                    <span className="font-bold text-[#182635] font-mono-tech text-[10px] uppercase block text-[#4a9be8]">
                      Elemental Power
                    </span>
                    Iridescent crystal bubbles and glistening snowflakes that rise on gentle breezes to carry joyful bedtime wishes.
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#B8DDF8]/50">
                    <span className="font-bold text-[#182635] font-mono-tech text-[10px] uppercase block text-[#4a9be8]">
                      Personality &amp; Spirit
                    </span>
                    Quiet, observant, gentle, and thoughtful. She watches over slumbering dreamers with a peaceful crystal gaze.
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#B8DDF8]/50">
                    <span className="font-bold text-[#182635] font-mono-tech text-[10px] uppercase block text-[#4a9be8]">
                      Signature Artifacts
                    </span>
                    Faceted 5-star crystal tiara, powder-blue layered gown, silver-chime music box, and glowing ice crystal.
                  </div>
                </div>
              </div>

              {onSelectKingdom && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectKingdom('zoey');
                  }}
                  className="mt-4 w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#4a9be8] to-[#2575c4] hover:brightness-105 text-white text-xs font-mono-tech font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Visit Zoey's Crystal Kingdom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* LILY'S PROFILE CARD */}
          {(selectedCharacter === 'both' || selectedCharacter === 'lily') && (
            <div className="relative rounded-3xl bg-gradient-to-b from-[#FCE7F3]/80 via-white to-[#D8C5F5]/30 border-2 border-[#D8C5F5] p-5 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#D8C5F5] border-2 border-white flex items-center justify-center text-2xl shadow-sm">
                      🌙
                    </div>
                    <div>
                      <h3 className="font-fairytale text-xl font-bold text-[#2d1b38] leading-tight">
                        Princess Lily
                      </h3>
                      <span className="text-[11px] font-mono-tech text-[#8a5cb8] font-bold">
                        Painter of Aurora Ribbons
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayVoice('lily')}
                    className="p-2 rounded-xl bg-white/80 border border-[#D8C5F5] hover:bg-[#D8C5F5]/40 text-[#2d1b38] transition-all cursor-pointer shadow-xs"
                    title="Listen to Lily's Voice"
                    aria-label="Listen to Lily's voice"
                  >
                    <Volume2 className="w-4 h-4 text-[#8a5cb8]" />
                  </button>
                </div>

                {/* Tagline */}
                <p className="font-fairytale italic text-[#8a5cb8] text-xs sm:text-sm mb-3">
                  &ldquo;Every colour begins with a dream.&rdquo;
                </p>

                {/* 5 Lore Fields */}
                <div className="space-y-2.5 text-xs text-[#2D221E]/85">
                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#D8C5F5]/50">
                    <span className="font-bold text-[#2d1b38] font-mono-tech text-[10px] uppercase block text-[#8a5cb8]">
                      Origin &amp; Cradle
                    </span>
                    Awakened by a southern lavender moonbeam in the Twilight Valley meadow among wild, blooming moonflowers.
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#D8C5F5]/50">
                    <span className="font-bold text-[#2d1b38] font-mono-tech text-[10px] uppercase block text-[#8a5cb8]">
                      Elemental Power
                    </span>
                    Flowing aurora ribbons and luminous stardust threads that brush across the twilight sky in warm pastels.
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#D8C5F5]/50">
                    <span className="font-bold text-[#2d1b38] font-mono-tech text-[10px] uppercase block text-[#8a5cb8]">
                      Personality &amp; Spirit
                    </span>
                    Imaginative, curious, warm, and playful. She sings celestial melodies to guide little dreamers to sleep.
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#D8C5F5]/50">
                    <span className="font-bold text-[#2d1b38] font-mono-tech text-[10px] uppercase block text-[#8a5cb8]">
                      Signature Artifacts
                    </span>
                    Golden crescent tiara with starry jewels, lavender gown with blush frills, enchanted harp, and moonflower blossom.
                  </div>
                </div>
              </div>

              {onSelectKingdom && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectKingdom('lily');
                  }}
                  className="mt-4 w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#8a5cb8] to-[#60358e] hover:brightness-105 text-white text-xs font-mono-tech font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Visit Lily's Aurora Kingdom</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* The Eternal Sisterly Connection */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#B8DDF8]/40 via-[#FFF8F1] to-[#D8C5F5]/40 border border-[#A43E68]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">✨</span>
            <div className="text-xs">
              <span className="font-fairytale font-bold text-[#2D221E] text-sm block">
                Two Little Wishes, One Endless Sky
              </span>
              <span className="text-[#2D221E]/75">
                Though separated by the mirrored lake, Zoey’s bubbles shimmer with Lily’s aurora light.
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              fairytaleAudio.playChime(880, 'crystal');
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-white/90 border border-[#A43E68]/30 hover:bg-white text-xs font-mono-tech text-[#A43E68] font-bold shadow-xs hover:scale-105 transition-all cursor-pointer shrink-0"
          >
            Close &amp; Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
