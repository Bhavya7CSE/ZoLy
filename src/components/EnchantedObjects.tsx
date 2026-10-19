import React from 'react';
import { ActiveView } from '../types';
import { fairytaleAudio } from '../audio/synthEngine';

interface MagicalObjectProps {
  onActivate: (view: ActiveView) => void;
}

/**
 * 1. CRYSTAL MUSIC BOX (Lullaby Lab)
 * A miniature icy-blue jewellery box with a crystal snowflake ornament,
 * a hinged lid, turned brass winding key, tuned interior chime tines, and floating music notes.
 */
export const CrystalMusicBoxObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playChime(739.99, 'crystal');
        onActivate('lullaby');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4a9be8] focus:outline-none"
      title="Crystal Music Box — Open Lullaby Lab"
      aria-label="Crystal Music Box — Open Lullaby Lab"
    >
      <div className="relative animate-toy-musicbox w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        {/* Soft crystalline aura glow */}
        <div className="absolute inset-2 rounded-full bg-[#B8DDF8]/40 blur-xl group-hover:bg-[#B8DDF8]/70 transition-colors" />

        {/* 3D Illustrated Crystal Music Box */}
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(30,70,110,0.18)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Box Crystal Gradients */}
            <linearGradient id="cmb-lid" x1="20" y1="28" x2="100" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#E2F1FC" />
              <stop offset="70%" stopColor="#B8DDF8" />
              <stop offset="100%" stopColor="#8AC6F4" />
            </linearGradient>
            <linearGradient id="cmb-body" x1="24" y1="46" x2="96" y2="92" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EBF5FE" />
              <stop offset="40%" stopColor="#D2EAFD" />
              <stop offset="85%" stopColor="#9ACFF5" />
              <stop offset="100%" stopColor="#76BCEE" />
            </linearGradient>
            <linearGradient id="cmb-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2BE" />
              <stop offset="50%" stopColor="#F4D98A" />
              <stop offset="100%" stopColor="#C9972E" />
            </linearGradient>
            <radialGradient id="cmb-gem" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#B8DDF8" />
              <stop offset="100%" stopColor="#4A9BE8" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="99" rx="36" ry="6" fill="#1C3852" fillOpacity="0.22" />
          <ellipse cx="60" cy="98" rx="26" ry="3.5" fill="#1C3852" fillOpacity="0.3" />

          {/* 4 Crystal Cabochon Feet */}
          <ellipse cx="32" cy="92" rx="4.5" ry="3.5" fill="url(#cmb-gold)" />
          <ellipse cx="88" cy="92" rx="4.5" ry="3.5" fill="url(#cmb-gold)" />
          <ellipse cx="44" cy="94" rx="4" ry="2.5" fill="#C9972E" />
          <ellipse cx="76" cy="94" rx="4" ry="2.5" fill="#C9972E" />

          {/* Music Box Body */}
          <rect x="24" y="46" width="72" height="46" rx="10" fill="url(#cmb-body)" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Front Beveled Panel */}
          <rect x="28" y="52" width="64" height="34" rx="6" fill="#E2F1FC" fillOpacity="0.45" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Tuned Comb Cylinder Tines (Interior Glaze) */}
          <rect x="42" y="60" width="36" height="18" rx="4" fill="url(#cmb-gold)" fillOpacity="0.85" />
          <line x1="48" y1="60" x2="48" y2="78" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 2" />
          <line x1="54" y1="60" x2="54" y2="78" stroke="#9A6F14" strokeWidth="0.8" />
          <line x1="60" y1="60" x2="60" y2="78" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 2" />
          <line x1="66" y1="60" x2="66" y2="78" stroke="#9A6F14" strokeWidth="0.8" />
          <line x1="72" y1="60" x2="72" y2="78" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1 2" />

          {/* Winding Key on Side */}
          <path d="M96 66 L104 66" stroke="url(#cmb-gold)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="106" cy="63" r="3.5" fill="url(#cmb-gold)" stroke="#9A6F14" strokeWidth="0.8" />
          <circle cx="106" cy="69" r="3.5" fill="url(#cmb-gold)" stroke="#9A6F14" strokeWidth="0.8" />

          {/* Hinged Lid */}
          <path
            d="M20 44 L32 28 L88 28 L100 44 Z"
            fill="url(#cmb-lid)"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Lid Facet Ridge Lines */}
          <line x1="32" y1="28" x2="38" y2="44" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.8" />
          <line x1="88" y1="28" x2="82" y2="44" stroke="#9ACFF5" strokeWidth="1.2" strokeOpacity="0.8" />
          <line x1="60" y1="28" x2="60" y2="44" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.9" />

          {/* Crystal Snowflake Finial Topper */}
          <circle cx="60" cy="27" r="3" fill="url(#cmb-gold)" />
          {/* Snowflake Arms */}
          <path
            d="M60 12 L60 27 M53 15 L67 23 M67 15 L53 23"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="60" cy="19" r="2.5" fill="url(#cmb-gem)" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Floating Musical Notes */}
          <g className="animate-pulse">
            <path d="M88 20 C88 17 92 16 94 18 L94 25 M94 20 L100 18 L100 23" stroke="#A43E68" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="88" cy="25" r="2" fill="#A43E68" />
            <circle cx="94" cy="23" r="2" fill="#A43E68" />
          </g>

          {/* Specular Highlight Glints */}
          <circle cx="34" cy="34" r="1.5" fill="#FFFFFF" />
          <circle cx="38" cy="54" r="1.2" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-[#182635] tracking-tight group-hover:text-[#4a9be8] transition-colors">
          Crystal Music Box
        </span>
        <span className="block text-[11px] text-[#4a9be8] font-sans font-medium mt-0.5">
          Lullaby Lab &bull; Tunes
        </span>
      </div>
    </button>
  );
};

