/**
 * Initialises the redux store and defines the reducers.
 */

import {createStore} from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

export {
  store,
};
