import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeftRight } from 'lucide-react';
import { useDictionary } from '../context/DictionaryContext';
import { TranslationDirection } from '../types/dictionary';

const SearchBar: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    search, 
    translationDirection, 
    setTranslationDirection,
    entries
  } = useDictionary();
  
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const normalizedTerm = searchTerm.toLowerCase();
      let matchedSuggestions: string[] = [];
      
      if (translationDirection === 'indonesian-to-chinese') {
        matchedSuggestions = entries
          .filter(entry => entry.indonesian.toLowerCase().startsWith(normalizedTerm))
          .map(entry => entry.indonesian)
          .slice(0, 5);
      } else {
        matchedSuggestions = entries
          .filter(entry => 
            entry.chineseSimplified.includes(normalizedTerm) || 
            entry.pinyin.toLowerCase().includes(normalizedTerm)
          )
          .map(entry => entry.chineseSimplified)
          .slice(0, 5);
      }
      
      setSuggestions(matchedSuggestions);
      setShowSuggestions(matchedSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, translationDirection, entries]);

  const handleSearch = () => {
    search(searchTerm);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    search(suggestion);
    setShowSuggestions(false);
  };

  const toggleTranslationDirection = () => {
    const newDirection: TranslationDirection = 
      translationDirection === 'indonesian-to-chinese' 
        ? 'chinese-to-indonesian' 
        : 'indonesian-to-chinese';
    
    setTranslationDirection(newDirection);
    setSearchTerm('');
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-white rounded-lg shadow-md">
        <div className="flex-1 relative">
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchTerm.length > 1 && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              placeholder={translationDirection === 'indonesian-to-chinese' 
                ? "Cari kata dalam Bahasa Indonesia..." 
                : "搜索中文词汇..."}
              className="w-full py-3 px-4 rounded-l-lg focus:outline-none"
            />
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute right-2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          {showSuggestions && (
            <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={toggleTranslationDirection}
          className="p-3 text-gray-500 hover:text-gray-700"
          aria-label="Toggle translation direction"
        >
          <ArrowLeftRight size={20} />
        </button>
        
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
      
      <div className="mt-2 text-sm text-gray-600 flex justify-between px-1">
        <div>
          {translationDirection === 'indonesian-to-chinese' 
            ? 'Indonesia → Mandarin' 
            : '中文 → 印尼语'}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