/**
 * 2. ENCHANTED STORYBOOK (Storybook)
 * A dimensional lavender-and-cream tome with a gold crescent clasp,
 * embossed velvet cover, layered deckled pages, and a cascading silk bookmark.
 */
export const EnchantedBookObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playChime(659.25, 'warm');
        onActivate('storybook');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#8a5cb8] focus:outline-none"
      title="Enchanted Storybook — Read 6 Chapters"
      aria-label="Enchanted Storybook — Open Storybook"
    >
      <div className="relative animate-toy-storybook w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-[#D8C5F5]/40 blur-xl group-hover:bg-[#D8C5F5]/70 transition-colors" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(50,20,60,0.22)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="esb-cover" x1="20" y1="20" x2="90" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4A2663" />
              <stop offset="45%" stopColor="#673489" />
              <stop offset="85%" stopColor="#37184A" />
              <stop offset="100%" stopColor="#250E33" />
            </linearGradient>
            <linearGradient id="esb-pages" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFDF8" />
              <stop offset="50%" stopColor="#F7EEDC" />
              <stop offset="100%" stopColor="#E5D6BA" />
            </linearGradient>
            <linearGradient id="esb-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2BE" />
              <stop offset="50%" stopColor="#F4D98A" />
              <stop offset="100%" stopColor="#C9972E" />
            </linearGradient>
            <linearGradient id="esb-ribbon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D95886" />
              <stop offset="100%" stopColor="#8A264E" />
            </linearGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="100" rx="38" ry="6" fill="#250E33" fillOpacity="0.25" />
          <ellipse cx="60" cy="99" rx="28" ry="3.5" fill="#250E33" fillOpacity="0.32" />

          {/* Back Cover Layer */}
          <path d="M22 28 L84 22 C89 21.5 94 25.5 95 30 L99 86 C100 91 96 95.5 91 96 L29 102 Z" fill="#250E33" />

          {/* Thick Layered Deckled Pages Edge */}
          <path d="M84 24 L92 27 L95 89 L87 95 Z" fill="url(#esb-pages)" stroke="#C9B89B" strokeWidth="0.8" />
          {/* Individual Page Texture Lines */}
          <line x1="86" y1="32" x2="89" y2="90" stroke="#C9B89B" strokeWidth="0.6" strokeDasharray="2 1" />
          <line x1="88" y1="36" x2="91" y2="92" stroke="#C9B89B" strokeWidth="0.6" strokeDasharray="3 1" />
          <line x1="90" y1="40" x2="93" y2="94" stroke="#C9B89B" strokeWidth="0.6" strokeDasharray="2 1" />

          {/* Front Velvet Cover */}
          <path
            d="M26 24 C23 24 21 26 21 29 L21 95 C21 98 23 100 26 100 L86 94 C89 94 91 91 91 88 L91 26 C91 23 89 21 86 21 Z"
            fill="url(#esb-cover)"
            stroke="url(#esb-gold)"
            strokeWidth="1.8"
          />

          {/* Rounded Spine Left Bevel */}
          <path d="M21 29 C21 26 23 24 26 24 L30 24 L30 100 L26 100 C23 100 21 98 21 95 Z" fill="#280F38" />
          <line x1="30" y1="24" x2="30" y2="100" stroke="url(#esb-gold)" strokeWidth="0.8" strokeOpacity="0.7" />

          {/* Embossed Gold Celestial Filigree Frame */}
          <rect x="34" y="28" width="50" height="62" rx="4" fill="none" stroke="url(#esb-gold)" strokeWidth="1.2" strokeDasharray="12 2 4 2" />

          {/* Center Embossed Star & Moon Crest */}
          <circle cx="59" cy="58" r="14" fill="#3B1D4C" stroke="url(#esb-gold)" strokeWidth="1" />
          {/* Golden Crescent Moon */}
          <path
            d="M62 48 C56 50 53 56 55 63 C57 70 64 73 70 69 C63 71 56 66 56 60 C56 54 60 50 62 48 Z"
            fill="url(#esb-gold)"
          />
          {/* North Star ✦ */}
          <path
            d="M59 50 L60.5 56.5 L67 58 L60.5 59.5 L59 66 L57.5 59.5 L51 58 L57.5 56.5 Z"
            fill="#FFF2BE"
          />

          {/* Gold Crescent Moon Clasp on Right Edge */}
          <path
            d="M87 50 C87 47 92 46 95 48 C97 54 97 62 95 68 C92 70 87 69 87 66 Z"
            fill="url(#esb-gold)"
            stroke="#9A6F14"
            strokeWidth="1"
          />
          <circle cx="92" cy="58" r="2" fill="#4A2663" />

          {/* Cascading Crimson Silk Bookmark Ribbon */}
          <path
            d="M59 90 L59 108 C59 108 63 105 67 108 L67 90 Z"
            fill="url(#esb-ribbon)"
            stroke="#631433"
            strokeWidth="0.8"
          />
          <polygon points="63,103 64,106 67,106 65,108 66,111 63,109 60,111 61,108 59,106 62,106" fill="url(#esb-gold)" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-[#2d1b38] tracking-tight group-hover:text-[#8a5cb8] transition-colors">
          Enchanted Book
        </span>
        <span className="block text-[11px] text-[#8a5cb8] font-sans font-medium mt-0.5">
          Storybook &bull; 6 Chapters
        </span>
      </div>
    </button>
  );
};

