import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AdvancedSearchPanel = ({
  onClose,
  onAdvancedSearch,
  advancedSearchParams,
  setAdvancedSearchParams,
  isDarkMode
}) => {
  const handleSearch = () => {
    onAdvancedSearch(advancedSearchParams);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">高级搜索</h2>
          <button
            onClick={onClose}
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
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          搜索
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearchPanel;