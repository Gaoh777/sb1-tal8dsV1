import React from 'react';
import SearchBar from './SearchBar';
import SettingsPanel from './SettingsPanel';
import AdvancedSearchPanel from './AdvancedSearchPanel';
import { FaCog } from 'react-icons/fa';

const Header = ({
  onAddBookmark,
  onSearch,
  searchTerm,
  onViewDeletedBookmarks,
  onOpenThemeSettings,
  onOpenTagManagement,
  onOpenStatistics,
  isDarkMode,
  headerStyle,
  onAdvancedSearch,
  advancedSearchParams,
  setAdvancedSearchParams,
  onExport,
  onImport,
  onDownloadTemplate
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header 
      className={`${isDarkMode ? 'text-white' : 'text-black'} shadow-md relative`} 
      style={{...headerStyle, minHeight: '300px'}}
    >
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaCog size={20} />
            </button>
            <button
              onClick={onAddBookmark}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              来收藏吧
            </button>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">个人爱收藏</h1>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={onSearch}
          onAdvancedSearch={() => setIsAdvancedSearchOpen(true)}
          isDarkMode={isDarkMode}
        />
      </div>
      <div className="fixed bottom-4 right-4 text-lg font-semibold bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md">
        {currentTime.toLocaleTimeString()}
      </div>
      {isSettingsOpen && (
        <SettingsPanel
          onClose={() => setIsSettingsOpen(false)}
          onOpenThemeSettings={onOpenThemeSettings}
          onExport={onExport}
          onImport={onImport}
          onDownloadTemplate={onDownloadTemplate}
          onViewDeletedBookmarks={onViewDeletedBookmarks}
          onOpenTagManagement={onOpenTagManagement}
          onOpenStatistics={onOpenStatistics}
          isDarkMode={isDarkMode}
        />
      )}
      {isAdvancedSearchOpen && (
        <AdvancedSearchPanel
          onClose={() => setIsAdvancedSearchOpen(false)}
          onAdvancedSearch={onAdvancedSearch}
          advancedSearchParams={advancedSearchParams}
          setAdvancedSearchParams={setAdvancedSearchParams}
          isDarkMode={isDarkMode}
        />
      )}
    </header>
  );
};

export default Header;