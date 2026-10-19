/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { TopControls } from './components/TopControls';
import { EntranceScene } from './components/EntranceScene';
import { DreamHomeSection } from './components/DreamHomeSection';
import { ZoeyWorld } from './components/ZoeyWorld';
import { LilyWorld } from './components/LilyWorld';
import { ScrollOriginStory } from './components/ScrollOriginStory';
import { SparkleDissolveOverlay } from './components/SparkleDissolveOverlay';

// Overlays & Activities
import { LullabyLab } from './components/LullabyLab';
import { DreamMap } from './components/DreamMap';
import { Storybook } from './components/Storybook';
import { MiniGame } from './components/MiniGame';
import { Nightlight } from './components/Nightlight';
import { CharacterChat } from './components/CharacterChat';
import { Guestbook } from './components/Guestbook';
import { EasterEgg } from './components/EasterEgg';
import { CreditsModal } from './components/CreditsModal';
import { CharacterProfilesModal } from './components/CharacterProfilesModal';

import { ActiveView, Mood } from './types';
import { fairytaleAudio } from './audio/synthEngine';

export default function App() {
  const [isNight, setIsNight] = useState(false);
  const [activeMood, setActiveMood] = useState<Mood>('happy');
  const [currentView, setCurrentView] = useState<'entrance' | 'zoey-world' | 'lily-world'>('entrance');
  const [activeOverlay, setActiveOverlay] = useState<ActiveView | null>(null);
  const [chatChar, setChatChar] = useState<'zoey' | 'lily'>('zoey');
  const [pendingTransition, setPendingTransition] = useState<'zoey' | 'lily' | 'home' | null>(null);

  function handleToggleTheme() {
    setIsNight((prev) => !prev);
    fairytaleAudio.playChime(isNight ? 587.33 : 880, 'crystal');
  }

  function handleMagicBurst() {
    fairytaleAudio.playSparkle();
  }

  function handleOpenChat(char: 'zoey' | 'lily') {
    setChatChar(char);
    setActiveOverlay('chat');
  }

  function handleStartTransition(target: 'zoey' | 'lily' | 'home') {
    if (target === 'zoey') {
      fairytaleAudio.playChime(739.99, 'crystal');
    } else if (target === 'lily') {
      fairytaleAudio.playChime(659.25, 'warm');
    } else {
      fairytaleAudio.playSparkle();
    }
    setPendingTransition(target);
  }

  function handleTransitionMidpoint() {
    if (pendingTransition === 'zoey') {
      setCurrentView('zoey-world');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (pendingTransition === 'lily') {
      setCurrentView('lily-world');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (pendingTransition === 'home') {
      setCurrentView('entrance');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  function handleTransitionComplete() {
    setPendingTransition(null);
  }

  function scrollToDreamHome() {
    const el = document.getElementById('dream-home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col justify-between ${
        isNight
          ? 'bg-[#12101e] text-[#f4efe8]'
          : 'bg-[#FFF8F1] text-[#2D221E]'
      }`}
    >
      {/* Whimsical Fairytale Cursor & Moving Sparkle Trail */}
      <CustomCursor currentView={currentView} />

      {/* Top Navigation & Controls Bar */}
      <TopControls
        isNight={isNight}
        onToggleTheme={handleToggleTheme}
        onOpenCredits={() => setActiveOverlay('credits')}
        onMagicBurst={handleMagicBurst}
      />

      {/* Main Body View */}
      <main className="flex-1 w-full flex flex-col items-center">
        {currentView === 'entrance' && (
          <>
            {/* FIX 1: Clean, full-screen entrance focusing purely on Zoey and Lily without activity icon clutter */}
            <EntranceScene
              isNight={isNight}
              activeMood={activeMood}
              onSelectKingdom={(kingdom) => handleStartTransition(kingdom)}
              onSelectMood={(m) => setActiveMood(m)}
              onScrollToDreamHome={scrollToDreamHome}
            />

            {/* FIX 1: Separate Dream Home section featuring all 9 handcrafted toy wonders in a balanced, responsive grid */}
            <DreamHomeSection
              onOpenActivity={(act) => setActiveOverlay(act)}
              onScrollToTop={scrollToTop}
            />

            {/* Seamless Illuminated Origin Chronicle */}
            <ScrollOriginStory onOpenStorybook={() => setActiveOverlay('storybook')} />
          </>
        )}

        {currentView === 'zoey-world' && (
          <ZoeyWorld
            onBack={() => handleStartTransition('home')}
            onOpenActivity={(act) => setActiveOverlay(act)}
            onOpenChat={() => handleOpenChat('zoey')}
          />
        )}

        {currentView === 'lily-world' && (
          <LilyWorld
            onBack={() => handleStartTransition('home')}
            onOpenActivity={(act) => setActiveOverlay(act)}
            onOpenChat={() => handleOpenChat('lily')}
          />
        )}
      </main>

      {/* FIX 3: Cinematic Sparkle Dissolve Transition Overlay */}
      <SparkleDissolveOverlay
        targetWorld={pendingTransition}
        onMidpoint={handleTransitionMidpoint}
        onComplete={handleTransitionComplete}
      />

      {/* Overlays & Modals (All 9 activities + credits) */}
      {activeOverlay === 'lullaby' && <LullabyLab onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'map' && <DreamMap onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'storybook' && <Storybook onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'game' && <MiniGame onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'nightlight' && <Nightlight onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'chat' && <CharacterChat initialCharacter={chatChar} onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'guestbook' && <Guestbook onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'easter-egg' && <EasterEgg onClose={() => setActiveOverlay(null)} />}
      {activeOverlay === 'profiles' && (
        <CharacterProfilesModal
          onClose={() => setActiveOverlay(null)}
          onSelectKingdom={(k) => handleStartTransition(k)}
        />
      )}
      {activeOverlay === 'credits' && <CreditsModal onClose={() => setActiveOverlay(null)} />}

      {/* Accessible Footer */}
      <footer className="w-full py-4 px-6 border-t border-[#2D221E]/10 bg-white/50 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between text-xs text-[#2D221E]/70 gap-2 font-mono-tech">
        <div className="flex items-center gap-2">
          <span>✦ Zoey &amp; Lily ✦</span>
          <span>&bull;</span>
          <span>haX.baby Baby's First Website</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveOverlay('credits')}
            className="hover:text-[#A43E68] transition-colors underline cursor-pointer"
          >
            Credits &amp; Original Lore
          </button>
          <span>&bull;</span>
          <span>All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
}
