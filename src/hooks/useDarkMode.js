import { useCallback } from 'react';

const useDarkMode = (isDarkMode, toggleDarkMode) => {
  const handleToggleDarkMode = useCallback(() => {
    toggleDarkMode();
  }, [toggleDarkMode]);

  return {
    isDarkMode,
    handleToggleDarkMode
  };
};

export default useDarkMode;