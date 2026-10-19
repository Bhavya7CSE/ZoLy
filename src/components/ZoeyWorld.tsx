import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, MessageCircle, Music, BookOpen, Gamepad2, Lamp, Volume2, VolumeX, Play, Pause, Volume1 } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';
import { ActiveView } from '../types';

interface ZoeyWorldProps {
  onBack: () => void;
  onOpenActivity: (activity: ActiveView) => void;
  onOpenChat: () => void;
}

interface FloatingBubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const ZoeyWorld: React.FC<ZoeyWorldProps> = ({ onBack, onOpenActivity, onOpenChat }) => {
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const [happinessLevel, setHappinessLevel] = useState(1);
  const [moodText, setMoodText] = useState('Zoey is gently watching the snowflakes fall.');

  // Princess tells about herself state
  const [isTellingStory, setIsTellingStory] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [isSpeakingAloud, setIsSpeakingAloud] = useState(false);

  // Dedicated lullaby player state
  const [isPlayingLullaby, setIsPlayingLullaby] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(fairytaleAudio.getMuted());
  const [lullabyProgress, setLullabyProgress] = useState(0);

  const zoeyStoryParagraphs = [
    "Hello little dreamer! ❄️ I am Princess Zoey. Long before the kingdom had castles, a single silver wish rose from the quiet lake.",
    "The moon heard it and wrapped me in the icy-blue starlight of North Peak. Whenever something fills my heart with joy, iridescent bubbles bloom from my hands!",
    "Each bubble floats across the clouds carrying a gentle bedtime thought to my beloved sister Lily. We are forever connected by starlight.",
  ];