/**
 * 3. DREAM DELIVERY MAP (Dream Map)
 * An unfurled antique parchment scroll with turned wooden rollers,
 * a glistening crystal lake, miniature fairytale castle turrets, and an animated travelling parcel.
 */
export const GlowingMapObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playSparkle();
        onActivate('map');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus:outline-none"
      title="Dream Delivery Map — Track Celestial Lake Route"
      aria-label="Dream Delivery Map — Open Map"
    >
      <div className="relative animate-toy-map w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-amber-200/40 blur-xl group-hover:bg-amber-300/60 transition-colors" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(80,50,20,0.18)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ddm-parchment" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="50%" stopColor="#F9F1DC" />
              <stop offset="100%" stopColor="#EADBB9" />
            </linearGradient>
            <linearGradient id="ddm-roller" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6C421A" />
              <stop offset="50%" stopColor="#B3773B" />
              <stop offset="100%" stopColor="#55300F" />
            </linearGradient>
            <linearGradient id="ddm-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2BE" />
              <stop offset="50%" stopColor="#F4D98A" />
              <stop offset="100%" stopColor="#C9972E" />
            </linearGradient>
            <radialGradient id="ddm-lake" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B8F4F8" />
              <stop offset="70%" stopColor="#64CDE6" />
              <stop offset="100%" stopColor="#3199B8" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="100" rx="36" ry="5.5" fill="#3D2614" fillOpacity="0.22" />

          {/* Bottom Turned Wooden Roller */}
          <rect x="18" y="90" width="84" height="7" rx="3.5" fill="url(#ddm-roller)" stroke="#3D2614" strokeWidth="0.8" />
          <circle cx="18" cy="93.5" r="4.5" fill="url(#ddm-gold)" />
          <circle cx="102" cy="93.5" r="4.5" fill="url(#ddm-gold)" />

          {/* Unfurled Parchment Body */}
          <path
            d="M24 26 C24 26 28 29 60 29 C92 29 96 26 96 26 L94 92 C94 92 88 89 60 89 C32 89 26 92 26 92 Z"
            fill="url(#ddm-parchment)"
            stroke="#C9B489"
            strokeWidth="1.2"
          />

          {/* Top Turned Wooden Roller */}
          <rect x="18" y="22" width="84" height="7" rx="3.5" fill="url(#ddm-roller)" stroke="#3D2614" strokeWidth="0.8" />
          <circle cx="18" cy="25.5" r="4.5" fill="url(#ddm-gold)" />
          <circle cx="102" cy="25.5" r="4.5" fill="url(#ddm-gold)" />

          {/* Topographic Illustrations on Map */}
          {/* Miniature Mountains */}
          <polygon points="34,58 40,46 46,58" fill="#D5C4A0" stroke="#8C7451" strokeWidth="0.8" />
          <polygon points="42,58 49,44 56,58" fill="#E2D4B5" stroke="#8C7451" strokeWidth="0.8" />

          {/* Glistening Crystal Lake */}
          <path
            d="M62 58 C68 52 82 54 84 62 C86 70 76 76 68 74 C60 72 58 64 62 58 Z"
            fill="url(#ddm-lake)"
            stroke="#FFFFFF"
            strokeWidth="0.8"
          />
          {/* Water Specular Ripple */}
          <path d="M68 62 Q74 61 78 64" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

          {/* Miniature Fairytale Castle Turrets */}
          <rect x="74" y="44" width="8" height="10" fill="#E8D1DF" stroke="#A43E68" strokeWidth="0.7" />
          <polygon points="73,44 78,36 83,44" fill="#A43E68" />
          <line x1="78" y1="36" x2="78" y2="33" stroke="#A43E68" strokeWidth="0.8" />
          <polygon points="78,33 82,34.5 78,36" fill="#F4D98A" />

          {/* Dotted Flight Trail / Star Route */}
          <path
            d="M38 74 Q52 70 60 52 Q68 36 78 40"
            stroke="#A43E68"
            strokeWidth="1.4"
            strokeDasharray="2.5 2.5"
            strokeLinecap="round"
          />

          {/* Tiny Traveling Star Parcel on the Path */}
          <g transform="translate(54, 62)">
            <rect x="-4" y="-4" width="8" height="8" rx="1.5" fill="#FFF2BE" stroke="#C9972E" strokeWidth="0.8" />
            <line x1="0" y1="-4" x2="0" y2="4" stroke="#A43E68" strokeWidth="0.8" />
            <line x1="-4" y1="0" x2="4" y2="0" stroke="#A43E68" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="1.2" fill="#A43E68" />
          </g>

          {/* Brass Compass Rose in Bottom Left */}
          <circle cx="36" cy="78" r="6" fill="#FFFDF7" stroke="url(#ddm-gold)" strokeWidth="1" />
          <polygon points="36,73 37.5,78 36,76 34.5,78" fill="#C93452" />
          <polygon points="36,83 37.5,78 36,80 34.5,78" fill="#55300F" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-amber-950 tracking-tight group-hover:text-amber-700 transition-colors">
          Dream Delivery Map
        </span>
        <span className="block text-[11px] text-amber-800 font-sans font-medium mt-0.5">
          Lake Route &bull; Coordinates
        </span>
      </div>
    </button>
  );
};

