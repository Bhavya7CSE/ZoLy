import React from 'react';
import { X, Sparkles, Moon, Award } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface EasterEggProps {
  onClose: () => void;
}

export const EasterEgg: React.FC<EasterEggProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1a102f] via-[#2d1b4e] to-[#0e071c] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#F4D98A]/60 text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#D8C5F5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#B8DDF8]/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close Easter Egg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          <div className="inline-flex p-3 rounded-2xl bg-white/10 border border-[#F4D98A]/50 mb-3 animate-float">
            <Sparkles className="w-8 h-8 text-[#F4D98A]" />
          </div>

          <h2 className="font-fairytale text-2xl font-bold text-[#F4D98A] mb-2">
            You Discovered the Secret!
          </h2>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 my-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans text-left space-y-2">
            <p>
              Long before the kingdoms had names, there was only a silver lake and one perfect wish.
            </p>
            <p>
              The moon heard it, split it into two, and sent one icy-blue light north to the crystal peak — and one lavender light south to the aurora meadow.
            </p>
            <p className="font-fairytale italic text-[#F4D98A] text-center pt-2">
              &ldquo;That is how Zoey and Lily began.&rdquo;
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4D98A]/20 border border-[#F4D98A]/60 text-xs font-mono-tech text-[#F4D98A] mb-6">
            <Award className="w-4 h-4" />
            <span>Badge Earned: Secret Keeper 🔮</span>
          </div>

          <div>
            <button
              onClick={() => {
                fairytaleAudio.playSparkle();
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F4D98A] to-[#ffbe53] text-[#1a102f] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              Keep the Secret &amp; Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
