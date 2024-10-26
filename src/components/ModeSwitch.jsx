import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ModeSwitch = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="fixed top-4 right-4 z-10">
      <button
        onClick={toggleDarkMode}
        className={`p-2 rounded-full ${
          isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`}
      >
        {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
    </div>
  );
};

export default ModeSwitch;