  // Sync with audio engine
  useEffect(() => {
    const unsub = fairytaleAudio.subscribe(() => {
      setIsAudioMuted(fairytaleAudio.getMuted());
      setIsPlayingLullaby(fairytaleAudio.getPlayingTrack() === 'zoey');
    });
    return () => {
      unsub();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function makeZoeyHappy() {
    fairytaleAudio.playChime(739.99, 'crystal');
    setHappinessLevel((prev) => Math.min(prev + 1, 10));

    // Spawn 6 joyful bubbles
    const newBubbles: FloatingBubble[] = [];
    for (let i = 0; i < 6; i++) {
      newBubbles.push({
        id: Date.now() + i,
        x: 20 + Math.random() * 60,
        y: 30 + Math.random() * 40,
        size: 24 + Math.random() * 32,
      });
    }
    setBubbles((prev) => [...prev, ...newBubbles]);
    setMoodText('Zoey giggles softly! Her happiness blooms into iridescent crystal bubbles!');

    setTimeout(() => {
      setBubbles((prev) => prev.slice(6));
    }, 3500);
  }

  // Feature: Zoey tells about herself
  function handleToggleTellStory() {
    const next = !isTellingStory;
    setIsTellingStory(next);
    setStoryStep(0);
    fairytaleAudio.playChime(880, 'crystal');

    if (next) {
      makeZoeyHappy();
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeakingAloud(false);
      }
    }
  }

  function handleSpeakAloud() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeakingAloud) {
      window.speechSynthesis.cancel();
      setIsSpeakingAloud(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(zoeyStoryParagraphs[storyStep]);
    utterance.pitch = 1.35;
    utterance.rate = 0.88;
    utterance.onend = () => setIsSpeakingAloud(false);
    utterance.onerror = () => setIsSpeakingAloud(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeakingAloud(true);
  }

  // Feature: Dedicated Lullaby with Nearby Mute
  function handleToggleLullaby() {
    if (isPlayingLullaby) {
      fairytaleAudio.stopLullaby();
      setIsPlayingLullaby(false);
    } else {
      fairytaleAudio.startLullaby('zoey', (curr, total) => {
        setLullabyProgress((curr / total) * 100);
      });
      setIsPlayingLullaby(true);
    }
  }

  function handleToggleNearbyMute() {
    const nextMuted = !isAudioMuted;
    fairytaleAudio.setMuted(nextMuted);
    setIsAudioMuted(nextMuted);
  }

  return (
    <div className="relative min-h-[92vh] w-full bg-gradient-to-b from-[#E2F1FC] via-[#B8DDF8]/30 to-[#FFF8F1] px-4 sm:px-8 py-6 flex flex-col justify-between overflow-hidden">
      {/* Animated Crystal Snowflake Sky Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg viewBox="0 0 1200 400" className="w-full h-96 -top-10 absolute">
          <defs>
            <linearGradient id="crystalSkyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8DDF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#E2F1FC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            d="M 0,80 Q 300,140 600,60 T 1200,90 L 1200,0 L 0,0 Z"
            fill="url(#crystalSkyGrad)"
            className="animate-pulse duration-3000"
          />
        </svg>
      </div>

      {/* Back button & Location */}
      <div className="relative z-20 flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-[#182635] border border-[#B8DDF8] shadow-sm transition-all active:scale-95 cursor-pointer text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Entrance
        </button>

        <span className="px-3 py-1 rounded-full bg-[#B8DDF8]/70 border border-[#4a9be8]/40 text-xs text-[#182635] font-mono-tech">
          ❄️ Crystal Kingdom &bull; North Peak
        </span>
      </div>

      {/* Main World Content */}
      <div className="relative z-10 max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start my-auto">
        {/* Zoey Character Presentation */}
        <div className="relative flex flex-col items-center text-center">
          {/* Crystal Glow Ring */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#B8DDF8] via-white to-[#d0eaff] p-3 shadow-2xl border-4 border-white flex items-center justify-center animate-float">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#b8ddf8]/40 to-[#e2f1fc] flex flex-col items-center justify-center p-6 border border-white/60 shadow-inner">
              <span className="text-6xl mb-2 select-none filter drop-shadow">❄️</span>
              <div className="font-fairytale font-bold text-2xl text-[#182635]">
                Princess Zoey
              </div>
              <p className="text-xs text-[#4a9be8] font-medium mt-1">
                Bearer of the Crystal Spark
              </p>
              <div className="mt-3 px-3 py-1 rounded-full bg-white/90 border border-[#b8ddf8] text-[11px] font-mono-tech text-[#182635]">
                Joy Level: {happinessLevel}/10 🫧
              </div>
            </div>

            {/* Spawned Floating Bubbles */}
            {bubbles.map((b) => (
              <div
                key={b.id}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                }}
                className="absolute rounded-full bg-radial from-white via-[#B8DDF8]/70 to-[#d0eaff]/40 border border-white shadow-md pointer-events-none animate-ping duration-1000"
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
            <button
              onClick={makeZoeyHappy}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#4a9be8] to-[#60b5ff] hover:brightness-105 text-white font-medium text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Make Zoey Happy
            </button>

            {/* NEW FEATURE: Hear Princess Zoey Tell About Herself */}
            <button
              onClick={handleToggleTellStory}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer border ${
                isTellingStory
                  ? 'bg-[#182635] text-[#B8DDF8] border-[#182635]'
                  : 'bg-white hover:bg-stone-50 text-[#182635] border-[#4a9be8]'
              }`}
            >
              <span>{isTellingStory ? 'Close Story ✕' : '✨ Zoey Tells Her Story'}</span>
            </button>

            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white hover:bg-stone-50 text-[#182635] border border-[#B8DDF8] font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#4a9be8]" />
              Chat
            </button>
          </div>

          <p className="text-xs text-[#2D221E]/70 mt-2.5 italic h-6" aria-live="polite">
            &ldquo;{moodText}&rdquo;
          </p>

          {/* DEDICATED LULLABY PLAYER WITH NEARBY MUTE BUTTON */}
          <div className="w-full max-w-sm mt-3 p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#B8DDF8] shadow-sm text-left">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎵</span>
                <div>
                  <div className="text-xs font-fairytale font-bold text-[#182635]">
                    Snowflake Dreams
                  </div>
                  <div className="text-[10px] text-[#4a9be8] font-mono-tech">
                    Zoey's Exclusive Lullaby
                  </div>
                </div>
              </div>

              {/* Player Controls with Nearby Mute */}
              <div className="flex items-center gap-1.5">
                {/* Play / Pause button */}
                <button
                  onClick={handleToggleLullaby}
                  className="p-2 rounded-xl bg-[#4a9be8] hover:bg-[#3b8bd6] text-white shadow-xs active:scale-95 transition-all cursor-pointer"
                  title={isPlayingLullaby ? 'Pause Snowflake Dreams' : 'Play Snowflake Dreams'}
                  aria-label={isPlayingLullaby ? 'Pause Snowflake Dreams' : 'Play Snowflake Dreams'}
                >
                  {isPlayingLullaby ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>

                {/* Nearby Mute / Unmute Button */}
                <button
                  onClick={handleToggleNearbyMute}
                  className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                    isAudioMuted
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  }`}
                  title={isAudioMuted ? 'Audio Muted — Click to Unmute' : 'Audio On — Click to Mute'}
                  aria-label={isAudioMuted ? 'Muted' : 'Unmuted'}
                >
                  {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#4a9be8] h-full transition-all duration-300"
                style={{ width: `${isPlayingLullaby ? lullabyProgress : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-stone-500 font-mono-tech mt-1">
              <span>{isPlayingLullaby ? 'Playing music-box chimes...' : 'Ready to soothe'}</span>
              <span>{isAudioMuted ? 'Muted' : 'Sound active'}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile or Story Monologue */}
        <div className="space-y-4">
          {/* Princess Tells Her Story Card */}
          {isTellingStory ? (
            <div className="bg-gradient-to-br from-[#182635] to-[#25394e] text-white p-6 rounded-3xl border border-[#B8DDF8]/40 shadow-xl animate-in fade-in">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <span className="text-xs font-mono-tech text-[#B8DDF8] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F4D98A]" /> Zoey Tells Her Story
                </span>
                <span className="text-[10px] text-stone-300 font-mono-tech">
                  Part {storyStep + 1} of {zoeyStoryParagraphs.length}
                </span>
              </div>

              {/* Story Narrative in First Person */}
              <div className="min-h-[110px] flex items-center">
                <p className="font-fairytale text-base sm:text-lg leading-relaxed text-[#FFF8F1]">
                  &ldquo;{zoeyStoryParagraphs[storyStep]}&rdquo;
                </p>
              </div>

              {/* Story Navigation & Speech Synthesis Aloud */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-4">
                <button
                  onClick={handleSpeakAloud}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono-tech text-[#B8DDF8] transition-colors cursor-pointer"
                  title="Read story aloud with voice"
                >
                  <Volume1 className="w-3.5 h-3.5" />
                  <span>{isSpeakingAloud ? 'Pause Voice ⏸' : 'Listen Aloud 🔊'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (storyStep > 0) {
                        setStoryStep((s) => s - 1);
                        fairytaleAudio.playChime(587.33, 'crystal');
                      }
                    }}
                    disabled={storyStep === 0}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs text-white cursor-pointer"
                  >
                    &larr; Prev
                  </button>
                  <button
                    onClick={() => {
                      if (storyStep < zoeyStoryParagraphs.length - 1) {
                        setStoryStep((s) => s + 1);
                        fairytaleAudio.playChime(739.99, 'crystal');
                      } else {
                        setIsTellingStory(false);
                      }
                    }}
                    className="px-3 py-1 rounded-lg bg-[#4a9be8] hover:bg-[#3b8bd6] text-xs text-white font-medium cursor-pointer"
                  >
                    {storyStep < zoeyStoryParagraphs.length - 1 ? 'Next &rarr;' : 'Finish ✨'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* 5-Field Lore Profile */
            <div className="bg-white/85 backdrop-blur-md p-6 rounded-3xl border border-[#B8DDF8] shadow-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono-tech text-[#4a9be8] font-semibold uppercase tracking-wider">
                  ❄️ Kingdom Profile
                </span>
                <button
                  onClick={handleToggleTellStory}
                  className="text-xs text-[#4a9be8] hover:underline font-mono-tech cursor-pointer flex items-center gap-1"
                >
                  <span>Hear Her Story</span> &rarr;
                </button>
              </div>

              <h1 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#182635] mb-4">
                Zoey's Crystal Kingdom
              </h1>

              <dl className="space-y-3 text-sm">
                <div className="border-b border-[#B8DDF8]/40 pb-2">
                  <dt className="text-xs font-bold text-[#4a9be8] uppercase tracking-wider">Who She Is</dt>
                  <dd className="text-[#2D221E] font-medium">A quiet, dreamy magical baby with a gentle spirit</dd>
                </div>
                <div className="border-b border-[#B8DDF8]/40 pb-2">
                  <dt className="text-xs font-bold text-[#4a9be8] uppercase tracking-wider">Her Power</dt>
                  <dd className="text-[#2D221E] font-medium">Creates iridescent bubbles whenever she is happy</dd>
                </div>
                <div className="border-b border-[#B8DDF8]/40 pb-2">
                  <dt className="text-xs font-bold text-[#4a9be8] uppercase tracking-wider">Her Origin</dt>
                  <dd className="text-[#2D221E] font-medium">Born from the icy-blue light of a moonlit wish</dd>
                </div>
                <div className="border-b border-[#B8DDF8]/40 pb-2">
                  <dt className="text-xs font-bold text-[#4a9be8] uppercase tracking-wider">Connected By</dt>
                  <dd className="text-[#2D221E] font-medium">Silver moonlight that links her to Lily forever</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold text-[#4a9be8] uppercase tracking-wider">Princess Motto</dt>
                  <dd className="font-fairytale italic text-[#182635] text-base">
                    &ldquo;A little happiness, a thousand tiny bubbles.&rdquo;
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>

      {/* World-Specific Activity Quick-Bar */}
      <div className="relative z-20 max-w-2xl mx-auto w-full mt-6">
        <div className="flex items-center justify-center gap-2 sm:gap-4 p-2 rounded-2xl bg-white/70 backdrop-blur-md border border-[#B8DDF8]/80 shadow-xs">
          <button
            onClick={() => onOpenActivity('lullaby')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#B8DDF8]/40 text-xs font-medium text-[#182635] transition-colors cursor-pointer"
          >
            <Music className="w-3.5 h-3.5 text-[#4a9be8]" />
            Lullaby
          </button>
          <button
            onClick={() => onOpenActivity('storybook')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#B8DDF8]/40 text-xs font-medium text-[#182635] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#4a9be8]" />
            Storybook
          </button>
          <button
            onClick={() => onOpenActivity('game')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#B8DDF8]/40 text-xs font-medium text-[#182635] transition-colors cursor-pointer"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-[#4a9be8]" />
            Catch Game
          </button>
          <button
            onClick={() => onOpenActivity('nightlight')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#B8DDF8]/40 text-xs font-medium text-[#182635] transition-colors cursor-pointer"
          >
            <Lamp className="w-3.5 h-3.5 text-[#4a9be8]" />
            Nightlamp
          </button>
        </div>
      </div>
    </div>
  );
};
