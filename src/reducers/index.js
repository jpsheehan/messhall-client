import {combineReducers} from 'redux';

import snackbar from './snackbar';
import search from './search';

export default combineReducers({
  snackbar,
  search,
});
