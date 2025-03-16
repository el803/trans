import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import { Wifi, WifiOff } from 'lucide<pivotalAction type="file" filePath="src/components/SettingsPanel.tsx">
import React from 'react';
import { useDictionary } from '../context/DictionaryContext';
import { Wifi, WifiOff } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const { 
    chineseVariant, 
    setChineseVariant,
    isOfflineMode,
    toggleOfflineMode
  } = useDictionary();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Settings</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Chinese Character Variant</h4>
          <div className="flex space-x-3">
            <button
              onClick={() => setChineseVariant('simplified')}
              className={`px-4 py-2 rounded-md ${
                chineseVariant === 'simplified'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Simplified (简体)
            </button>
            <button
              onClick={() => setChineseVariant('traditional')}
              className={`px-4 py-2 rounded-md ${
                chineseVariant === 'traditional'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Traditional (繁體)
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Offline Mode</h4>
          <button
            onClick={toggleOfflineMode}
            className={`flex items-center px-4 py-2 rounded-md ${
              isOfflineMode
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isOfflineMode ? (
              <>
                <WifiOff size={18} className="mr-2" />
                Offline Mode Enabled
              </>
            ) : (
              <>
                <Wifi size={18} className="mr-2" />
                Online Mode
              </>
            )}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            {isOfflineMode
              ? "You're using the dictionary offline. Some features may be limited."
              : "Enable offline mode to use the dictionary without an internet connection."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
