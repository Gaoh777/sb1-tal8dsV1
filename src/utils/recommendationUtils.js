export const findSimilarBookmarks = (currentBookmark, allBookmarks) => {
  const currentTags = new Set(currentBookmark.tags);
  
  return allBookmarks
    .filter(bookmark => bookmark.id !== currentBookmark.id)
    .map(bookmark => ({
      ...bookmark,
      similarity: bookmark.tags.filter(tag => currentTags.has(tag)).length
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
};