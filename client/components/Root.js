import React from 'react';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import routes from '../routes';
import rootReducer from '../reducers';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { getUser } from '../actions/signupActions';
import { setCurrentUser } from '../actions/authActions';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const localJwtToken = localStorage.jwtToken;

if (localJwtToken) {
  setAuthorizationToken(localJwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localJwtToken)));
  store.dispatch(getUser(jwtDecode(localJwtToken)._id));
}

const history = syncHistoryWithStore(browserHistory, store);

const Root = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

export default Root;
