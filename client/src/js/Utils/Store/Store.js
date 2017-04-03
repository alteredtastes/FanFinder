import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import * as reducers from './Reducers';
import HomePageReducer from '../../HomePage/HomePageReducer.js';
import SuccessPageReducer from '../../SuccessPage/SuccessPageReducer.js';

const store = createStore(
  combineReducers({
    // ...reducers,
    HomePageReducer,
    SuccessPageReducer,
    routing: routerReducer
  })
);

export { store };
