const search = (state = {}, action) => {

  switch (action.type) {

    case 'SET_SEARCH_TERM':
      const {term} = action.payload.search;
      return {
        term,
      };

    default:
      return state;

  }

};

export default search;
