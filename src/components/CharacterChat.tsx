import React, { useState } from 'react';
import { X, Send, Sparkles, RefreshCw } from 'lucide-react';
import { fairytaleAudio } from '../audio/synthEngine';

interface CharacterChatProps {
  initialCharacter?: 'zoey' | 'lily';
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'zoey' | 'lily';
  text: string;
}

const ZOEY_PROMPTS = [
  'How do you make crystal bubbles?',
  'What is your favourite bedtime story?',
  'Do you ever get cold in the mountains?',
  'What do you miss about Lily?',
];

const LILY_PROMPTS = [
  'How do you paint auroras?',
  'Which color is your favorite?',
  'What do moonflowers smell like?',
  'Can you send a dream to Zoey?',
];

export const CharacterChat: React.FC<CharacterChatProps> = ({ initialCharacter = 'zoey', onClose }) => {
  const [activeChar, setActiveChar] = useState<'zoey' | 'lily'>(initialCharacter);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: initialCharacter,
      text:
        initialCharacter === 'zoey'
          ? 'Hello gentle dreamer! ❄️ I am watching the snowflakes float across North Peak. What would you like to ask?'
          : 'Welcome to the twilight meadow! 🌙 I have my moonflower brush ready to paint. What shall we talk about?',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  function getCharacterResponse(char: 'zoey' | 'lily', query: string): string {
    const q = query.toLowerCase();
    if (char === 'zoey') {
      if (q.includes('bubble') || q.includes('power')) {
        return 'Whenever something makes me feel gentle and happy, a shimmer forms in my hands and floats up as a crystal bubble! 🫧 Each one holds a quiet wish.';
      }
      if (q.includes('cold') || q.includes('snow') || q.includes('mountain')) {
        return 'The snow on North Peak is soft like powdered sugar! It never feels cold to me because Lily’s warm thoughts reach me across the silver lake. ❄️';
      }
      if (q.includes('lily') || q.includes('sister')) {
        return 'Lily is my dearest sister! Even across the water, whenever she paints a pink aurora, my crystal crown glows in reply. ✨';
      }
      if (q.includes('sleep') || q.includes('bed') || q.includes('lullaby')) {
        return 'My favorite melody is "Snowflake Dreams." Close your eyes, breathe in the fresh winter air, and let the quiet stars tuck you in. 💤';
      }
      return 'That sounds wonderful. The lake is so calm tonight, and every thought you share becomes a little star in the sky! ✦';
    } else {
      if (q.includes('paint') || q.includes('aurora') || q.includes('color')) {
        return 'I dip my moonflower wand into lavender mist and sweep it across the clouds! Lavender, blush pink, and butter yellow are my favorite shades. 🎨';
      }
      if (q.includes('flower') || q.includes('moonflower')) {
        return 'Moonflowers only bloom when someone makes a sincere wish before bedtime. They smell like honeyed starlight! 🌸';
      }
      if (q.includes('zoey') || q.includes('sister')) {
        return 'Zoey makes the most delicate bubbles! When the wind blows south, I catch them and wrap them in glowing ribbons for her. 🌙';
      }
      if (q.includes('dream') || q.includes('wish')) {
        return 'Every dream is a little seed waiting for sunrise. What did you wish for when you looked at the evening moon? ✨';
      }
      return 'How magical! Your words shine like fireflies dancing in the twilight valley. Tell me more, dear friend! 🌸';
    }
  }

  function handleSend(textToSend?: string) {
    const text = textToSend || inputText.trim();
    if (!text || isTyping) return;

    fairytaleAudio.playChime(activeChar === 'zoey' ? 739.99 : 659.25, activeChar === 'zoey' ? 'crystal' : 'warm');

    const newMsgs: Message[] = [...messages, { sender: 'user', text }];
    setMessages(newMsgs);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getCharacterResponse(activeChar, text);
      setMessages([...newMsgs, { sender: activeChar, text: reply }]);
      setIsTyping(false);
      fairytaleAudio.playChime(activeChar === 'zoey' ? 880 : 783.99, activeChar === 'zoey' ? 'crystal' : 'warm');
    }, 700);
  }

  function handleSwitchCharacter(char: 'zoey' | 'lily') {
    setActiveChar(char);
    setMessages([
      {
        sender: char,
        text:
          char === 'zoey'
            ? 'Hello gentle dreamer! ❄️ I am watching the snowflakes float across North Peak. What would you like to ask?'
            : 'Welcome to the twilight meadow! 🌙 I have my moonflower brush ready to paint. What shall we talk about?',
      },
    ]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FFF8F1] rounded-3xl p-6 shadow-2xl border border-[#2D221E]/10 flex flex-col h-[560px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2D221E]/10 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSwitchCharacter('zoey')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                activeChar === 'zoey'
                  ? 'bg-[#B8DDF8] text-[#182635] border-[#4a9be8] font-bold shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              ❄️ Zoey
            </button>
            <button
              onClick={() => handleSwitchCharacter('lily')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                activeChar === 'lily'
                  ? 'bg-[#D8C5F5] text-[#2d1b38] border-[#8a5cb8] font-bold shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200'
              }`}
            >
              🌙 Lily
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-[#2D221E] transition-colors cursor-pointer"
            aria-label="Close Sister Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-stone-500 font-mono-tech mb-0.5 px-1">
                {m.sender === 'user' ? 'You' : m.sender === 'zoey' ? '❄️ Princess Zoey' : '🌙 Princess Lily'}
              </span>
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#A43E68] text-white rounded-br-none'
                    : m.sender === 'zoey'
                    ? 'bg-gradient-to-r from-[#B8DDF8]/70 to-[#e2f1fc] text-[#182635] border border-[#B8DDF8] rounded-bl-none shadow-xs'
                    : 'bg-gradient-to-r from-[#D8C5F5]/70 to-[#FCE7F3] text-[#2d1b38] border border-[#D8C5F5] rounded-bl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono-tech italic py-1">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>{activeChar === 'zoey' ? 'Zoey is blowing a crystal bubble...' : 'Lily is dipping her wand...'}</span>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="flex gap-1.5 overflow-x-auto py-2 border-t border-[#2D221E]/10 no-scrollbar">
          {(activeChar === 'zoey' ? ZOEY_PROMPTS : LILY_PROMPTS).map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 pt-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Say something gentle to ${activeChar === 'zoey' ? 'Zoey' : 'Lily'}...`}
            maxLength={180}
            className="flex-1 px-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#A43E68] bg-white"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#A43E68] hover:bg-[#8f3258] text-white transition-all active:scale-95 cursor-pointer shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
