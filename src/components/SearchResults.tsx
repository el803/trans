import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import DictionaryEntry from './DictionaryEntry';
import { Book } from 'lucide-react';

const SearchResults: React.FC = () => {
  const { searchResults, searchTerm } = useDictionary();

  if (!searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
        <Book size={64} className="mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold mb-2">Indonesian-Chinese Dictionary</h2>
        <p>Search for words in Indonesian or Chinese to see translations</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No results found for "{searchTerm}"</p>
        <p className="text-sm text-gray-500 mt-2">Try a different search term or check your spelling</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-3">Found {searchResults.length} results for "{searchTerm}"</p>
      {searchResults.map(entry => (
        <DictionaryEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default SearchResults;
