import React from 'react';
import { FaLink, FaTimes } from 'react-icons/fa';

const FrequentBookmarks = ({ bookmarks, onBookmarkClick, onRemoveFromFrequent, isDarkMode }) => {
  const frequentBookmarks = bookmarks
    .filter(bookmark => bookmark.clickCount > 0)
    .sort((a, b) => b.clickCount - a.clickCount)
    .slice(0, 6);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 px-2">常用网址</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
        {frequentBookmarks.map((bookmark, index) => (
          <div
            key={index}
            className={`${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } rounded-lg shadow-md p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative group`}
          >
            <button
              onClick={() => onRemoveFromFrequent(bookmark.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              title="从常用网址中移除"
            >
              <FaTimes size={16} />
            </button>

            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onBookmarkClick(bookmark)}
              className="block"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                  <FaLink size={20} />
                </div>
                <h4 className="font-semibold text-lg ml-3 truncate">{bookmark.name}</h4>
              </div>

              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm truncate mb-3`}>
                {bookmark.url}
              </p>

              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-gray-500">
                  点击次数: {bookmark.clickCount || 0}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {bookmark.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`inline-block rounded-full px-3 py-1 text-xs ${
                      isDarkMode
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-100 text-blue-800'
                    } hover:bg-blue-500 hover:text-white transition-colors duration-200`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentBookmarks;