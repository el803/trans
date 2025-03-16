import React from 'react';
import { Book, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Book size={24} className="mr-2" />
            <h1 className="text-xl font-bold">Kamus Indonesia-Mandarin</h1>
          </div>
          
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md hover:bg-blue-700"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
