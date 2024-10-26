import React from 'react';
import { FaLink, FaEdit, FaTrash } from 'react-icons/fa';

const BookmarkCard = ({ 
  bookmark, 
  isDarkMode, 
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onBookmarkClick,
  onEdit,
  onDelete 
}) => {
  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } rounded-lg shadow-md p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative group`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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

        <div className="mt-3 flex flex-wrap gap-2">
          {bookmark.tags.map((tag) => (
            <span
              key={`${bookmark.id}-${tag}`}
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

      <div className={`absolute top-2 right-2 space-x-2 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}>
        <button
          onClick={() => onEdit(bookmark)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => onDelete(bookmark.id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;