import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import * as reducers from './Reducers';
import LoginPageReducer from '../../LoginPage/LoginPageReducer.js';
import HomePageReducer from '../../HomePage/HomePageReducer.js';

const store = createStore(
  combineReducers({
    // ...reducers,
    LoginPageReducer,
    HomePageReducer,
    routing: routerReducer
  })
);

export { store };