/**
 * 4. TOY ARCADE (Playable Mini-Game)
 * A whimsical miniature toy machine with a glass dome, pastel buttons,
 * tactile cherry joystick, and floating dream bubbles.
 */
export const ToyArcadeObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playSparkle();
        onActivate('game');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#4a9be8] focus:outline-none"
      title="Toy Arcade — Play Catch Game"
      aria-label="Toy Arcade — Open Game"
    >
      <div className="relative animate-toy-arcade w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-[#B8DDF8]/40 blur-xl group-hover:bg-[#B8DDF8]/70 transition-colors" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(20,50,80,0.2)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ta-body" x1="28" y1="56" x2="92" y2="98" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4A75A0" />
              <stop offset="50%" stopColor="#284869" />
              <stop offset="100%" stopColor="#152B42" />
            </linearGradient>
            <radialGradient id="ta-dome" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#D9EEFC" stopOpacity="0.45" />
              <stop offset="85%" stopColor="#96CEF7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#62AFE6" stopOpacity="0.6" />
            </radialGradient>
            <linearGradient id="ta-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2BE" />
              <stop offset="50%" stopColor="#F4D98A" />
              <stop offset="100%" stopColor="#C9972E" />
            </linearGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="100" rx="34" ry="5.5" fill="#152B42" fillOpacity="0.25" />

          {/* Arcade Cabinet Base */}
          <rect x="28" y="56" width="64" height="42" rx="10" fill="url(#ta-body)" stroke="#B8DDF8" strokeWidth="1.5" />

          {/* Coin Return Door & Slot */}
          <rect x="54" y="82" width="12" height="12" rx="2" fill="#0D1E30" stroke="#4A75A0" strokeWidth="0.8" />
          <line x1="60" y1="84" x2="60" y2="88" stroke="url(#ta-gold)" strokeWidth="1.2" strokeLinecap="round" />

          {/* Marquee Banner */}
          <rect x="34" y="58" width="52" height="8" rx="3" fill="#0E2338" stroke="url(#ta-gold)" strokeWidth="0.8" />
          <circle cx="39" cy="62" r="1.5" fill="#F4D98A" />
          <circle cx="81" cy="62" r="1.5" fill="#F4D98A" />
          {/* Centered Stars in Marquee */}
          <path d="M57 60 L58 62 L60 62 L58.5 63 L59 65 L57 63.5 L55 65 L55.5 63 L54 62 L56 62 Z" fill="#FFF2BE" />

          {/* Tactile Control Panel Desk */}
          <polygon points="26,76 94,76 90,68 30,68" fill="#1A344E" stroke="#5C8EB8" strokeWidth="0.8" />

          {/* Cherry Ball Joystick */}
          <line x1="42" y1="74" x2="40" y2="67" stroke="#CCDDEE" strokeWidth="2" strokeLinecap="round" />
          <circle cx="39.5" cy="65" r="3.5" fill="#E83D68" stroke="#FFFFFF" strokeWidth="0.7" />

          {/* 3 Pastel Candy Buttons */}
          <circle cx="58" cy="72" r="2.8" fill="#FF8CA3" stroke="#FFFFFF" strokeWidth="0.6" />
          <circle cx="68" cy="70" r="2.8" fill="#F4D98A" stroke="#FFFFFF" strokeWidth="0.6" />
          <circle cx="78" cy="72" r="2.8" fill="#6EE7B7" stroke="#FFFFFF" strokeWidth="0.6" />

          {/* Translucent Glass Dome */}
          <path
            d="M32 56 C32 30 44 20 60 20 C76 20 88 30 88 56 Z"
            fill="url(#ta-dome)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* Inside Glass Dome: Floating Dream Bubbles */}
          <circle cx="50" cy="38" r="5.5" fill="#B8DDF8" fillOpacity="0.6" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="48" cy="36" r="1.5" fill="#FFFFFF" />

          <circle cx="68" cy="35" r="4.5" fill="#FCE7F3" fillOpacity="0.6" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="67" cy="33.5" r="1.2" fill="#FFFFFF" />

          <circle cx="60" cy="46" r="6" fill="#D8C5F5" fillOpacity="0.6" stroke="#FFFFFF" strokeWidth="0.8" />
          <circle cx="58.5" cy="44" r="1.5" fill="#FFFFFF" />

          {/* Golden Finial Star on Dome Top */}
          <circle cx="60" cy="20" r="2.5" fill="url(#ta-gold)" />
          <path d="M60 14 L61 17 L64 18 L61 19 L60 22 L59 19 L56 18 L59 17 Z" fill="url(#ta-gold)" />

          {/* Glass Specular Curved Reflection Arc */}
          <path d="M38 48 C38 35 44 27 54 24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.75" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-[#182635] tracking-tight group-hover:text-[#4a9be8] transition-colors">
          Toy Arcade
        </span>
        <span className="block text-[11px] text-[#4a9be8] font-sans font-medium mt-0.5">
          Pop Bubbles &bull; 30s Game
        </span>
      </div>
    </button>
  );
};

