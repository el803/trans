import React, { useState } from 'react';
import { DictionaryProvider } from './context/DictionaryContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import HistoryList from './components/HistoryList';
import BookmarksList from './components/BookmarksList';
import SettingsPanel from './components/SettingsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <SearchBar />
            <SearchResults />
          </>
        );
      case 'history':
        return <HistoryList />;
      case 'bookmarks':
        return <BookmarksList />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <SearchResults />;
    }
  };

  return (
    <DictionaryProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar onMenuToggle={toggleSidebar} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto p-4">
            <div className="container mx-auto max-w-3xl">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </DictionaryProvider>
  );
}

export default App;
