import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as reducers from './Reducers';

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);

export { store };