/**
 * 5. MOON LANTERN (Nightlight Torch)
 * A translucent crescent-moon glass lantern encased in gold filigree,
 * containing a captive starlight flame and dangling star charm.
 */
export const MoonLanternObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playChime(659.25, 'warm');
        onActivate('nightlight');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus:outline-none"
      title="Moon Lantern — Reveal Hidden Starlight Layer"
      aria-label="Moon Lantern — Open Nightlight"
    >
      <div className="relative animate-toy-lantern w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-amber-300/40 blur-xl group-hover:bg-amber-400/70 transition-colors" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(100,70,10,0.22)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ml-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF6CC" />
              <stop offset="45%" stopColor="#F4D98A" />
              <stop offset="100%" stopColor="#C48E22" />
            </linearGradient>
            <radialGradient id="ml-flame" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#FFF099" />
              <stop offset="70%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ml-glass" x1="30" y1="30" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFFBEB" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="102" rx="26" ry="4.5" fill="#422E06" fillOpacity="0.22" />

          {/* Suspension Top Ring & Chain Hook */}
          <circle cx="60" cy="16" r="4.5" stroke="url(#ml-gold)" strokeWidth="2" fill="none" />
          <line x1="60" y1="20" x2="60" y2="28" stroke="url(#ml-gold)" strokeWidth="2.5" />

          {/* Ornate Gold Top Cap / Chimney */}
          <path d="M46 28 L74 28 L70 34 L50 34 Z" fill="url(#ml-gold)" stroke="#8C610F" strokeWidth="0.8" />
          <rect x="42" y="34" width="36" height="5" rx="2.5" fill="url(#ml-gold)" stroke="#8C610F" strokeWidth="0.8" />

          {/* Crescent Moon Blown-Glass Vessel */}
          <path
            d="M62 38 C44 42 34 58 38 76 C42 92 58 98 72 94 C56 94 48 82 46 70 C44 56 52 44 62 38 Z"
            fill="url(#ml-glass)"
            stroke="url(#ml-gold)"
            strokeWidth="1.5"
          />

          {/* Captive Starlight Flame Glow Inside */}
          <circle cx="56" cy="66" r="14" fill="url(#ml-flame)" className="animate-pulse" />
          {/* Inner Flame Core */}
          <path
            d="M56 58 C53 62 51 66 53 69 C55 72 59 72 60 69 C61 66 58 62 56 58 Z"
            fill="#FFFFFF"
          />

          {/* Gold Filigree Cage Ribs */}
          <path d="M50 38 Q42 66 50 94" stroke="url(#ml-gold)" strokeWidth="1.2" fill="none" />
          <path d="M60 38 Q52 66 64 94" stroke="url(#ml-gold)" strokeWidth="1" fill="none" strokeOpacity="0.7" />

          {/* Ornate Bottom Finial Drop */}
          <polygon points="56,95 64,95 60,102" fill="url(#ml-gold)" stroke="#8C610F" strokeWidth="0.7" />

          {/* Dangling Star Charm with Delicate Chain */}
          <g>
            <line x1="72" y1="78" x2="78" y2="92" stroke="url(#ml-gold)" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <polygon
              points="78,92 79.5,95 83,95.5 80.5,98 81.2,101 78,99.5 74.8,101 75.5,98 73,95.5 76.5,95"
              fill="url(#ml-gold)"
              stroke="#8C610F"
              strokeWidth="0.6"
            />
          </g>

          {/* Glass Specular Glint */}
          <circle cx="44" cy="50" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-amber-950 tracking-tight group-hover:text-amber-700 transition-colors">
          Moon Lantern
        </span>
        <span className="block text-[11px] text-amber-800 font-sans font-medium mt-0.5">
          Nightlight &bull; Starlight Layer
        </span>
      </div>
    </button>
  );
};

/**
 * 6. CRYSTAL PHONE (Sister Chat)
 * A miniature fantasy telephone made of pearlescent shell/quartz crystal,
 * with twin brass ringing bells, coiled cord, and sparkling rotary dial.
 */
