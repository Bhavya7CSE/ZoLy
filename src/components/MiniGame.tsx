import React, { useState, useEffect, useRef } from 'react';
import { X, Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface MiniGameProps {
  onClose: () => void;
}

interface GameObject {
  id: number;
  x: number;
  y: number;
  radius: number;
  type: 'bubble' | 'star' | 'moon';
  points: number;
  speed: number;
  symbol: string;
}

export const MiniGame: React.FC<MiniGameProps> = ({ onClose }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'ended'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const objectsRef = useRef<GameObject[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('zl_high_score');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  function startGame() {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    objectsRef.current = [];
    fairytaleAudio.playSparkle();
  }

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  function endGame() {
    setGameState('ended');
    setScore((finalScore) => {
      const saved = localStorage.getItem('zl_high_score');
      const currentHigh = saved ? parseInt(saved, 10) : 0;
      if (finalScore > currentHigh) {
        localStorage.setItem('zl_high_score', finalScore.toString());
        setHighScore(finalScore);
      }
      return finalScore;
    });
  }

  // Canvas loop & spawner
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let spawnTimer = 0;

    function loop() {
      if (gameState !== 'playing') return;
      const cvs = canvasRef.current;
      if (!cvs) return;
      const context = cvs.getContext('2d');
      if (!context) return;

      // Spawner
      spawnTimer++;
      if (spawnTimer % 28 === 0) {
        const rand = Math.random();
        let type: 'bubble' | 'star' | 'moon' = 'bubble';
        let points = 1;
        let symbol = '🫧';
        let radius = 24;

        if (rand > 0.85) {
          type = 'moon';
          points = 5;
          symbol = '🌙';
          radius = 28;
        } else if (rand > 0.5) {
          type = 'star';
          points = 2;
          symbol = '⭐';
          radius = 22;
        }

        objectsRef.current.push({
          id: Math.random(),
          x: 30 + Math.random() * (cvs.width - 60),
          y: cvs.height + 20,
          radius,
          type,
          points,
          speed: 1.5 + Math.random() * 2.2,
          symbol,
        });
      }

      // Clear
      context.clearRect(0, 0, cvs.width, cvs.height);

      // Draw and update
      for (let i = objectsRef.current.length - 1; i >= 0; i--) {
        const obj = objectsRef.current[i];
        obj.y -= obj.speed;

        // Draw object
        context.save();
        context.font = `${obj.radius * 1.5}px sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(obj.symbol, obj.x, obj.y);
        context.restore();

        // Remove if off top
        if (obj.y < -30) {
          objectsRef.current.splice(i, 1);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    }

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [gameState]);

  // Click & touch hit testing
  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (gameState !== 'playing' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const clickX = ((clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((clientY - rect.top) / rect.height) * canvas.height;

    for (let i = objectsRef.current.length - 1; i >= 0; i--) {
      const obj = objectsRef.current[i];
      const dist = Math.hypot(clickX - obj.x, clickY - obj.y);
      if (dist < obj.radius + 15) {
        // Hit!
        fairytaleAudio.playChime(obj.type === 'moon' ? 1046.5 : obj.type === 'star' ? 880 : 659.25, 'crystal');
        setScore((s) => s + obj.points);
        objectsRef.current.splice(i, 1);
        return;
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#FFF8F1] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2D221E]/10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
          aria-label="Close Mini-Game"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Start Screen */}
        {gameState === 'start' && (
          <div className="text-center py-6">
            <span className="text-5xl select-none">🫧 ⭐ 🌙</span>
            <h2 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#2D221E] mt-3">
              Bubble &amp; Star Catch
            </h2>
            <p className="text-xs sm:text-sm text-[#2D221E]/70 max-w-sm mx-auto mt-2">
              Tap or click rising items before they escape into the upper clouds!
            </p>
            <div className="flex items-center justify-center gap-4 my-6 text-xs font-mono-tech">
              <span className="px-2.5 py-1 rounded-lg bg-[#B8DDF8]/40 border border-[#B8DDF8]">🫧 +1 pt</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#F4D98A]/40 border border-[#F4D98A]">⭐ +2 pts</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#D8C5F5]/40 border border-[#D8C5F5]">🌙 +5 pts</span>
            </div>
            {highScore > 0 && (
              <p className="text-xs text-[#A43E68] font-mono-tech mb-4 flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> High Score: {highScore} pts
              </p>
            )}
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-2xl bg-[#A43E68] hover:bg-[#8f3258] text-white font-medium text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Play className="w-4 h-4" /> Start Game (30s)
            </button>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && (
          <div>
            {/* HUD */}
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-sm font-fairytale font-bold text-[#182635]">
                Score: <strong className="text-[#A43E68] text-lg">{score}</strong>
              </span>
              <span className="text-xs font-mono-tech px-2.5 py-1 rounded-full bg-stone-200 text-stone-800">
                Time: <strong className="text-rose-600">{timeLeft}</strong>s
              </span>
            </div>

            {/* Game Canvas */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#14233c] to-[#0a1220] border border-[#B8DDF8]/30 shadow-inner h-80">
              <canvas
                ref={canvasRef}
                width={480}
                height={320}
                onClick={handleCanvasClick}
                onTouchStart={handleCanvasClick}
                className="w-full h-full block cursor-crosshair touch-none"
              />
            </div>
          </div>
        )}

        {/* Ended Screen */}
        {gameState === 'ended' && (
          <div className="text-center py-6">
            <span className="text-4xl">✨</span>
            <h2 className="font-fairytale text-2xl font-bold text-[#2D221E] mt-2">Time's Up!</h2>
            <div className="my-4">
              <span className="text-xs font-mono-tech text-stone-500 uppercase">Your Final Score</span>
              <div className="text-4xl font-fairytale font-extrabold text-[#A43E68] mt-1">{score}</div>
            </div>
            {score >= highScore && score > 0 && (
              <p className="text-xs text-emerald-600 font-mono-tech font-bold flex items-center justify-center gap-1 mb-4">
                <Sparkles className="w-4 h-4 text-emerald-500" /> New High Score!
              </p>
            )}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A43E68] hover:bg-[#8f3258] text-white text-xs font-medium cursor-pointer shadow-md active:scale-95"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-medium text-stone-700 cursor-pointer"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
