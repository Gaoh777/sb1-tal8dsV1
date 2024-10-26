import { useState, useEffect } from 'react';

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [deletedBookmarks, setDeletedBookmarks] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
      const savedDeletedBookmarks = JSON.parse(localStorage.getItem('deletedBookmarks')) || [];
      const savedTags = JSON.parse(localStorage.getItem('tags')) || [];
      setBookmarks(savedBookmarks.map(bookmark => ({ ...bookmark, tags: Array.isArray(bookmark.tags) ? bookmark.tags : [] })));
      setDeletedBookmarks(savedDeletedBookmarks.map(bookmark => ({ ...bookmark, tags: Array.isArray(bookmark.tags) ? bookmark.tags : [] })));
      setTags(savedTags);
    };
    loadBookmarks();
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    localStorage.setItem('deletedBookmarks', JSON.stringify(deletedBookmarks));
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [bookmarks, deletedBookmarks, tags]);

  const addBookmark = (newBookmark) => {
    const bookmarkWithTags = {
      ...newBookmark,
      id: Date.now().toString(),
      tags: Array.isArray(newBookmark.tags) ? newBookmark.tags : [newBookmark.tags].filter(Boolean),
      clickCount: 0,
      createdAt: new Date().toISOString()
    };

    // 检查是否存在相同的书签
    const isDuplicate = bookmarks.some(bookmark => 
      bookmark.url === bookmarkWithTags.url && 
      bookmark.name === bookmarkWithTags.name &&
      JSON.stringify(bookmark.tags.sort()) === JSON.stringify(bookmarkWithTags.tags.sort())
    );

    if (isDuplicate) {
      throw new Error('该书签已存在');
    }

    setBookmarks(prevBookmarks => [...prevBookmarks, bookmarkWithTags]);
    
    // 更新标签
    if (bookmarkWithTags.tags.length > 0) {
      updateTags(bookmarkWithTags.tags);
    }
  };

  const deleteBookmark = (id) => {
    setBookmarks(prevBookmarks => {
      const bookmarkIndex = prevBookmarks.findIndex(b => b.id === id);
      if (bookmarkIndex === -1) return prevBookmarks;

      const newBookmarks = [...prevBookmarks];
      const deletedBookmark = newBookmarks.splice(bookmarkIndex, 1)[0];
      setDeletedBookmarks(prevDeleted => [...prevDeleted, {...deletedBookmark, deleteDate: new Date().toISOString()}]);
      return newBookmarks;
    });
  };

  const restoreBookmark = (index) => {
    setDeletedBookmarks(prevDeleted => {
      const newDeletedBookmarks = [...prevDeleted];
      const restoredBookmark = newDeletedBookmarks.splice(index, 1)[0];
      
      // 检查是否存在相同的书签
      const isDuplicate = bookmarks.some(bookmark => 
        bookmark.url === restoredBookmark.url && 
        bookmark.name === restoredBookmark.name &&
        JSON.stringify(bookmark.tags.sort()) === JSON.stringify(restoredBookmark.tags.sort())
      );

      if (isDuplicate) {
        throw new Error('该书签已存在');
      }

      setBookmarks(prevBookmarks => [...prevBookmarks, {
        ...restoredBookmark,
        id: Date.now().toString(),
        clickCount: 0,
        createdAt: new Date().toISOString()
      }]);

      // 更新标签
      if (restoredBookmark.tags.length > 0) {
        updateTags(restoredBookmark.tags);
      }

      return newDeletedBookmarks;
    });
  };

  const permanentDeleteBookmark = (index) => {
    setDeletedBookmarks(prevDeleted => prevDeleted.filter((_, i) => i !== index));
  };

  const updateBookmarkClickCount = (id) => {
    setBookmarks(prevBookmarks => prevBookmarks.map(bookmark => 
      bookmark.id === id ? { ...bookmark, clickCount: (bookmark.clickCount || 0) + 1 } : bookmark
    ));
  };

  const updateTags = (newTags) => {
    if (!Array.isArray(newTags)) {
      newTags = [newTags].filter(Boolean);
    }
    setTags(prevTags => {
      const updatedTags = [...new Set([...prevTags, ...newTags])];
      return updatedTags;
    });
  };

  const updateBookmark = (id, updatedData) => {
    setBookmarks(prevBookmarks => {
      const updatedBookmarks = prevBookmarks.map(bookmark => 
        bookmark.id === id 
          ? { 
              ...bookmark, 
              ...updatedData,
              tags: Array.isArray(updatedData.tags) ? updatedData.tags : [updatedData.tags].filter(Boolean)
            } 
          : bookmark
      );
      
      // 更新标签
      const newTags = updatedBookmarks.find(b => b.id === id)?.tags || [];
      if (newTags.length > 0) {
        updateTags(newTags);
      }
      
      return updatedBookmarks;
    });
  };

  return {
    bookmarks,
    deletedBookmarks,
    tags,
    addBookmark,
    deleteBookmark,
    restoreBookmark,
    permanentDeleteBookmark,
    updateBookmarkClickCount,
    setBookmarks,
    updateTags,
    updateBookmark
  };
};

export default useBookmarks;