export const CrystalTelephoneObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playSparkle();
        onActivate('chat');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-rose-400 focus:outline-none"
      title="Crystal Phone — Chat with Sisters"
      aria-label="Crystal Phone — Open Sister Chat"
    >
      <div className="relative animate-toy-phone w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-[#FCE7F3]/50 blur-xl group-hover:bg-[#FCE7F3]/80 transition-colors" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(80,30,60,0.18)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cp-pearl" x1="25" y1="45" x2="95" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFF2F7" />
              <stop offset="75%" stopColor="#F9D7E8" />
              <stop offset="100%" stopColor="#E2A6C4" />
            </linearGradient>
            <linearGradient id="cp-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF6CC" />
              <stop offset="50%" stopColor="#F4D98A" />
              <stop offset="100%" stopColor="#C48E22" />
            </linearGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="100" rx="34" ry="5.5" fill="#4A1830" fillOpacity="0.22" />

          {/* Twin Brass Ringing Bells on Top */}
          <circle cx="44" cy="36" r="6" fill="url(#cp-gold)" stroke="#8C610F" strokeWidth="0.8" />
          <circle cx="76" cy="36" r="6" fill="url(#cp-gold)" stroke="#8C610F" strokeWidth="0.8" />
          {/* Bell Hammer */}
          <rect x="58" y="32" width="4" height="6" rx="2" fill="url(#cp-gold)" />

          {/* Golden Cradle Receiver Forks */}
          <path d="M38 42 L38 34 M82 42 L82 34" stroke="url(#cp-gold)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Sculpted Handset Resting on Cradle */}
          <path
            d="M30 32 C30 28 36 28 40 32 L50 36 C56 38 64 38 70 36 L80 32 C84 28 90 28 90 32 L88 38 C84 41 78 39 74 38 L46 38 C42 39 36 41 32 38 Z"
            fill="url(#cp-pearl)"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
          {/* Handset Gold Rib Accents */}
          <line x1="42" y1="32" x2="42" y2="38" stroke="url(#cp-gold)" strokeWidth="1.5" />
          <line x1="78" y1="32" x2="78" y2="38" stroke="url(#cp-gold)" strokeWidth="1.5" />

          {/* Pearlescent Telephone Base */}
          <path
            d="M32 54 C32 48 38 46 44 46 L76 46 C82 46 88 48 88 54 L94 92 C94 96 90 98 86 98 L34 98 C30 98 26 96 26 92 Z"
            fill="url(#cp-pearl)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* Faceted Crystal Rotary Dial */}
          <circle cx="60" cy="72" r="16" fill="#FFFFFF" stroke="url(#cp-gold)" strokeWidth="1.5" />
          <circle cx="60" cy="72" r="12" fill="#FFF2F7" stroke="#E2A6C4" strokeWidth="0.8" />

          {/* Finger Holes with Pastel Gem Markers */}
          <circle cx="60" cy="63" r="2" fill="#B8DDF8" stroke="#76BCEE" strokeWidth="0.6" />
          <circle cx="66" cy="66" r="2" fill="#FCE7F3" stroke="#D95886" strokeWidth="0.6" />
          <circle cx="69" cy="72" r="2" fill="#F4D98A" stroke="#C48E22" strokeWidth="0.6" />
          <circle cx="66" cy="78" r="2" fill="#B8DDF8" stroke="#76BCEE" strokeWidth="0.6" />
          <circle cx="60" cy="81" r="2" fill="#D8C5F5" stroke="#8A5CB8" strokeWidth="0.6" />
          <circle cx="54" cy="78" r="2" fill="#6EE7B7" stroke="#059669" strokeWidth="0.6" />
          <circle cx="51" cy="72" r="2" fill="#FF8CA3" stroke="#E11D48" strokeWidth="0.6" />
          <circle cx="54" cy="66" r="2" fill="#F4D98A" stroke="#C48E22" strokeWidth="0.6" />

          {/* Dial Center Star Jewel */}
          <circle cx="60" cy="72" r="4.5" fill="url(#cp-gold)" />
          <path d="M60 69.5 L60.8 71.2 L62.5 72 L60.8 72.8 L60 74.5 L59.2 72.8 L57.5 72 L59.2 71.2 Z" fill="#FFFFFF" />

          {/* Curled Coiling Silver Cord to Handset */}
          <path
            d="M30 84 Q22 84 24 76 Q26 68 20 68 Q14 68 18 60 Q22 52 26 52 Q30 52 28 44"
            stroke="#D8C5F5"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-[#A43E68] tracking-tight group-hover:text-rose-600 transition-colors">
          Crystal Phone
        </span>
        <span className="block text-[11px] text-[#A43E68] font-sans font-medium mt-0.5">
          Sister Chat &bull; Direct Line
        </span>
      </div>
    </button>
  );
};

/**
 * 7. DREAM MAIL / ENVELOPE (Guestbook & Wish Ledger)
 * A dimensional opalescent wax-sealed letter wrapped in satin ribbon,
 * with fluttering translucent origami wings and a glowing heart seal.
 */
