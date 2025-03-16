import React from 'react';
import { Home, History, Bookmark, Settings, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const tabs = [
    { id: 'home', label: 'Dictionary', icon: <Home size={20} /> },
    { id: 'history', label: 'History', icon: <History size={20} /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <Bookmark size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <button 
          onClick={onClose}
          className="md:hidden text-gray-500 hover:text-gray-700"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map(tab => (
            <li key={tab.id}>
              <button
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
