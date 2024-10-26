export const filterBookmarks = (bookmarks, searchTerm) => {
  if (!searchTerm?.trim()) return [];
  
  const terms = searchTerm.toLowerCase().split(/\s+/);
  return bookmarks.filter(bookmark => {
    const searchableText = [
      bookmark.name.toLowerCase(),
      bookmark.url.toLowerCase(),
      ...(bookmark.tags || []).map(tag => tag.toLowerCase())
    ].join(' ');
    
    return terms.every(term => searchableText.includes(term));
  });
};

export const advancedFilterBookmarks = (bookmarks, params) => {
  if (!bookmarks) return [];
  
  return bookmarks.filter(bookmark => {
    if (params.name && !bookmark.name.toLowerCase().includes(params.name.toLowerCase())) {
      return false;
    }
    if (params.url && !bookmark.url.toLowerCase().includes(params.url.toLowerCase())) {
      return false;
    }
    if (params.tag && !bookmark.tags.some(tag => 
      tag.toLowerCase().includes(params.tag.toLowerCase())
    )) {
      return false;
    }
    if (params.dateFrom && new Date(bookmark.createdAt) < new Date(params.dateFrom)) {
      return false;
    }
    if (params.dateTo && new Date(bookmark.createdAt) > new Date(params.dateTo)) {
      return false;
    }
    return true;
  });
};

export const sortBookmarks = (bookmarks, sortBy = 'name', sortOrder = 'asc') => {
  if (!bookmarks) return [];
  
  const sortedBookmarks = [...bookmarks].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'createdAt':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'clickCount':
        return (a.clickCount || 0) - (b.clickCount || 0);
      default:
        return 0;
    }
  });
  
  return sortOrder === 'desc' ? sortedBookmarks.reverse() : sortedBookmarks;
};

export const groupBookmarksByTag = (bookmarks, selectedTag = null) => {
  if (!bookmarks) return {};
  
  if (selectedTag) {
    return {
      [selectedTag]: bookmarks.filter(b => b.tags.includes(selectedTag))
    };
  }

  return bookmarks.reduce((groups, bookmark) => {
    const tags = bookmark.tags.length > 0 ? bookmark.tags : ['未分类'];
    tags.forEach(tag => {
      if (!groups[tag]) {
        groups[tag] = [];
      }
      if (!groups[tag].some(b => b.id === bookmark.id)) {
        groups[tag].push(bookmark);
      }
    });
    return groups;
  }, {});
};