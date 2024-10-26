import React from 'react';

const EditTagsModal = ({
  isDarkMode,
  tags,
  selectedTags,
  onTagSelect,
  newTag,
  onNewTagChange,
  onAddNewTag,
  onCancel,
  onSave
}) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-md w-full`}>
        <h3 className="text-xl font-bold mb-4">编辑标签</h3>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagSelect(prev => 
                  prev.includes(tag) 
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                )}
                className={`px-2 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => onNewTagChange(e.target.value)}
              className={`flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
              }`}
              placeholder="添加新标签"
            />
            <button
              onClick={onAddNewTag}
              className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
            >
              添加
            </button>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'
            } hover:bg-gray-300 focus:outline-none`}
          >
            取消
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTagsModal;