import { useState } from 'react';

const useDeletedBookmarks = (deletedBookmarks, restoreBookmark, permanentDeleteBookmark) => {
  const [isDeletedBookmarksOpen, setIsDeletedBookmarksOpen] = useState(false);

  const openDeletedBookmarks = () => setIsDeletedBookmarksOpen(true);
  const closeDeletedBookmarks = () => setIsDeletedBookmarksOpen(false);

  const handleRestoreBookmark = (index, newTag, editedName, editedUrl) => {
    restoreBookmark(index, newTag, editedName, editedUrl);
    if (deletedBookmarks.length === 1) {
      closeDeletedBookmarks();
    }
  };

  const handlePermanentDelete = (index) => {
    permanentDeleteBookmark(index);
    if (deletedBookmarks.length === 1) {
      closeDeletedBookmarks();
    }
  };

  return {
    isDeletedBookmarksOpen,
    openDeletedBookmarks,
    closeDeletedBookmarks,
    handleRestoreBookmark,
    handlePermanentDelete
  };
};

export default useDeletedBookmarks;