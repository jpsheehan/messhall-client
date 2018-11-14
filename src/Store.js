/**
 * Initialises the redux store and defines the reducers.
 */

import {createStore} from 'redux';

const initialState = {
  snackbars: [],
};

/**
 * The redux reducer.
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
function reducer(state = initialState, action) {

  switch (action.type) {

    case 'SHOW_SNACKBAR':
      const {snackbar} = action.payload;
      snackbar.open = true;
      return {
        ...state,
        snackbars: [
          ...state.snackbars,
          snackbar,
        ],
      };

    case 'HIDE_SNACKBAR':
      const {index} = action.payload;
      return {
        ...state,
        snackbars: state.snackbars.map((snackbar, i) => {

          if (index === i) {

            snackbar.open = false;

          }
          return snackbar;

        }),
      };

    default:
      return state;

  }

}

const store = createStore(reducer);

export {
  store,
};
