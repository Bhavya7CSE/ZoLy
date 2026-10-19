import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, RotateCw, Volume2, Sparkles } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface LullabyLabProps {
  onClose: () => void;
}

export const LullabyLab: React.FC<LullabyLabProps> = ({ onClose }) => {
  const [playingTrack, setPlayingTrack] = useState<'zoey' | 'lily' | null>(null);
  const [zoeyTime, setZoeyTime] = useState(0);
  const [lilyTime, setLilyTime] = useState(0);

  useEffect(() => {
    return () => {
      fairytaleAudio.stopLullaby();
    };
  }, []);

  function handlePlayZoey() {
    if (playingTrack === 'zoey') {
      fairytaleAudio.stopLullaby();
      setPlayingTrack(null);
    } else {
      setPlayingTrack('zoey');
      fairytaleAudio.startLullaby('zoey', (curr) => setZoeyTime(curr));
    }
  }

  function handlePlayLily() {
    if (playingTrack === 'lily') {
      fairytaleAudio.stopLullaby();
      setPlayingTrack(null);
    } else {
      setPlayingTrack('lily');
      fairytaleAudio.startLullaby('lily', (curr) => setLilyTime(curr));
    }
  }

  function formatTime(sec: number) {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFF8F1] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2D221E]/10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
          aria-label="Close Lullaby Lab"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-3xl">🎵</span>
          <h2 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#2D221E] mt-1">
            Lullaby Lab
          </h2>
          <p className="text-xs sm:text-sm text-[#2D221E]/70 max-w-md mx-auto mt-1">
            Synthesized magical music boxes for Zoey &amp; Lily. Powered by live Web Audio API chords.
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zoey's Music Box */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              playingTrack === 'zoey'
                ? 'bg-gradient-to-b from-[#B8DDF8]/50 to-white border-[#4a9be8] shadow-lg ring-2 ring-[#B8DDF8]'
                : 'bg-white/80 border-[#B8DDF8]/70 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">❄️</span>
                <div>
                  <h3 className="font-fairytale font-bold text-[#182635] text-base leading-tight">
                    Snowflake Dreams
                  </h3>
                  <span className="text-[11px] text-[#4a9be8] font-medium">Zoey's Music Box</span>
                </div>
              </div>
              {playingTrack === 'zoey' && (
                <span className="flex items-center gap-1 text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#B8DDF8] text-[#182635] animate-pulse">
                  <Sparkles className="w-3 h-3" /> Playing
                </span>
              )}
            </div>

            {/* Visualizer Bar */}
            <div className="w-full bg-stone-100 rounded-full h-2 mb-3 overflow-hidden">
              <div
                className="bg-[#4a9be8] h-full transition-all duration-300"
                style={{ width: `${(zoeyTime / 32) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-stone-500 font-mono-tech mb-4">
              <span>{formatTime(zoeyTime)}</span>
              <span>0:32</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setZoeyTime((t) => Math.max(0, t - 5))}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Rewind 5s"
                aria-label="Rewind 5s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handlePlayZoey}
                className="p-3.5 rounded-full bg-[#4a9be8] hover:bg-[#3b8bd6] text-white shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label={playingTrack === 'zoey' ? 'Pause Snowflake Dreams' : 'Play Snowflake Dreams'}
              >
                {playingTrack === 'zoey' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button
                onClick={() => setZoeyTime((t) => Math.min(32, t + 5))}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Forward 5s"
                aria-label="Forward 5s"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lily's Music Box */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              playingTrack === 'lily'
                ? 'bg-gradient-to-b from-[#D8C5F5]/50 to-white border-[#8a5cb8] shadow-lg ring-2 ring-[#D8C5F5]'
                : 'bg-white/80 border-[#D8C5F5]/70 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌙</span>
                <div>
                  <h3 className="font-fairytale font-bold text-[#2d1b38] text-base leading-tight">
                    Moonbeam Wishes
                  </h3>
                  <span className="text-[11px] text-[#8a5cb8] font-medium">Lily's Music Box</span>
                </div>
              </div>
              {playingTrack === 'lily' && (
                <span className="flex items-center gap-1 text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#D8C5F5] text-[#2d1b38] animate-pulse">
                  <Sparkles className="w-3 h-3" /> Playing
                </span>
              )}
            </div>

            {/* Visualizer Bar */}
            <div className="w-full bg-stone-100 rounded-full h-2 mb-3 overflow-hidden">
              <div
                className="bg-[#8a5cb8] h-full transition-all duration-300"
                style={{ width: `${(lilyTime / 32) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-stone-500 font-mono-tech mb-4">
              <span>{formatTime(lilyTime)}</span>
              <span>0:32</span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setLilyTime((t) => Math.max(0, t - 5))}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Rewind 5s"
                aria-label="Rewind 5s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handlePlayLily}
                className="p-3.5 rounded-full bg-[#8a5cb8] hover:bg-[#784ca4] text-white shadow-md active:scale-95 transition-all cursor-pointer"
                aria-label={playingTrack === 'lily' ? 'Pause Moonbeam Wishes' : 'Play Moonbeam Wishes'}
              >
                {playingTrack === 'lily' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button
                onClick={() => setLilyTime((t) => Math.min(32, t + 5))}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                title="Forward 5s"
                aria-label="Forward 5s"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Safety & Hackathon compliance note */}
        <div className="mt-6 p-3 rounded-2xl bg-[#FFF8F1] border border-[#2D221E]/10 flex items-center justify-between text-xs text-[#2D221E]/70 font-mono-tech">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#A43E68]" />
            <span>Web Audio API active &bull; Synthesized original compositions</span>
          </div>
          <span className="text-[#A43E68] font-bold">haX.baby Tier 2</span>
        </div>
      </div>
    </div>
  );
};
