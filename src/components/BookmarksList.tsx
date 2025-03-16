import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import { Bookmark, X } from 'lucide-react';
import DictionaryEntry from './DictionaryEntry';

const BookmarksList: React.FC = () => {
  const { bookmarks, entries, toggleBookmark } = useDictionary();

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <Bookmark size={40} className="mx-auto mb-2 text-gray-300" />
        <p>No bookmarks yet</p>
        <p className="text-sm mt-1">Bookmark words to access them quickly later</p>
      </div>
    );
  }

  // Get the full entry data for each bookmark
  const bookmarkedEntries = bookmarks
    .map(bookmark => {
      const entry = entries.find(e => e.id === bookmark.entryId);
      return { bookmark, entry };
    })
    .filter(item => item.entry) // Filter out any bookmarks that don't have a matching entry
    .sort((a, b) => b.bookmark.timestamp - a.bookmark.timestamp); // Sort by most recent first

  return (
    <div className="mt-2">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Bookmarked Words</h3>
      
      <div className="space-y-4">
        {bookmarkedEntries.map(({ bookmark, entry }) => (
          entry && <DictionaryEntry key={bookmark.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default BookmarksList;
