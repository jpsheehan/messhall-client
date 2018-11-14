const snackbar = (state = {}, action) => {

  switch (action.type) {

    case 'SHOW_SNACKBAR':
      const {snackbar} = action.payload;
      return {
        ...snackbar,
        open: true,
      };

    case 'HIDE_SNACKBAR':
      return {
        ...state.snackbar,
        open: false,
      };

    default:
      return state;

  }

};

export default snackbar;
