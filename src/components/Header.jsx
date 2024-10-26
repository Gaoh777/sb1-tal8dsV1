import React, { useState, useEffect } from 'react';
import { FaCog, FaTimes, FaSearch, FaFileDownload, FaFileUpload, FaPalette, FaDownload, FaTrash, FaSort, FaTags, FaChartBar } from 'react-icons/fa';

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAdvancedSearch = () => {
    onAdvancedSearch(advancedSearchParams);
    setIsAdvancedSearchOpen(false);
  };

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
        <div className="relative max-w-xl mx-auto">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="搜索收藏..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setIsAdvancedSearchOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              高级搜索
            </button>
          </div>
          {searchTerm && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 text-lg font-semibold bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md">
        {currentTime.toLocaleTimeString()}
      </div>
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-md w-full`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">设置</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <button
              onClick={onOpenThemeSettings}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 flex items-center justify-center"
            >
              <FaPalette className="mr-2" />
              设置主题颜色
            </button>
            <button
              onClick={onExport}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2 flex items-center justify-center"
            >
              <FaFileDownload className="mr-2" />
              导出收藏
            </button>
            <div className="flex space-x-2 mb-2">
              <button
                onClick={onDownloadTemplate}
                className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
              >
                <FaDownload className="mr-2" />
                下载导入模板
              </button>
              <label
                htmlFor="import-file"
                className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-center"
              >
                <FaFileUpload className="mr-2" />
                导入收藏
              </label>
            </div>
            <input
              id="import-file"
              type="file"
              accept=".xlsx"
              onChange={onImport}
              className="hidden"
            />
            <button
              onClick={onViewDeletedBookmarks}
              className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center mb-2"
            >
              <FaTrash className="mr-2" />
              查看已删除的收藏
            </button>
            <button
              onClick={onOpenTagManagement}
              className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center mb-2"
            >
              <FaTags className="mr-2" />
              管理标签
            </button>
            <button
              onClick={onOpenStatistics}
              className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
            >
              <FaChartBar className="mr-2" />
              查看统计信息
            </button>
          </div>
        </div>
      )}
      
      {isAdvancedSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-md w-full`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">高级搜索</h2>
              <button
                onClick={() => setIsAdvancedSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">名称</label>
              <input
                type="text"
                id="name"
                value={advancedSearchParams.name}
                onChange={(e) => setAdvancedSearchParams({...advancedSearchParams, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="url" className="block mb-2">网址</label>
              <input
                type="text"
                id="url"
                value={advancedSearchParams.url}
                onChange={(e) => setAdvancedSearchParams({...advancedSearchParams, url: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tag" className="block mb-2">标签</label>
              <input
                type="text"
                id="tag"
                value={advancedSearchParams.tag}
                onChange={(e) => setAdvancedSearchParams({...advancedSearchParams, tag: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateFrom" className="block mb-2">创建日期从</label>
              <input
                type="date"
                id="dateFrom"
                value={advancedSearchParams.dateFrom}
                onChange={(e) => setAdvancedSearchParams({...advancedSearchParams, dateFrom: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateTo" className="block mb-2">创建日期至</label>
              <input
                type="date"
                id="dateTo"
                value={advancedSearchParams.dateTo}
                onChange={(e) => setAdvancedSearchParams({...advancedSearchParams, dateTo: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sortBy" className="block mb-2">排序方式</label>
              <select
                id="sortBy"
                value={advancedSearchParams.sortBy}
                onChange={(e) => setAdvancedSearchParams({...advancedSearchParams, sortBy: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">名称</option>
                <option value="createdAt">创建日期</option>
                <option value="clickCount">点击次数</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="sortOrder" className="block mb-2">排序顺序</label>
              <select
                id="sortOrder"
                value={advancedSearchParams.sortOrder}
                onChange={(e) => setAdvancedSearchParams({...advancedSearchParams, sortOrder: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">升序</option>
                <option value="desc">降序</option>
              </select>
            </div>
            <button
              onClick={handleAdvancedSearch}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              搜索
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;