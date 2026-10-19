export type Kingdom = 'zoey' | 'lily' | 'shared';

export type ActiveView = 
  | 'entrance'
  | 'zoey-world'
  | 'lily-world'
  | 'lullaby'
  | 'map'
  | 'storybook'
  | 'game'
  | 'nightlight'
  | 'chat'
  | 'guestbook'
  | 'easter-egg'
  | 'credits'
  | 'profiles';

export type Mood = 'happy' | 'sleepy' | 'dreamy' | 'curious' | 'sparkling';

export interface CharacterProfile {
  name: string;
  kingdom: string;
  title: string;
  power: string;
  origin: string;
  connection: string;
  quote: string;
  primaryColor: string;
  accentColor: string;
  themeSymbol: string;
}

export interface WishEntry {
  id: string;
  name: string;
  kingdom: 'zoey' | 'lily' | 'both';
  message: string;
  timestamp: string;
}

export interface StoryPage {
  id: number;
  chapter: string;
  title: string;
  kingdom: Kingdom;
  narrative: string;
  dialogue?: string;
  illustrationType: 'crystals' | 'aurora' | 'wishes' | 'stars' | 'meeting' | 'lullaby';
}
