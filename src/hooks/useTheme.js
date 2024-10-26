import { useState, useEffect, useCallback } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState({
    backgroundColor: '#ffffff',
    headerBackgroundColor: '#3b82f6',
    backgroundImages: [],
    headerBackgroundImages: [],
    isBackgroundRotationEnabled: false,
    isHeaderRotationEnabled: false,
    currentBackgroundIndex: 0,
    currentHeaderIndex: 0
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = JSON.parse(localStorage.getItem('theme'));
      const savedIsDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
      
      if (savedTheme) {
        setTheme(prev => ({
          ...prev,
          ...savedTheme,
          backgroundImages: savedTheme.backgroundImages || [],
          headerBackgroundImages: savedTheme.headerBackgroundImages || []
        }));
      }
      
      if (typeof savedIsDarkMode === 'boolean') {
        setIsDarkMode(savedIsDarkMode);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('theme', JSON.stringify(theme));
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [theme, isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const saveTheme = useCallback((newTheme) => {
    setTheme(prev => ({
      ...prev,
      ...newTheme,
      backgroundImages: newTheme.backgroundImages || prev.backgroundImages,
      headerBackgroundImages: newTheme.headerBackgroundImages || prev.headerBackgroundImages
    }));
  }, []);

  const getBackgroundStyle = useCallback(() => {
    if (isDarkMode) {
      return { backgroundColor: '#1a202c' };
    }
    
    if (theme.backgroundImages.length > 0 && theme.isBackgroundRotationEnabled) {
      return {
        backgroundImage: `url(${theme.backgroundImages[theme.currentBackgroundIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      };
    }
    
    return { backgroundColor: theme.backgroundColor };
  }, [isDarkMode, theme]);

  const getHeaderStyle = useCallback(() => {
    if (theme.headerBackgroundImages.length > 0 && theme.isHeaderRotationEnabled) {
      return {
        backgroundImage: `url(${theme.headerBackgroundImages[theme.currentHeaderIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    return { backgroundColor: theme.headerBackgroundColor };
  }, [theme]);

  return {
    isDarkMode,
    theme,
    toggleDarkMode,
    saveTheme,
    getBackgroundStyle,
    getHeaderStyle
  };
};

export default useTheme;