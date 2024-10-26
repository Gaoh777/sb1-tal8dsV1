import { useState, useCallback } from 'react';
import { filterBookmarks, advancedFilterBookmarks, sortBookmarks } from '../utils/bookmarkUtils';

const useSearch = (bookmarks) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedSearchParams, setAdvancedSearchParams] = useState({
    name: '',
    url: '',
    tag: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (term.trim()) {
      const filtered = filterBookmarks(bookmarks, term);
      setFilteredBookmarks(filtered);
    } else {
      setFilteredBookmarks([]);
    }
  }, [bookmarks]);

  const handleAdvancedSearch = useCallback((params) => {
    setAdvancedSearchParams(params);
    let filtered = advancedFilterBookmarks(bookmarks, params);
    filtered = sortBookmarks(filtered, params.sortBy, params.sortOrder);
    setFilteredBookmarks(filtered);
  }, [bookmarks]);

  return {
    searchTerm,
    setSearchTerm,
    advancedSearchParams,
    setAdvancedSearchParams,
    filteredBookmarks,
    handleSearch,
    handleAdvancedSearch
  };
};

export default useSearch;