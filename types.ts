export enum Genre {
  FANTASY = 'Fantasy',
  HORROR = 'Horror',
  ROMANCE = 'Romance',
  ADVENTURE = 'Adventure',
  SCI_FI = 'Sci-Fi',
  MORAL = 'Moral Story',
  KIDS = 'Kids Story'
}

export enum StoryLength {
  SHORT = 'Short (approx. 300 words)',
  MEDIUM = 'Medium (approx. 600 words)',
  LONG = 'Long (approx. 1000 words)'
}

export enum StoryLanguage {
  ENGLISH = 'English',
  URDU = 'Urdu'
}

export interface StoryParams {
  title?: string;
  genre: Genre;
  characters: string;
  length: StoryLength;
  language: StoryLanguage;
}

export interface GeneratedStory {
  title: string;
  content: string;
  timestamp: number;
}
