import React, { useState, useMemo } from 'react';
import BookmarkGroup from './BookmarkGroup';
import EditTagsModal from './EditTagsModal';
import { groupBookmarksByTag } from '../../utils/bookmarkUtils';

const BookmarkList = ({ 
  bookmarks, 
  onBookmarkClick, 
  onDeleteBookmark, 
  onChangeTags, 
  tags, 
  addTag, 
  isDarkMode, 
  selectedTag 
}) => {
  const [hoveredBookmark, setHoveredBookmark] = useState(null);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const groupedBookmarks = useMemo(() => {
    return groupBookmarksByTag(bookmarks, selectedTag);
  }, [bookmarks, selectedTag]);

  const handleSaveTags = (bookmarkId, tags) => {
    onChangeTags(bookmarkId, tags);
    setEditingBookmark(null);
    setSelectedTags([]);
    setNewTag('');
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">我的收藏</h2>
      {Object.entries(groupedBookmarks).map(([tag, bookmarks]) => (
        <BookmarkGroup
          key={tag}
          tag={tag}
          bookmarks={bookmarks}
          isDarkMode={isDarkMode}
          hoveredBookmark={hoveredBookmark}
          onBookmarkHover={(id) => setHoveredBookmark(id)}
          onBookmarkLeave={() => setHoveredBookmark(null)}
          onBookmarkClick={onBookmarkClick}
          onEditBookmark={setEditingBookmark}
          onDeleteBookmark={onDeleteBookmark}
        />
      ))}

      {editingBookmark && (
        <EditTagsModal
          isDarkMode={isDarkMode}
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={setSelectedTags}
          newTag={newTag}
          onNewTagChange={setNewTag}
          onAddNewTag={() => {
            if (newTag && !tags.includes(newTag)) {
              addTag([newTag]);
              setSelectedTags(prev => [...prev, newTag]);
              setNewTag('');
            }
          }}
          onCancel={() => setEditingBookmark(null)}
          onSave={() => handleSaveTags(editingBookmark.id, selectedTags)}
        />
      )}
    </div>
  );
};

export default BookmarkList;