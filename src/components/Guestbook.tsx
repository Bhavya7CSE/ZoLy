import React, { useState, useEffect } from 'react';
import { X, Send, Heart, Sparkles, BookHeart } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';
import { WishEntry } from '../types';

interface GuestbookProps {
  onClose: () => void;
}

const DEFAULT_WISHES: WishEntry[] = [
  {
    id: 'w1',
    name: 'Aria M.',
    kingdom: 'both',
    message: 'May both sisters always find each other in the reflection of the moonlit water.',
    timestamp: 'Yesterday at twilight',
  },
  {
    id: 'w2',
    name: 'Little Leo',
    kingdom: 'zoey',
    message: 'Zoey, please send a gentle bubble over my room so I can have peaceful dreams tonight! ❄️',
    timestamp: '2 hours ago',
  },
  {
    id: 'w3',
    name: 'Evelyn Starlight',
    kingdom: 'lily',
    message: 'Lily, your lavender auroras make the dark night feel cozy and safe. Thank you! 🌙',
    timestamp: 'Just now',
  },
];

export const Guestbook: React.FC<GuestbookProps> = ({ onClose }) => {
  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [name, setName] = useState('');
  const [kingdom, setKingdom] = useState<'zoey' | 'lily' | 'both'>('both');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('zl_wishes_db');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch {
        setWishes(DEFAULT_WISHES);
      }
    } else {
      setWishes(DEFAULT_WISHES);
      localStorage.setItem('zl_wishes_db', JSON.stringify(DEFAULT_WISHES));
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatusMsg('Please provide your name and a sweet wish.');
      return;
    }

    setIsSubmitting(true);
    fairytaleAudio.playSparkle();

    const newEntry: WishEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      kingdom,
      message: message.trim(),
      timestamp: 'Just now',
    };

    setTimeout(() => {
      const updated = [newEntry, ...wishes];
      setWishes(updated);
      localStorage.setItem('zl_wishes_db', JSON.stringify(updated));

      setName('');
      setMessage('');
      setIsSubmitting(false);
      setStatusMsg('✨ Your wish has been woven into the celestial guestbook!');
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFF8F1] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#2D221E]/10 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
          aria-label="Close Guestbook"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-1.5 text-2xl mb-1">
            <BookHeart className="w-7 h-7 text-[#A43E68]" />
          </div>
          <h2 className="font-fairytale text-2xl sm:text-3xl font-bold text-[#2D221E]">
            Dream Guestbook
          </h2>
          <p className="text-xs text-[#2D221E]/70 max-w-md mx-auto">
            Wishes whispered by visitors to the sisters' kingdoms.
          </p>
        </div>

        {/* Wishes List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4">
          {wishes.map((w) => (
            <div
              key={w.id}
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm ${
                w.kingdom === 'zoey'
                  ? 'bg-[#B8DDF8]/20 border-[#B8DDF8]'
                  : w.kingdom === 'lily'
                  ? 'bg-[#D8C5F5]/20 border-[#D8C5F5]'
                  : 'bg-white/80 border-stone-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-bold text-[#2D221E]">
                  <span>{w.name}</span>
                  <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-white border border-stone-200 font-mono-tech">
                    {w.kingdom === 'zoey' ? '❄️ to Zoey' : w.kingdom === 'lily' ? '🌙 to Lily' : '✦ to Both'}
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono-tech">{w.timestamp}</span>
              </div>
              <p className="text-[#2D221E]/80 leading-relaxed font-sans">{w.message}</p>
            </div>
          ))}
        </div>

        {/* Wish Submission Form */}
        <form onSubmit={handleSubmit} className="border-t border-[#2D221E]/10 pt-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name or fairy title..."
              maxLength={40}
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#A43E68]"
            />

            <select
              value={kingdom}
              onChange={(e) => setKingdom(e.target.value as 'zoey' | 'lily' | 'both')}
              className="px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#A43E68]"
            >
              <option value="both">✦ Send to Both Sisters</option>
              <option value="zoey">❄️ Zoey's Crystal Kingdom</option>
              <option value="lily">🌙 Lily's Aurora Kingdom</option>
            </select>
          </div>

          <div className="flex gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a peaceful wish for the night..."
              rows={2}
              maxLength={280}
              className="flex-1 px-3.5 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#A43E68] resize-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 rounded-xl bg-[#A43E68] hover:bg-[#8f3258] text-white text-xs font-medium shadow-md transition-all active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-1 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono-tech">
            <span>{statusMsg || 'Stored locally in your enchanted ledger'}</span>
            <span>{message.length}/280</span>
          </div>
        </form>
      </div>
    </div>
  );
};
