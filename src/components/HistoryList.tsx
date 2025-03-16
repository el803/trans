import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import { Clock, X, Search } from 'lucide-react';

const HistoryList: React.FC = () => {
  const { searchHistory, clearHistory, search, setSearchTerm } = useDictionary();

  if (searchHistory.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <Clock size={40} className="mx-auto mb-2 text-gray-300" />
        <p>No search history yet</p>
      </div>
    );
  }

  const handleSearchHistoryItem = (term: string) => {
    setSearchTerm(term);
    search(term);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-700">Recent Searches</h3>
        <button
          onClick={clearHistory}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Clear All
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md divide-y divide-gray-100">
        {searchHistory.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
            <div className="flex-1">
              <button
                onClick={() => handleSearchHistoryItem(item.term)}
                className="flex items-center text-gray-700 hover:text-blue-500"
              >
                <Search size={16} className="mr-2 text-gray-400" />
                <span>{item.term}</span>
              </button>
              <p className="text-xs text-gray-500 mt-1">{formatDate(item.timestamp)}</p>
            </div>
            <div className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {item.direction === 'indonesian-to-chinese' ? 'ID → CN' : 'CN → ID'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
