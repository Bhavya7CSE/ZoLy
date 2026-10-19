import React from 'react';
import { Mood } from '../types';
import { fairytaleAudio } from '../audio/synthEngine';

interface CelestialMoodDialProps {
  activeMood: Mood;
  onSelectMood: (mood: Mood) => void;
}

interface MoodFacet {
  id: Mood;
  label: string;
  symbol: string;
  color: string;
  glow: string;
  hint: string;
}

const MOODS: MoodFacet[] = [
  {
    id: 'happy',
    label: 'Happy',
    symbol: '🌸',
    color: 'from-[#FCE7F3] to-[#F4D98A]',
    glow: 'rgba(252, 231, 243, 0.8)',
    hint: 'Buoyant floating & joyful giggles',
  },
  {
    id: 'sleepy',
    label: 'Sleepy',
    symbol: '💤',
    color: 'from-[#1a233a] to-[#2e3d5e]',
    glow: 'rgba(184, 221, 248, 0.6)',
    hint: 'Drowsy half-closed eyes & calm breathing',
  },
  {
    id: 'dreamy',
    label: 'Dreamy',
    symbol: '🌌',
    color: 'from-[#D8C5F5] to-[#B8DDF8]',
    glow: 'rgba(216, 197, 245, 0.8)',
    hint: 'Gazing up at the celestial stars',
  },
  {
    id: 'sparkling',
    label: 'Sparkling',
    symbol: '✦',
    color: 'from-[#FFF8F1] to-[#F4D98A]',
    glow: 'rgba(244, 217, 138, 0.9)',
    hint: 'Prismatic light & spinning crowns',
  },
];

export const CelestialMoodDial: React.FC<CelestialMoodDialProps> = ({
  activeMood,
  onSelectMood,
}) => {
  return (
    <div
      className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/50 backdrop-blur-md border border-[#2D221E]/15 shadow-sm"
      role="radiogroup"
      aria-label="Celestial Mood Amulet"
    >
      <span className="text-[10px] font-mono-tech text-[#A43E68] font-bold px-2 hidden sm:inline uppercase tracking-widest">
        Mood Amulet
      </span>

      <div className="flex items-center gap-1">
        {MOODS.map((m) => {
          const isActive = activeMood === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                onSelectMood(m.id);
                fairytaleAudio.playChime(
                  m.id === 'happy' ? 783.99 : m.id === 'sparkling' ? 987.77 : m.id === 'dreamy' ? 659.25 : 523.25,
                  m.id === 'sleepy' ? 'warm' : 'crystal'
                );
              }}
              role="radio"
              aria-checked={isActive}
              title={`${m.label}: ${m.hint}`}
              aria-label={`Set mood to ${m.label}`}
              className={`group relative flex items-center gap-1 px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r ' + m.color + ' text-[#2D221E] font-bold shadow-md scale-105 ring-1 ring-white'
                  : 'hover:bg-white/60 text-[#2D221E]/75 hover:scale-102'
              }`}
            >
              <span className={`text-xs transition-transform ${isActive ? 'rotate-12 scale-110' : 'group-hover:rotate-6'}`}>
                {m.symbol}
              </span>
              <span className="text-[11px] font-fairytale capitalize">
                {m.label}
              </span>

              {/* Glowing halo when active */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full animate-pulse-soft pointer-events-none opacity-50"
                  style={{ boxShadow: `0 0 10px ${m.glow}` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
