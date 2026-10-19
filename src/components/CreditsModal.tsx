import React from 'react';
import { X, ExternalLink, Heart, ShieldCheck } from 'lucide-react';

interface CreditsModalProps {
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FFF8F1] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2D221E]/10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
          aria-label="Close Credits"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-3xl text-[#A43E68]">✦</span>
          <h2 className="font-fairytale text-2xl font-bold text-[#2D221E] mt-1">
            Credits &amp; Original IP
          </h2>
          <p className="text-xs text-[#2D221E]/70 max-w-sm mx-auto mt-1">
            Built for the haX.baby Baby's First Website Hackathon.
          </p>
        </div>

        <dl className="space-y-4 text-xs sm:text-sm font-sans divide-y divide-stone-200">
          <div className="pt-2">
            <dt className="font-bold text-[#A43E68] uppercase text-[11px] tracking-wider font-mono-tech">
              Original Characters &amp; Concept
            </dt>
            <dd className="text-[#2D221E] mt-0.5">
              Princess Zoey &amp; Princess Lily are original fictional baby princess characters created exclusively for this project.
            </dd>
          </div>

          <div className="pt-3">
            <dt className="font-bold text-[#A43E68] uppercase text-[11px] tracking-wider font-mono-tech">
              3D Rigging &amp; WebGL Engine
            </dt>
            <dd className="text-[#2D221E] mt-0.5">
              Three.js interactive character hierarchy with head/eye tracking, blinking eyelids, floating gown physics, and GLTF/GLB loader support.
            </dd>
          </div>

          <div className="pt-3">
            <dt className="font-bold text-[#A43E68] uppercase text-[11px] tracking-wider font-mono-tech">
              Audio &amp; Compositions
            </dt>
            <dd className="text-[#2D221E] mt-0.5">
              &ldquo;Snowflake Dreams&rdquo; &amp; &ldquo;Moonbeam Wishes&rdquo; synthesized in real time via the browser Web Audio API. Safe muted defaults.
            </dd>
          </div>

          <div className="pt-3">
            <dt className="font-bold text-[#A43E68] uppercase text-[11px] tracking-wider font-mono-tech">
              Typography
            </dt>
            <dd className="text-[#2D221E] mt-0.5">
              Playfair Display (Clément Levaillant), Inter (Rasmus Andersson), Space Mono (Colophon Foundry) via Google Fonts (SIL OFL).
            </dd>
          </div>

          <div className="pt-3">
            <dt className="font-bold text-[#A43E68] uppercase text-[11px] tracking-wider font-mono-tech">
              Hackathon
            </dt>
            <dd className="text-[#2D221E] mt-0.5 flex items-center justify-between">
              <span>haX.baby Baby's First Website</span>
              <a
                href="https://hax.baby/baby-problem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4a9be8] hover:underline flex items-center gap-1 font-medium"
              >
                Rules &amp; Brief <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-6 pt-4 border-t border-stone-200 text-center">
          <p className="text-[11px] text-stone-500 font-mono-tech">
            ✦ All rights reserved &bull; Original fictional creation ✦
          </p>
        </div>
      </div>
    </div>
  );
};
