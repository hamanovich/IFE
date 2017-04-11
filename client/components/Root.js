import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import routes from '../routes';
import rootReducer from '../rootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const Root = () => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

export default Root;
