import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { Auth } from './js/Utils/Auth';
import { Layout } from './js/Common/Layout';
import { HomePageContainer } from './js/HomePage';
import { SuccessPage } from './js/SuccessPage';

const routes = (
  <Route component={Auth}>
    <Route path='/' component={Layout}>
      <IndexRoute component={HomePageContainer} />
      <Route path='success' name='success' component={SuccessPage} />
    </Route>
  </Route>
);

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
    document.getElementById('root')
);
