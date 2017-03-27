import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { Auth } from './js/Utils/Auth';
import { Layout } from './js/Common/Layout';
import { HomePageContainer } from './js/HomePage';
import { SuccessPage } from './js/SuccessPage';

import { store } from './js/Utils/Store';
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Auth}>
        <Route path="/" component={Layout}>
          <IndexRoute component={HomePageContainer} />
          <Route path="success" name="success" component={SuccessPage} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
