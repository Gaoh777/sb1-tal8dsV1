import React, { useState } from 'react';
import { FaTimes, FaEdit, FaTrash, FaArrowRight } from 'react-icons/fa';

const TagManagement = ({ 
  tags, 
  updateTag, 
  deleteTag, 
  mergeTags, 
  onClose, 
  isDarkMode, 
  isSimilarBookmarksEnabled, 
  toggleSimilarBookmarks,
  tagRecommendations,
  toggleTagRecommendation
}) => {
  const [editingTag, setEditingTag] = useState(null);
  const [newTagName, setNewTagName] = useState('');
  const [mergeSource, setMergeSource] = useState('');
  const [mergeTarget, setMergeTarget] = useState('');

  const handleEditTag = (tag) => {
    setEditingTag(tag);
    setNewTagName(tag);
  };

  const handleUpdateTag = () => {
    if (newTagName && newTagName !== editingTag && !tags.includes(newTagName)) {
      updateTag(editingTag, newTagName);
      setEditingTag(null);
      setNewTagName('');
    } else if (tags.includes(newTagName)) {
      alert('标签名已存在，请使用其他名称。');
    }
  };

  const handleDeleteTag = (tag) => {
    if (window.confirm(`确定要删除标签 "${tag}" 吗？这将从所有使用该标签的书签中移除此标签。`)) {
      deleteTag(tag);
    }
  };

  const handleMergeTags = () => {
    if (mergeSource && mergeTarget && mergeSource !== mergeTarget) {
      if (window.confirm(`确定要将标签 "${mergeSource}" 合并到 "${mergeTarget}" 吗？这将更新所有使用 "${mergeSource}" 的书签。`)) {
        mergeTags(mergeSource, mergeTarget);
        setMergeSource('');
        setMergeTarget('');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-2xl w-full max-h-screen overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">标签管理</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">标签列表</h3>
          <ul className="space-y-2">
            {tags.map((tag) => (
              <li key={tag} className="flex items-center justify-between">
                <span>{tag}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditTag(tag)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTag(tag)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <FaTrash />
                  </button>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={tagRecommendations[tag] || false}
                      onChange={() => toggleTagRecommendation(tag)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-sm">启用推荐</span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editingTag && (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">编辑标签</h3>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleUpdateTag}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                更新
              </button>
              <button
                onClick={() => setEditingTag(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none"
              >
                取消
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">合并标签</h3>
          <div className="flex items-center space-x-2">
            <select
              value={mergeSource}
              onChange={(e) => setMergeSource(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">选择源标签</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <FaArrowRight />
            <select
              value={mergeTarget}
              onChange={(e) => setMergeTarget(e.target.value)}
              className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">选择目标标签</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <button
              onClick={handleMergeTags}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            >
              合并
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">相似书签功能</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="similarBookmarks"
              checked={isSimilarBookmarksEnabled}
              onChange={toggleSimilarBookmarks}
              className="mr-2"
            />
            <label htmlFor="similarBookmarks">启用相似书签推荐</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagManagement;