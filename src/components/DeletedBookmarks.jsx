import React, { useState } from 'react';
import { FaLink, FaUndo, FaTrash, FaTimes } from 'react-icons/fa';

const DeletedBookmarks = ({ deletedBookmarks, onRestoreBookmark, onPermanentDelete, onClose, isDarkMode, tags, addTag }) => {
  const [restoringIndex, setRestoringIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedUrl, setEditedUrl] = useState('');

  const handleRestore = (index) => {
    if (!editedName || !editedUrl) {
      alert('网址名称和网址不能为空');
      return;
    }
    
    const finalTags = [...selectedTags];
    if (newTag) {
      addTag([newTag]);
      finalTags.push(newTag);
    }
    
    onRestoreBookmark(index, finalTags, editedName, editedUrl);
    setRestoringIndex(null);
    setSelectedTags([]);
    setNewTag('');
    setEditedName('');
    setEditedUrl('');
  };

  const startRestoring = (index) => {
    setRestoringIndex(index);
    setSelectedTags(deletedBookmarks[index].tags || []);
    setEditedName(deletedBookmarks[index].name);
    setEditedUrl(deletedBookmarks[index].url);
  };

  const handleTagSelect = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">已删除的收藏</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        {deletedBookmarks.length === 0 ? (
          <p>没有已删除的收藏</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">名称</th>
                <th className="text-left">网址</th>
                <th className="text-left">标签</th>
                <th className="text-left">删除日期</th>
                <th className="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {deletedBookmarks.map((bookmark, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">
                    <div className="flex items-center">
                      <FaLink className="text-blue-500 mr-2" />
                      <span>{bookmark.name}</span>
                    </div>
                  </td>
                  <td className="py-2">
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {bookmark.url}
                    </a>
                  </td>
                  <td className="py-2">{(bookmark.tags || []).join(', ')}</td>
                  <td className="py-2">
                    {new Date(bookmark.deleteDate).toLocaleString()}
                  </td>
                  <td className="py-2">
                    {restoringIndex === index ? (
                      <div className="flex flex-col space-y-2">
                        <input
                          type="text"
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          placeholder="网址名称"
                          className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={editedUrl}
                          onChange={(e) => setEditedUrl(e.target.value)}
                          placeholder="网址"
                          className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleTagSelect(tag)}
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
                        <div className="flex">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="新标签"
                            className="flex-grow px-2 py-1 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => {
                              if (newTag && !tags.includes(newTag)) {
                                addTag([newTag]);
                                setSelectedTags(prev => [...prev, newTag]);
                                setNewTag('');
                              }
                            }}
                            className="px-2 py-1 bg-green-500 text-white rounded-r-lg hover:bg-green-600 focus:outline-none"
                          >
                            添加
                          </button>
                        </div>
                        <button
                          onClick={() => handleRestore(index)}
                          className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                        >
                          确认
                        </button>
                        <button
                          onClick={() => setRestoringIndex(null)}
                          className="px-2 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startRestoring(index)}
                          className="text-green-500 hover:text-green-700 focus:outline-none"
                        >
                          <FaUndo className="mr-1" />
                          还原
                        </button>
                        <button
                          onClick={() => onPermanentDelete(index)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <FaTrash className="mr-1" />
                          永久删除
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DeletedBookmarks;