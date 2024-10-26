import React, { useState, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { FaLink, FaTrash, FaEdit } from 'react-icons/fa';

const BookmarkList = ({ bookmarks, onBookmarkClick, onDeleteBookmark, onChangeTags, tags, addTag, isDarkMode, selectedTag }) => {
  const [hoveredBookmark, setHoveredBookmark] = useState(null);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const groupedBookmarks = useMemo(() => {
    if (!bookmarks?.length) return {};
    
    return bookmarks.reduce((acc, bookmark) => {
      const tag = selectedTag || (bookmark.tags[0] || '未分类');
      if (!acc[tag]) {
        acc[tag] = [];
      }
      if (!acc[tag].some(b => b.id === bookmark.id)) {
        acc[tag].push(bookmark);
      }
      return acc;
    }, {});
  }, [bookmarks, selectedTag]);

  const handleSaveTags = (bookmarkId) => {
    const primaryTag = selectedTags.length > 0 ? selectedTags[0] : '未分类';
    onChangeTags(bookmarkId, [primaryTag]);
    setEditingBookmark(null);
    setSelectedTags([]);
    setNewTag('');
  };

  const renderBookmarkGroup = (tag, bookmarks) => (
    <div key={tag} className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{tag}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className={`${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
            } rounded-lg shadow-md p-4 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative group`}
            onMouseEnter={() => setHoveredBookmark(bookmark.id)}
            onMouseLeave={() => setHoveredBookmark(null)}
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
              hoveredBookmark === bookmark.id ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-200`}>
              <button
                onClick={() => setEditingBookmark(bookmark)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                <FaEdit size={16} />
              </button>
              <button
                onClick={() => onDeleteBookmark(bookmark.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <FaTrash size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">我的收藏</h2>
      {Object.entries(groupedBookmarks).map(([tag, bookmarks]) => 
        renderBookmarkGroup(tag, bookmarks)
      )}

      {editingBookmark && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
          <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-md w-full`}>
            <h3 className="text-xl font-bold mb-4">编辑标签</h3>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags([tag])}
                    className={`px-2 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                }`}
                placeholder="添加新标签"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingBookmark(null)}
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
                } hover:bg-gray-300 focus:outline-none`}
              >
                取消
              </button>
              <button
                onClick={() => handleSaveTags(editingBookmark.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkList;