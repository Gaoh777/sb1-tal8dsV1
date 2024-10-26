import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import BookmarkList from './components/BookmarkList/BookmarkList';
import AddBookmarkForm from './components/AddBookmarkForm';
import FrequentBookmarks from './components/FrequentBookmarks';
import DeletedBookmarks from './components/DeletedBookmarks';
import ThemeSettings from './components/ThemeSettings';
import ModeSwitch from './components/ModeSwitch';
import TagManagement from './components/TagManagement';
import BookmarkStatistics from './components/BookmarkStatistics';
import TagCloud from './components/TagCloud';
import useBookmarks from './hooks/useBookmarks';
import useTheme from './hooks/useTheme';
import useImportExport from './hooks/useImportExport';
import useThemeSettings from './hooks/useThemeSettings';
import useDeletedBookmarks from './hooks/useDeletedBookmarks';
import useDarkMode from './hooks/useDarkMode';
import useSearch from './hooks/useSearch';

const App = () => {
  const {
    bookmarks,
    deletedBookmarks,
    tags,
    addBookmark,
    deleteBookmark,
    restoreBookmark,
    permanentDeleteBookmark,
    updateBookmarkClickCount,
    setBookmarks,
    updateTags
  } = useBookmarks();

  const {
    isDarkMode,
    theme,
    toggleDarkMode,
    saveTheme,
    getBackgroundStyle,
    getHeaderStyle
  } = useTheme();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTagManagementOpen, setIsTagManagementOpen] = useState(false);
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [isSimilarBookmarksEnabled, setIsSimilarBookmarksEnabled] = useState(false);
  const [tagRecommendations, setTagRecommendations] = useState({});

  const { handleExport, handleImport, handleDownloadTemplate } = useImportExport(
    bookmarks,
    setBookmarks,
    tags,
    updateTags
  );

  const {
    isThemeSettingsOpen,
    openThemeSettings,
    closeThemeSettings,
    handleSaveTheme
  } = useThemeSettings(theme, saveTheme);

  const {
    isDeletedBookmarksOpen,
    openDeletedBookmarks,
    closeDeletedBookmarks,
    handleRestoreBookmark,
    handlePermanentDelete
  } = useDeletedBookmarks(deletedBookmarks, restoreBookmark, permanentDeleteBookmark);

  const { isDarkMode: darkModeState, handleToggleDarkMode } = useDarkMode(
    isDarkMode,
    toggleDarkMode
  );

  const {
    searchTerm,
    setSearchTerm,
    advancedSearchParams,
    setAdvancedSearchParams,
    filteredBookmarks,
    handleSearch,
    handleAdvancedSearch
  } = useSearch(bookmarks);

  const handleTagClick = useCallback((tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  }, [selectedTag]);

  const handleBookmarkClick = useCallback((bookmark) => {
    setSelectedBookmark(bookmark);
    updateBookmarkClickCount(bookmark.id);
  }, [updateBookmarkClickCount]);

  const toggleTagRecommendation = useCallback((tag) => {
    setTagRecommendations(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  }, []);

  return (
    <div
      className={`min-h-screen ${darkModeState ? 'text-white' : 'text-black'}`}
      style={getBackgroundStyle()}
    >
      <Header
        onAddBookmark={() => setIsFormOpen(true)}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        onViewDeletedBookmarks={openDeletedBookmarks}
        onOpenThemeSettings={openThemeSettings}
        onOpenTagManagement={() => setIsTagManagementOpen(true)}
        onOpenStatistics={() => setIsStatisticsOpen(true)}
        isDarkMode={darkModeState}
        headerStyle={getHeaderStyle()}
        onAdvancedSearch={handleAdvancedSearch}
        advancedSearchParams={advancedSearchParams}
        setAdvancedSearchParams={setAdvancedSearchParams}
        onExport={handleExport}
        onImport={handleImport}
        onDownloadTemplate={handleDownloadTemplate}
      />

      <main className="container mx-auto px-4 py-8">
        <TagCloud
          tags={tags}
          onTagClick={handleTagClick}
          isDarkMode={darkModeState}
          selectedTag={selectedTag}
        />

        <FrequentBookmarks
          bookmarks={bookmarks}
          onBookmarkClick={handleBookmarkClick}
          isDarkMode={darkModeState}
          selectedTag={selectedTag}
        />

        <BookmarkList
          bookmarks={filteredBookmarks.length > 0 ? filteredBookmarks : bookmarks}
          onBookmarkClick={handleBookmarkClick}
          onDeleteBookmark={deleteBookmark}
          onChangeTags={(bookmarkId, newTags) => {
            setBookmarks(prevBookmarks =>
              prevBookmarks.map(bookmark =>
                bookmark.id === bookmarkId
                  ? { ...bookmark, tags: newTags }
                  : bookmark
              )
            );
            updateTags(newTags);
          }}
          tags={tags}
          addTag={updateTags}
          isDarkMode={darkModeState}
          selectedTag={selectedTag}
        />
      </main>

      {isFormOpen && (
        <AddBookmarkForm
          addBookmark={addBookmark}
          tags={tags}
          addTag={updateTags}
          onClose={() => setIsFormOpen(false)}
          isDarkMode={darkModeState}
        />
      )}

      {isDeletedBookmarksOpen && (
        <DeletedBookmarks
          deletedBookmarks={deletedBookmarks}
          onRestoreBookmark={handleRestoreBookmark}
          onPermanentDelete={handlePermanentDelete}
          onClose={closeDeletedBookmarks}
          isDarkMode={darkModeState}
          tags={tags}
          addTag={updateTags}
        />
      )}

      {isThemeSettingsOpen && (
        <ThemeSettings
          theme={theme}
          onSave={handleSaveTheme}
          onClose={closeThemeSettings}
          isDarkMode={darkModeState}
        />
      )}

      {isTagManagementOpen && (
        <TagManagement
          tags={tags}
          updateTag={(oldTag, newTag) => {
            const updatedTags = tags.map(t => t === oldTag ? newTag : t);
            updateTags(updatedTags);
            setBookmarks(prevBookmarks =>
              prevBookmarks.map(bookmark => ({
                ...bookmark,
                tags: bookmark.tags.map(t => t === oldTag ? newTag : t)
              }))
            );
          }}
          deleteTag={(tagToDelete) => {
            const updatedTags = tags.filter(t => t !== tagToDelete);
            updateTags(updatedTags);
            setBookmarks(prevBookmarks =>
              prevBookmarks.map(bookmark => ({
                ...bookmark,
                tags: bookmark.tags.filter(t => t !== tagToDelete)
              }))
            );
          }}
          mergeTags={(sourceTag, targetTag) => {
            const updatedTags = tags.filter(t => t !== sourceTag);
            updateTags(updatedTags);
            setBookmarks(prevBookmarks =>
              prevBookmarks.map(bookmark => ({
                ...bookmark,
                tags: [...new Set([
                  ...bookmark.tags.filter(t => t !== sourceTag),
                  ...(bookmark.tags.includes(sourceTag) ? [targetTag] : [])
                ])]
              }))
            );
          }}
          onClose={() => setIsTagManagementOpen(false)}
          isDarkMode={darkModeState}
          isSimilarBookmarksEnabled={isSimilarBookmarksEnabled}
          toggleSimilarBookmarks={() => setIsSimilarBookmarksEnabled(!isSimilarBookmarksEnabled)}
          tagRecommendations={tagRecommendations}
          toggleTagRecommendation={toggleTagRecommendation}
        />
      )}

      {isStatisticsOpen && (
        <BookmarkStatistics
          bookmarks={bookmarks}
          onClose={() => setIsStatisticsOpen(false)}
          isDarkMode={darkModeState}
        />
      )}

      <ModeSwitch isDarkMode={darkModeState} toggleDarkMode={handleToggleDarkMode} />
    </div>
  );
};

export default App;