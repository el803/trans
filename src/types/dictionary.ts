export interface DictionaryEntry {
  id: string;
  indonesian: string;
  chineseSimplified: string;
  chineseTraditional: string;
  pinyin: string;
  partOfSpeech: string;
  definitions: string[];
  examples: Example[];
  audioUrl?: string;
}

export interface Example {
  indonesian: string;
  chineseSimplified: string;
  chineseTraditional: string;
  pinyin: string;
}

export type TranslationDirection = 'indonesian-to-chinese' | 'chinese-to-indonesian';
export type ChineseVariant = 'simplified' | 'traditional';

export interface SearchHistory {
  id: string;
  term: string;
  timestamp: number;
  direction: TranslationDirection;
}

export interface Bookmark {
  id: string;
  entryId: string;
  timestamp: number;
  notes?: string;
}