export const FloatingEnvelopeObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playChime(783.99, 'crystal');
        onActivate('guestbook');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none"
      title="Dream Mail — Send a Wish or Message"
      aria-label="Dream Mail — Open Guestbook"
    >
      <div className="relative animate-toy-envelope w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-emerald-200/40 blur-xl group-hover:bg-emerald-300/70 transition-colors" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(20,60,40,0.18)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="de-letter" x1="20" y1="36" x2="100" y2="88" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F2FBF7" />
              <stop offset="100%" stopColor="#D5F2E3" />
            </linearGradient>
            <linearGradient id="de-wing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#D1FAE5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.3" />
            </linearGradient>
            <radialGradient id="de-seal" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FF7A9E" />
              <stop offset="60%" stopColor="#C92A54" />
              <stop offset="100%" stopColor="#7E1230" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="100" rx="34" ry="5" fill="#0D3822" fillOpacity="0.2" />

          {/* Left Translucent Origami Fairy Wing */}
          <g>
            <path
              d="M32 54 C12 38 6 52 14 68 C18 76 28 72 32 64 Z"
              fill="url(#de-wing)"
              stroke="#A7F3D0"
              strokeWidth="1"
            />
            <line x1="20" y1="52" x2="28" y2="62" stroke="#FFFFFF" strokeWidth="0.8" />
            <line x1="16" y1="62" x2="28" y2="63" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>

          {/* Right Translucent Origami Fairy Wing */}
          <g>
            <path
              d="M88 54 C108 38 114 52 106 68 C102 76 92 72 88 64 Z"
              fill="url(#de-wing)"
              stroke="#A7F3D0"
              strokeWidth="1"
            />
            <line x1="100" y1="52" x2="92" y2="62" stroke="#FFFFFF" strokeWidth="0.8" />
            <line x1="104" y1="62" x2="92" y2="63" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>

          {/* Dimensional Envelope Body */}
          <rect x="24" y="42" width="72" height="46" rx="8" fill="url(#de-letter)" stroke="#6EE7B7" strokeWidth="1.2" />

          {/* Folded Envelope Flap Lines */}
          <path d="M24 44 L60 68 L96 44" stroke="#A7F3D0" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          <path d="M24 86 L48 64 M96 86 L72 64" stroke="#A7F3D0" strokeWidth="1" strokeOpacity="0.7" />

          {/* Crossed Satin Ribbon */}
          <line x1="60" y1="42" x2="60" y2="88" stroke="#FCE7F3" strokeWidth="5" strokeOpacity="0.8" />
          <line x1="24" y1="65" x2="96" y2="65" stroke="#FCE7F3" strokeWidth="5" strokeOpacity="0.8" />

          {/* Sculpted Wax Seal with Glowing Heart */}
          <circle cx="60" cy="65" r="9.5" fill="url(#de-seal)" stroke="#FFD1DC" strokeWidth="0.8" />
          {/* Embossed Wax Scallop Edges */}
          <circle cx="60" cy="65" r="8" fill="none" stroke="#FFA6BD" strokeWidth="0.6" strokeDasharray="3 1.5" />
          {/* Heart Emblem */}
          <path
            d="M60 62 C58.5 59.5 55 60 55 63 C55 66 60 69 60 69 C60 69 65 66 65 63 C65 60 61.5 59.5 60 62 Z"
            fill="#FFFFFF"
          />

          {/* Starlight Cancellation Stamp in Top Right */}
          <circle cx="84" cy="52" r="5" stroke="#A7F3D0" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" />
          <path d="M84 49 L84 55 M81 52 L87 52" stroke="#6EE7B7" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-emerald-950 tracking-tight group-hover:text-emerald-700 transition-colors">
          Dream Mail
        </span>
        <span className="block text-[11px] text-emerald-800 font-sans font-medium mt-0.5">
          Guestbook &bull; Wish Ledger
        </span>
      </div>
    </button>
  );
};

/**
 * 8. SECRET CELESTIAL LOCKET (Secret Lore)
 * An ornate gold and star-sapphire pendant that clicks open
 * to reveal an iridescent starlight aperture and sister lore.
 */
export const CelestialLocketObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playSparkle();
        onActivate('easter-egg');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#F4D98A] focus:outline-none"
      title="Celestial Locket — Discover Secret Lore"
      aria-label="Celestial Locket — Open Secret Lore"
    >
      <div className="relative animate-toy-locket w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-radial from-[#F4D98A]/60 via-[#A43E68]/30 to-transparent blur-xl group-hover:scale-110 transition-transform" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_18px_rgba(80,20,50,0.24)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cl-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF8D6" />
              <stop offset="40%" stopColor="#F4D98A" />
              <stop offset="80%" stopColor="#C9972E" />
              <stop offset="100%" stopColor="#8A6014" />
            </linearGradient>
            <radialGradient id="cl-sapphire" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#A8D8FD" />
              <stop offset="35%" stopColor="#4A8FE7" />
              <stop offset="75%" stopColor="#1C408A" />
              <stop offset="100%" stopColor="#0B1A42" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="102" rx="30" ry="5" fill="#3D1222" fillOpacity="0.24" />

          {/* Top Hanging Bail Ring */}
          <circle cx="60" cy="20" r="5" stroke="url(#cl-gold)" strokeWidth="2.5" fill="none" />
          <circle cx="60" cy="25" r="3" fill="url(#cl-gold)" />

          {/* Outer Heavy Gold Filigree Locket Body */}
          <circle cx="60" cy="64" r="34" fill="url(#cl-gold)" stroke="#8A6014" strokeWidth="1.5" />

          {/* Beaded Milgrain Decorative Rim */}
          <circle cx="60" cy="64" r="30" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="1.5 2.5" />

          {/* Inner Inset Deep Star-Sapphire Gemstone */}
          <circle cx="60" cy="64" r="24" fill="url(#cl-sapphire)" stroke="url(#cl-gold)" strokeWidth="1.8" />

          {/* 6-Ray Star-Sapphire Asterism */}
          <g stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85">
            <line x1="60" y1="46" x2="60" y2="82" />
            <line x1="44" y1="55" x2="76" y2="73" />
            <line x1="44" y1="73" x2="76" y2="55" />
          </g>

          {/* Diamond-Cut Pavé Rim Points */}
          <circle cx="60" cy="38" r="1.5" fill="#FFFFFF" />
          <circle cx="86" cy="64" r="1.5" fill="#FFFFFF" />
          <circle cx="60" cy="90" r="1.5" fill="#FFFFFF" />
          <circle cx="34" cy="64" r="1.5" fill="#FFFFFF" />

          {/* Miniature Left Hinge */}
          <rect x="24" y="60" width="3.5" height="8" rx="1.5" fill="url(#cl-gold)" stroke="#8A6014" strokeWidth="0.8" />

          {/* Miniature Right Click Latch */}
          <rect x="92.5" y="61" width="3.5" height="6" rx="1.5" fill="url(#cl-gold)" stroke="#8A6014" strokeWidth="0.8" />

          {/* Radiant Starlight Prism Glint in Center */}
          <circle cx="60" cy="64" r="3.5" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-[#A43E68] tracking-tight group-hover:text-amber-600 transition-colors">
          Secret Locket
        </span>
        <span className="block text-[11px] text-[#A43E68] font-sans font-medium mt-0.5">
          Sister Lore &bull; Lake Secret
        </span>
      </div>
    </button>
  );
};

