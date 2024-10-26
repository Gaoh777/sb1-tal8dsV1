import React from 'react';
import { FaLink } from 'react-icons/fa';

const SimilarBookmarks = ({ similarBookmarks, onBookmarkClick, isDarkMode }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">相似书签</h3>
      {similarBookmarks.length > 0 ? (
        <ul className="space-y-2">
          {similarBookmarks.map((bookmark, index) => (
            <li key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded`}>
              <a
                href={bookmark.url}
                onClick={() => onBookmarkClick(bookmark.id)}
                className="flex items-center"
              >
                <FaLink className={`${isDarkMode ? 'text-blue-300' : 'text-blue-500'} mr-2`} />
                <span>{bookmark.name}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>没有找到相似书签</p>
      )}
    </div>
  );
};

export default SimilarBookmarks;