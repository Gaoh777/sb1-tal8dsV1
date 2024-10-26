import React from 'react';
import { FaTimes, FaChartBar, FaCalendarAlt, FaTags } from 'react-icons/fa';

const BookmarkStatistics = ({ bookmarks, onClose, isDarkMode }) => {
  const totalBookmarks = bookmarks.length;
  const allTags = bookmarks.flatMap(b => b.tags);
  const totalTags = new Set(allTags).size;
  
  const tagUsage = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  
  const mostUsedTagName = Object.keys(tagUsage).length > 0
    ? Object.keys(tagUsage).reduce((a, b) => tagUsage[a] > tagUsage[b] ? a : b)
    : '无';

  const mostClickedBookmark = bookmarks.length > 0
    ? bookmarks.reduce((a, b) => a.clickCount > b.clickCount ? a : b)
    : { name: '无', clickCount: 0 };
  
  const recentBookmarks = [...bookmarks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">书签统计信息</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
            <div className="flex items-center mb-2">
              <FaChartBar className="text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold">总体统计</h3>
            </div>
            <p>总书签数: {totalBookmarks}</p>
            <p>总标签数: {totalTags}</p>
            <p>最常用标签: {mostUsedTagName} ({tagUsage[mostUsedTagName] || 0} 次使用)</p>
            <p>点击最多的书签: {mostClickedBookmark.name} ({mostClickedBookmark.clickCount} 次点击)</p>
          </div>

          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg`}>
            <div className="flex items-center mb-2">
              <FaCalendarAlt className="text-green-500 mr-2" />
              <h3 className="text-lg font-semibold">最近添加的书签</h3>
            </div>
            {recentBookmarks.length > 0 ? (
              <ul>
                {recentBookmarks.map((bookmark, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">{bookmark.name}</span>
                    <br />
                    <small>{new Date(bookmark.createdAt).toLocaleDateString()}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>暂无最近添加的书签</p>
            )}
          </div>

          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg md:col-span-2`}>
            <div className="flex items-center mb-2">
              <FaTags className="text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold">标签使用情况</h3>
            </div>
            {Object.keys(tagUsage).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(tagUsage).map(([tag, count]) => (
                  <div key={tag} className={`${isDarkMode ? 'bg-gray-600' : 'bg-white'} p-2 rounded-lg`}>
                    <span className="font-semibold">{tag}:</span> {count} 次使用
                  </div>
                ))}
              </div>
            ) : (
              <p>暂无标签使用数据</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkStatistics;