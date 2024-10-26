import React from 'react';
import BookmarkCard from './BookmarkCard';

const BookmarkGroup = ({ 
  tag, 
  bookmarks, 
  isDarkMode,
  hoveredBookmark,
  onBookmarkHover,
  onBookmarkLeave,
  onBookmarkClick,
  onEditBookmark,
  onDeleteBookmark 
}) => {
  return (
    <div key={tag} className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{tag}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            isDarkMode={isDarkMode}
            isHovered={hoveredBookmark === bookmark.id}
            onMouseEnter={() => onBookmarkHover(bookmark.id)}
            onMouseLeave={onBookmarkLeave}
            onBookmarkClick={onBookmarkClick}
            onEdit={onEditBookmark}
            onDelete={onDeleteBookmark}
          />
        ))}
      </div>
    </div>
  );
};

export default BookmarkGroup;