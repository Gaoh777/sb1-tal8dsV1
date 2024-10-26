import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddBookmarkForm = ({ addBookmark, tags, addTag, onClose, isDarkMode }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !url) {
      alert('请填写网址名称和网址！');
      return;
    }

    try {
      const finalTags = [...selectedTags];
      if (newTag) {
        finalTags.push(newTag);
      }

      addBookmark({
        name,
        url,
        tags: finalTags.length > 0 ? finalTags : ['未分类']
      });

      if (newTag) {
        addTag([newTag]);
      }

      setName('');
      setUrl('');
      setSelectedTags([]);
      setNewTag('');
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleAddNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setSelectedTags(prev => [...prev, newTag]);
      setNewTag('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">添加新收藏</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2">
              名称
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block font-bold mb-2">
              网址
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">选择标签</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagSelect(tag)}
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
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="添加新标签"
                className={`flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'
                }`}
              />
              <button
                type="button"
                onClick={handleAddNewTag}
                className="px-4 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
              >
                添加
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            保存收藏
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookmarkForm;