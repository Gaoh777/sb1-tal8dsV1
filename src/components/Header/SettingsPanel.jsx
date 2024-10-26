import React from 'react';
import { FaTimes, FaPalette, FaFileDownload, FaDownload, FaFileUpload, FaTrash, FaTags, FaChartBar } from 'react-icons/fa';

const SettingsPanel = ({
  onClose,
  onOpenThemeSettings,
  onExport,
  onImport,
  onDownloadTemplate,
  onViewDeletedBookmarks,
  onOpenTagManagement,
  onOpenStatistics,
  isDarkMode
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg p-8 max-w-md w-full`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">设置</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <button
          onClick={onOpenThemeSettings}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 flex items-center justify-center"
        >
          <FaPalette className="mr-2" />
          设置主题颜色
        </button>
        <button
          onClick={onExport}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2 flex items-center justify-center"
        >
          <FaFileDownload className="mr-2" />
          导出收藏
        </button>
        <div className="flex space-x-2 mb-2">
          <button
            onClick={onDownloadTemplate}
            className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
          >
            <FaDownload className="mr-2" />
            下载导入模板
          </button>
          <label
            htmlFor="import-file"
            className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-center"
          >
            <FaFileUpload className="mr-2" />
            导入收藏
          </label>
        </div>
        <input
          id="import-file"
          type="file"
          accept=".xlsx"
          onChange={onImport}
          className="hidden"
        />
        <button
          onClick={onViewDeletedBookmarks}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center mb-2"
        >
          <FaTrash className="mr-2" />
          查看已删除的收藏
        </button>
        <button
          onClick={onOpenTagManagement}
          className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center justify-center mb-2"
        >
          <FaTags className="mr-2" />
          管理标签
        </button>
        <button
          onClick={onOpenStatistics}
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center justify-center"
        >
          <FaChartBar className="mr-2" />
          查看统计信息
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;