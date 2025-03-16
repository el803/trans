import React, { useState } from 'react';
import { Volume2, Bookmark, BookmarkCheck } from 'lucide-react';
import { DictionaryEntry as DictionaryEntryType } from '../types/dictionary';
import { useDictionary } from '../context/DictionaryContext';

interface DictionaryEntryProps {
  entry: DictionaryEntryType;
}

const DictionaryEntry: React.FC<DictionaryEntryProps> = ({ entry }) => {
  const { chineseVariant, isBookmarked, toggleBookmark } = useDictionary();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const playAudio = () => {
    if (entry.audioUrl) {
      const audio = new Audio(entry.audioUrl);
      audio.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
  };

  const chineseText = chineseVariant === 'simplified' 
    ? entry.chineseSimplified 
    : entry.chineseTraditional;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold">{entry.indonesian}</h3>
          <div className="flex items-center mt-1">
            <span className="text-lg mr-2">{chineseText}</span>
            <span className="text-gray-500 text-sm">{entry.pinyin}</span>
            {entry.audioUrl && (
              <button 
                onClick={playAudio} 
                className="ml-2 text-blue-500 hover:text-blue-700"
                aria-label="Play pronunciation"
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            <span className="italic">{entry.partOfSpeech}</span>
          </div>
        </div>
        
        <button
          onClick={() => toggleBookmark(entry.id)}
          className={`${isBookmarked(entry.id) ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600`}
          aria-label={isBookmarked(entry.id) ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked(entry.id) ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
        </button>
      </div>
      
      <div className="mt-3">
        <h4 className="font-semibold text-gray-700">Definitions:</h4>
        <ul className="list-disc list-inside ml-2 text-gray-600">
          {entry.definitions.map((definition, index) => (
            <li key={index}>{definition}</li>
          ))}
        </ul>
      </div>
      
      {entry.examples.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            {isExpanded ? "Hide examples" : "Show examples"}
          </button>
          
          {isExpanded && (
            <div className="mt-2 bg-gray-50 p-3 rounded-md">
              {entry.examples.map((example, index) => (
                <div key={index} className={index > 0 ? "mt-3 pt-3 border-t border-gray-200" : ""}>
                  <p className="text-gray-800">{example.indonesian}</p>
                  <p className="mt-1">{chineseVariant === 'simplified' ? example.chineseSimplified : example.chineseTraditional}</p>
                  <p className="text-gray-500 text-sm">{example.pinyin}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DictionaryEntry;
