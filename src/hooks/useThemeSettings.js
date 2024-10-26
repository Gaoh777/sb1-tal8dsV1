import { useState } from 'react';

const useThemeSettings = (initialTheme, saveTheme) => {
  const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);

  const openThemeSettings = () => setIsThemeSettingsOpen(true);
  const closeThemeSettings = () => setIsThemeSettingsOpen(false);

  const handleSaveTheme = (newTheme) => {
    saveTheme(newTheme);
    closeThemeSettings();
  };

  return {
    isThemeSettingsOpen,
    openThemeSettings,
    closeThemeSettings,
    handleSaveTheme
  };
};

export default useThemeSettings;