import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DictionaryEntry, 
  TranslationDirection, 
  ChineseVariant, 
  SearchHistory,
  Bookmark
} from '../types/dictionary';
import { sampleDictionary } from '../data/sampleDictionary';

interface DictionaryContextType {
  entries: DictionaryEntry[];
  searchResults: DictionaryEntry[];
  searchTerm: string;
  translationDirection: TranslationDirection;
  chineseVariant: ChineseVariant;
  searchHistory: SearchHistory[];
  bookmarks: Bookmark[];
  isOfflineMode: boolean;
  setSearchTerm: (term: string) => void;
  setTranslationDirection: (direction: TranslationDirection) => void;
  setChineseVariant: (variant: ChineseVariant) => void;
  search: (term: string) => void;
  addToHistory: (term: string) => void;
  clearHistory: () => void;
  toggleBookmark: (entryId: string) => void;
  isBookmarked: (entryId: string) => boolean;
  toggleOfflineMode: () => void;
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined);

export const DictionaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries] = useState<DictionaryEntry[]>(sampleDictionary);
  const [searchResults, setSearchResults] = useState<DictionaryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [translationDirection, setTranslationDirection] = useState<TranslationDirection>('indonesian-to-chinese');
  const [chineseVariant, setChineseVariant] = useState<ChineseVariant>('simplified');
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    const savedOfflineMode = localStorage.getItem('offlineMode');
    if (savedOfflineMode) {
      setIsOfflineMode(JSON.parse(savedOfflineMode));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('offlineMode', JSON.stringify(isOfflineMode));
  }, [isOfflineMode]);

  const search = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const normalizedTerm = term.toLowerCase().trim();
    
    let results: DictionaryEntry[];
    if (translationDirection === 'indonesian-to-chinese') {
      results = entries.filter(entry => 
        entry.indonesian.toLowerCase().includes(normalizedTerm) ||
        entry.definitions.some(def => def.toLowerCase().includes(normalizedTerm))
      );
    } else {
      results = entries.filter(entry => 
        entry.chineseSimplified.includes(normalizedTerm) ||
        entry.chineseTraditional.includes(normalizedTerm) ||
        entry.pinyin.toLowerCase().includes(normalizedTerm)
      );
    }

    setSearchResults(results);
    addToHistory(term);
  };

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    
    const newHistoryItem: SearchHistory = {
      id: Date.now().toString(),
      term,
      timestamp: Date.now(),
      direction: translationDirection
    };

    setSearchHistory(prev => {
      // Remove duplicates and keep only the most recent 50 searches
      const filteredHistory = prev.filter(item => item.term !== term);
      return [newHistoryItem, ...filteredHistory].slice(0, 50);
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const toggleBookmark = (entryId: string) => {
    if (isBookmarked(entryId)) {
      setBookmarks(prev => prev.filter(bookmark => bookmark.entryId !== entryId));
    } else {
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        entryId,
        timestamp: Date.now()
      };
      setBookmarks(prev => [...prev, newBookmark]);
    }
  };

  const isBookmarked = (entryId: string) => {
    return bookmarks.some(bookmark => bookmark.entryId === entryId);
  };

  const toggleOfflineMode = () => {
    setIsOfflineMode(prev => !prev);
  };

  return (
    <DictionaryContext.Provider
      value={{
        entries,
        searchResults,
        searchTerm,
        translationDirection,
        chineseVariant,
        searchHistory,
        bookmarks,
        isOfflineMode,
        setSearchTerm,
        setTranslationDirection,
        setChineseVariant,
        search,
        addToHistory,
        clearHistory,
        toggleBookmark,
        isBookmarked,
        toggleOfflineMode
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }
  return context;
};
