import React from 'react';

const TagCloud = ({ tags, selectedTag, onTagClick, isDarkMode }) => {
  const tagCounts = tags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const getTagSize = (count) => {
    if (Object.keys(tagCounts).length === 0) return 16;
    
    const minCount = Math.min(...Object.values(tagCounts));
    const maxCount = Math.max(...Object.values(tagCounts));
    const minSize = 12;
    const maxSize = 24;
    
    if (minCount === maxCount) return (minSize + maxSize) / 2;
    
    return minSize + ((count - minCount) / (maxCount - minCount)) * (maxSize - minSize);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">标签云</h2>
        {selectedTag && (
          <button
            onClick={() => onTagClick(null)}
            className={`px-3 py-1 rounded-lg text-sm ${
              isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
            } hover:bg-blue-500 hover:text-white transition-colors duration-200`}
          >
            显示全部
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(tagCounts).map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`px-3 py-1 rounded-full transition-colors duration-200 ${
              selectedTag === tag
                ? 'bg-blue-500 text-white'
                : isDarkMode
                ? 'bg-gray-700 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
            }`}
            style={{ fontSize: `${getTagSize(count)}px` }}
          >
            {tag} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;