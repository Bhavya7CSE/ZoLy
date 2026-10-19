import React, { useState } from 'react';
import { ActiveView } from '../types';
import { fairytaleAudio } from '../audio/synthEngine';

interface ToyActivityGridProps {
  onSelectActivity: (activity: ActiveView) => void;
}

export const ToyActivityGrid: React.FC<ToyActivityGridProps> = ({ onSelectActivity }) => {
  // State for interactive toggle switches
  const [radioOn, setRadioOn] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [bookUnlocked, setBookUnlocked] = useState(false);
  const [gamePower, setGamePower] = useState(false);
  const [lampLit, setLampLit] = useState(false);
  const [phoneRinging, setPhoneRinging] = useState(false);
  const [mailboxOpen, setMailboxOpen] = useState(false);
  const [locketUnlocked, setLocketUnlocked] = useState(false);

  function handleToggleRadio(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !radioOn;
    setRadioOn(next);
    if (next) {
      fairytaleAudio.startLullaby('zoey');
    } else {
      fairytaleAudio.stopLullaby();
    }
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8" aria-label="Enchanted Interactive Activities">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
        <div>
          <h2 className="font-fairytale text-2xl sm:text-3xl text-[#2D221E] font-bold flex items-center gap-2">
            <span>Enchanted Activity Toggles</span>
            <span className="text-sm font-normal text-[#A43E68] font-mono-tech px-2.5 py-0.5 rounded-full bg-[#A43E68]/10 border border-[#A43E68]/20">
              Interactive Toys
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#2D221E]/70 font-sans mt-0.5">
            Tactile magical objects &bull; Flip switches, turn dials, and wake the sleeping radio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. ZOEY SLEEPING ON RADIO TOGGLE (Lullaby Lab) */}
        <div
          onClick={() => onSelectActivity('lullaby')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            radioOn
              ? 'bg-gradient-to-b from-[#B8DDF8]/70 via-white to-[#E2F1FC] border-[#4a9be8] ring-2 ring-[#B8DDF8]'
              : 'bg-white/80 border-[#B8DDF8]/70'
          }`}
        >
          {/* Top scene: Zoey sleeping peacefully on top of the radio */}
          <div className="relative mb-3 flex items-center justify-between">
            <div className="relative">
              {/* Sleeping Zoey miniature diorama */}
              <div className="flex items-center gap-2 bg-[#FFF8F1] px-3 py-1.5 rounded-2xl border border-[#B8DDF8] shadow-xs">
                <span className="text-2xl animate-float">😴</span>
                <div className="text-[11px] font-fairytale leading-tight">
                  <span className="font-bold text-[#182635]">Zoey sleeps</span>
                  <div className="text-[9px] text-[#4a9be8] font-mono-tech">
                    {radioOn ? 'Zzz... ♫ ♩' : 'waiting for song'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tactile Radio Power Toggle Switch */}
            <button
              onClick={handleToggleRadio}
              className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer p-0.5 shadow-inner ${
                radioOn ? 'bg-[#4a9be8]' : 'bg-stone-300'
              }`}
              title="Toggle Lullaby Radio On/Off"
              aria-label="Toggle Lullaby Radio"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform flex items-center justify-center text-[9px] ${
                  radioOn ? 'translate-x-6 text-[#4a9be8]' : 'translate-x-0 text-stone-400'
                }`}
              >
                {radioOn ? '♫' : '○'}
              </div>
            </button>
          </div>

          {/* Radio body styling */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#d0eaff]/40 to-white border border-[#B8DDF8]/60 mb-2">
            <div className="flex items-center justify-between text-[10px] font-mono-tech text-[#182635] mb-1">
              <span>FM 88.5 &bull; Lullaby Radio</span>
              <span className={`px-1.5 py-0.2 rounded ${radioOn ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>
                {radioOn ? 'ON AIR' : 'SLEEP'}
              </span>
            </div>
            {/* Speaker grill lines */}
            <div className="space-y-1 my-1.5 opacity-60">
              <div className="h-1 bg-[#4a9be8]/40 rounded-full w-full" />
              <div className="h-1 bg-[#4a9be8]/40 rounded-full w-4/5" />
              <div className="h-1 bg-[#4a9be8]/40 rounded-full w-full" />
            </div>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#182635] leading-tight">
              Lullaby Radio
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Flip the radio switch to play Zoey's bedtime tunes
            </p>
          </div>
        </div>

        {/* 2. DREAM MAP PARCHMENT TOGGLE */}
        <div
          onClick={() => onSelectActivity('map')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            mapOpen
              ? 'bg-gradient-to-b from-[#F4D98A]/40 via-white to-[#FFF8F1] border-[#F4D98A] ring-2 ring-[#F4D98A]'
              : 'bg-white/80 border-[#F4D98A]/60'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xl shadow-xs">
              🧭
            </div>

            {/* Brass Clasp Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMapOpen(!mapOpen);
                fairytaleAudio.playChime(659.25, 'warm');
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono-tech font-bold border transition-all cursor-pointer ${
                mapOpen
                  ? 'bg-[#F4D98A] text-amber-950 border-amber-400 shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {mapOpen ? 'Unfolded 🗺️' : 'Unroll Map 📜'}
            </button>
          </div>

          <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 mb-2 font-mono-tech text-[10px] text-amber-900">
            <div className="flex justify-between items-center mb-1">
              <span>Lake Route</span>
              <span className="text-[#A43E68]">✦ Active</span>
            </div>
            <div className="w-full bg-amber-200/70 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#A43E68] h-full w-3/4 animate-pulse" />
            </div>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#2D221E] leading-tight">
              Dream Delivery Map
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Unroll the celestial coordinates across the moonlit lake
            </p>
          </div>
        </div>

        {/* 3. STORYBOOK CLASP TOGGLE */}
        <div
          onClick={() => onSelectActivity('storybook')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            bookUnlocked
              ? 'bg-gradient-to-b from-[#D8C5F5]/40 via-white to-[#FCE7F3] border-[#8a5cb8] ring-2 ring-[#D8C5F5]'
              : 'bg-white/80 border-[#D8C5F5]/70'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-xl shadow-xs">
              📖
            </div>

            {/* Gilded Book Clasp Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBookUnlocked(!bookUnlocked);
                fairytaleAudio.playChime(783.99, 'warm');
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono-tech font-bold border transition-all cursor-pointer ${
                bookUnlocked
                  ? 'bg-[#D8C5F5] text-purple-950 border-purple-400 shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {bookUnlocked ? 'Clasp Open 🔓' : 'Clasp Locked 🔒'}
            </button>
          </div>

          <div className="p-2.5 rounded-2xl bg-purple-50/70 border border-purple-200/60 mb-2 text-[10px] font-mono-tech text-purple-900 flex items-center justify-between">
            <span>6 Illustrated Chapters</span>
            <span className="text-purple-600 font-bold">&rarr; Read</span>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#2D221E] leading-tight">
              Interactive Storybook
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Unlock the gilded ribbon to turn pages of their origin tale
            </p>
          </div>
        </div>

        {/* 4. ARCADE TOY CONSOLE TOGGLE */}
        <div
          onClick={() => onSelectActivity('game')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            gamePower
              ? 'bg-gradient-to-b from-[#B8DDF8]/40 via-white to-[#D8C5F5]/30 border-[#4a9be8] ring-2 ring-[#B8DDF8]'
              : 'bg-white/80 border-[#B8DDF8]/70'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 border border-sky-300 flex items-center justify-center text-xl shadow-xs">
              🎮
            </div>

            {/* Arcade Power Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setGamePower(!gamePower);
                fairytaleAudio.playSparkle();
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono-tech font-bold border transition-all cursor-pointer ${
                gamePower
                  ? 'bg-emerald-400 text-emerald-950 border-emerald-500 shadow-xs animate-pulse'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {gamePower ? 'POWER ON ⚡' : 'STANDBY ⏻'}
            </button>
          </div>

          <div className="p-2 rounded-2xl bg-stone-900 border border-stone-700 mb-2 flex items-center justify-between px-3 text-[10px] font-mono-tech text-emerald-400">
            <span>🫧 ⭐ 🌙</span>
            <span>30 SEC CATCH</span>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#2D221E] leading-tight">
              Catch Mini-Game
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Power on the handheld console to pop floating bubbles
            </p>
          </div>
        </div>

        {/* 5. MOONLIGHT NIGHTLAMP PULL-CHAIN TOGGLE */}
        <div
          onClick={() => onSelectActivity('nightlight')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            lampLit
              ? 'bg-gradient-to-b from-amber-100 via-white to-amber-50 border-amber-400 ring-2 ring-amber-300'
              : 'bg-white/80 border-amber-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-xs transition-colors ${lampLit ? 'bg-amber-300' : 'bg-stone-100'}`}>
              🕯️
            </div>

            {/* Pull Chain Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLampLit(!lampLit);
                fairytaleAudio.playChime(lampLit ? 520 : 880, 'crystal');
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono-tech font-bold border transition-all cursor-pointer ${
                lampLit
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {lampLit ? 'Lamp Lit ✨' : 'Pull Chain 💡'}
            </button>
          </div>

          <div className="p-2 rounded-2xl bg-amber-100/50 border border-amber-200 mb-2 text-[10px] font-mono-tech text-amber-900 flex items-center justify-between">
            <span>Hidden Layer Reveal</span>
            <span>Torch 🔦</span>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#2D221E] leading-tight">
              Bedside Nightlamp
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Click the lamp chain to illuminate secrets in the dark
            </p>
          </div>
        </div>

        {/* 6. SISTER CHAT STRING-PHONE TOGGLE */}
        <div
          onClick={() => onSelectActivity('chat')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            phoneRinging
              ? 'bg-gradient-to-b from-[#FCE7F3] via-white to-[#FFF8F1] border-[#A43E68] ring-2 ring-rose-200'
              : 'bg-white/80 border-rose-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center text-xl shadow-xs">
              💬
            </div>

            {/* Call Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPhoneRinging(!phoneRinging);
                fairytaleAudio.playSparkle();
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono-tech font-bold border transition-all cursor-pointer ${
                phoneRinging
                  ? 'bg-[#A43E68] text-white border-[#A43E68] shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {phoneRinging ? 'Ringing 📞' : 'Ring Bell 🔔'}
            </button>
          </div>

          <div className="p-2 rounded-2xl bg-rose-50 border border-rose-200 mb-2 text-[10px] font-mono-tech text-[#A43E68] flex items-center justify-between">
            <span>Crystal String Line</span>
            <span>Direct</span>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#2D221E] leading-tight">
              Sister Chat
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Ring the tin-can phone to speak directly with the princesses
            </p>
          </div>
        </div>

        {/* 7. DREAM MAILBOX TOGGLE */}
        <div
          onClick={() => onSelectActivity('guestbook')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            mailboxOpen
              ? 'bg-gradient-to-b from-emerald-100 via-white to-teal-50 border-emerald-400 ring-2 ring-emerald-200'
              : 'bg-white/80 border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-xl shadow-xs">
              ✉️
            </div>

            {/* Mailbox Flag Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMailboxOpen(!mailboxOpen);
                fairytaleAudio.playChime(659.25, 'crystal');
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono-tech font-bold border transition-all cursor-pointer ${
                mailboxOpen
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {mailboxOpen ? 'Flag Up 🚩' : 'Drop Mail 📮'}
            </button>
          </div>

          <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200 mb-2 text-[10px] font-mono-tech text-emerald-800 flex items-center justify-between">
            <span>Wishes Ledger</span>
            <span>Recorded ✍️</span>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#2D221E] leading-tight">
              Dream Mailbox
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Raise the mailbox flag to deliver a wish to their guestbook
            </p>
          </div>
        </div>

        {/* 8. SECRET LOCKET TOGGLE */}
        <div
          onClick={() => onSelectActivity('easter-egg')}
          className={`relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden ${
            locketUnlocked
              ? 'bg-gradient-to-b from-[#A43E68]/20 via-[#D8C5F5]/30 to-[#FFF8F1] border-[#A43E68] ring-2 ring-[#A43E68]/40'
              : 'bg-white/80 border-[#A43E68]/30'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 border border-pink-300 flex items-center justify-center text-xl shadow-xs">
              🔮
            </div>

            {/* Locket Key Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLocketUnlocked(!locketUnlocked);
                fairytaleAudio.playSparkle();
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono-tech font-bold border transition-all cursor-pointer ${
                locketUnlocked
                  ? 'bg-[#A43E68] text-white border-[#A43E68] shadow-xs'
                  : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}
            >
              {locketUnlocked ? 'Unlocked 🗝️' : 'Turn Key 🔑'}
            </button>
          </div>

          <div className="p-2 rounded-2xl bg-pink-50 border border-pink-200 mb-2 text-[10px] font-mono-tech text-[#A43E68] flex items-center justify-between">
            <span>Secret Lake Lore</span>
            <span>Keeper ✦</span>
          </div>

          <div>
            <h3 className="font-fairytale font-bold text-base text-[#2D221E] leading-tight">
              Celestial Locket
            </h3>
            <p className="text-[11px] text-[#2D221E]/65 mt-0.5 leading-snug">
              Turn the starry key to reveal the hidden sister secret
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
