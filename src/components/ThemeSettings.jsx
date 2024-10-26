import React, { useState } from 'react';
import { FaTimes, FaUpload, FaTrash } from 'react-icons/fa';

const ThemeSettings = ({ theme, onSave, onClose, isDarkMode }) => {
  const [newTheme, setNewTheme] = useState(theme);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTheme(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e, imageType) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map(file => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      }))
    ).then(images => {
      setNewTheme(prev => ({
        ...prev,
        [imageType]: [...(prev[imageType] || []), ...images].slice(0, 6)
      }));
    });
  };

  const handleRemoveImage = (imageType, index) => {
    setNewTheme(prev => ({
      ...prev,
      [imageType]: prev[imageType].filter((_, i) => i !== index)
    }));
  };

  const handleToggleRotation = (rotationType) => {
    setNewTheme(prev => ({
      ...prev,
      [rotationType]: !prev[rotationType]
    }));
  };

  const handleSave = () => {
    onSave({
      ...newTheme,
      backgroundImages: newTheme.backgroundImages || [],
      headerBackgroundImages: newTheme.headerBackgroundImages || [],
      isBackgroundRotationEnabled: Boolean(newTheme.isBackgroundRotationEnabled),
      isHeaderRotationEnabled: Boolean(newTheme.isHeaderRotationEnabled)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-4xl w-full max-h-screen overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">主题设置</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">背景设置</h3>
          <div className="flex items-center mb-2">
            <input
              type="color"
              name="backgroundColor"
              value={newTheme.backgroundColor}
              onChange={handleChange}
              className="mr-2 w-10 h-10 rounded cursor-pointer"
            />
            <label>背景颜色</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'backgroundImages')}
              className="hidden"
              id="background-upload"
              multiple
            />
            <label
              htmlFor="background-upload"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer inline-block mr-2"
            >
              <FaUpload className="inline-block mr-2" />
              上传背景图片 (最多6张)
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-2">
            {(newTheme.backgroundImages || []).map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`背景 ${index + 1}`} className="w-full h-32 object-cover rounded" />
                <button
                  onClick={() => handleRemoveImage('backgroundImages', index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="background-rotation"
              checked={newTheme.isBackgroundRotationEnabled}
              onChange={() => handleToggleRotation('isBackgroundRotationEnabled')}
              className="mr-2"
            />
            <label htmlFor="background-rotation">启用背景图片轮换（每30秒）</label>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">顶部背景设置</h3>
          <div className="flex items-center mb-2">
            <input
              type="color"
              name="headerBackgroundColor"
              value={newTheme.headerBackgroundColor}
              onChange={handleChange}
              className="mr-2 w-10 h-10 rounded cursor-pointer"
            />
            <label>顶部背景颜色</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'headerBackgroundImages')}
              className="hidden"
              id="header-background-upload"
              multiple
            />
            <label
              htmlFor="header-background-upload"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer inline-block mr-2"
            >
              <FaUpload className="inline-block mr-2" />
              上传顶部背景图片 (最多6张)
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-2">
            {(newTheme.headerBackgroundImages || []).map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`顶部背景 ${index + 1}`} className="w-full h-32 object-cover rounded" />
                <button
                  onClick={() => handleRemoveImage('headerBackgroundImages', index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="header-rotation"
              checked={newTheme.isHeaderRotationEnabled}
              onChange={() => handleToggleRotation('isHeaderRotationEnabled')}
              className="mr-2"
            />
            <label htmlFor="header-rotation">启用顶部背景图片轮换（每30秒）</label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;