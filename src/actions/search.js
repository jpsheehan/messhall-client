export const setSearchTerm = (term) => ({
  type: 'SET_SEARCH_TERM',
  payload: {
    search: {
      term: term.toLowerCase(),
    },
  },
});