/**
 * 9. ROYAL TWIN CAMEO (Character Profiles)
 * A vintage porcelain & rose-gold cameo medallion depicting Zoey and Lily's
 * twin silhouettes crowned with delicate pearls and floating tiara sparkles.
 */
export const CharacterProfilesObject: React.FC<MagicalObjectProps> = ({ onActivate }) => {
  return (
    <button
      onClick={() => {
        fairytaleAudio.playChime(880, 'crystal');
        onActivate('profiles');
      }}
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#A43E68] focus:outline-none"
      title="Royal Twin Cameo — Character Dossiers & Backstories"
      aria-label="Royal Twin Cameo — Open Character Profiles"
    >
      <div className="relative animate-toy-cameo w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#B8DDF8]/40 to-[#D8C5F5]/40 blur-xl group-hover:scale-110 transition-transform" />

        <svg
          viewBox="0 0 120 120"
          className="w-full h-full filter drop-shadow-[0_8px_18px_rgba(70,30,50,0.22)] transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rtc-rosegold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF0F5" />
              <stop offset="40%" stopColor="#F5B8CC" />
              <stop offset="80%" stopColor="#D97598" />
              <stop offset="100%" stopColor="#9C3A5E" />
            </linearGradient>
            <linearGradient id="rtc-porcelain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F2338" />
              <stop offset="50%" stopColor="#4A3459" />
              <stop offset="100%" stopColor="#221829" />
            </linearGradient>
            <radialGradient id="rtc-pearl" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFF0F5" />
              <stop offset="100%" stopColor="#E5C0D0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="60" cy="104" rx="28" ry="4.5" fill="#2D1220" fillOpacity="0.22" />

          {/* Top Royal Twin Tiara Crest */}
          <path
            d="M50 20 L55 26 L60 17 L65 26 L70 20 L68 28 L52 28 Z"
            fill="url(#rtc-rosegold)"
            stroke="#9C3A5E"
            strokeWidth="0.8"
          />
          <circle cx="60" cy="17" r="1.5" fill="#FFFFFF" />
          <circle cx="50" cy="20" r="1.2" fill="#B8DDF8" />
          <circle cx="70" cy="20" r="1.2" fill="#FCE7F3" />

          {/* Ornate Oval Rose-Gold Brooch Frame */}
          <ellipse cx="60" cy="64" rx="30" ry="36" fill="url(#rtc-rosegold)" stroke="#9C3A5E" strokeWidth="1.5" />

          {/* Freshwater Seed Pearls Border Ring */}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / 18;
            const px = 60 + 26.5 * Math.cos(angle);
            const py = 64 + 32.5 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={px}
                cy={py}
                r="2.2"
                fill="url(#rtc-pearl)"
                stroke="#D97598"
                strokeWidth="0.4"
              />
            );
          })}

          {/* Matte Porcelain Center Oval */}
          <ellipse cx="60" cy="64" rx="21" ry="27" fill="url(#rtc-porcelain)" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Hand-Carved Ivory Twin Profiles Facing Each Other */}
          {/* Left: Zoey (Crystal Frost Tiara & Ponytail) */}
          <g fill="#FFFDF8">
            <ellipse cx="53" cy="58" rx="4.5" ry="5.5" />
            {/* Nose & Chin Silhouette Profile */}
            <path d="M54 56 C57 58 57 62 55 64 C53 66 51 68 51 72 L45 72 C45 68 47 64 49 61 Z" />
            {/* Flowing Ponytail / Snowflake Crest */}
            <path d="M48 55 C43 54 41 62 44 68 C46 64 47 60 48 58 Z" />
            <circle cx="51" cy="53" r="1" fill="#B8DDF8" />
          </g>

          {/* Right: Lily (Aurora Blossom & Starlit Bun) */}
          <g fill="#FFFDF8">
            <ellipse cx="67" cy="58" rx="4.5" ry="5.5" />
            {/* Nose & Chin Silhouette Profile */}
            <path d="M66 56 C63 58 63 62 65 64 C67 66 69 68 69 72 L75 72 C75 68 73 64 71 61 Z" />
            {/* Floral Bun & Crown */}
            <path d="M72 55 C77 54 79 62 76 68 C74 64 73 60 72 58 Z" />
            <circle cx="69" cy="53" r="1" fill="#FCE7F3" />
          </g>

          {/* Delicate Center Star Separator */}
          <path d="M60 52 L60.8 54 L63 54.8 L60.8 55.6 L60 57.5 L59.2 55.6 L57 54.8 L59.2 54 Z" fill="#F4D98A" />
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="block font-fairytale text-sm font-bold text-[#2D221E] tracking-tight group-hover:text-[#A43E68] transition-colors">
          Character Profiles
        </span>
        <span className="block text-[11px] text-[#A43E68] font-sans font-medium mt-0.5">
          Royal Dossiers &bull; Voices
        </span>
      </div>
    </button>
  );
};
