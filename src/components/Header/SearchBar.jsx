import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchTerm, onSearch, onAdvancedSearch, isDarkMode }) => {
  return (
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
          onClick={onAdvancedSearch}
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
  );
};

export default SearchBar;