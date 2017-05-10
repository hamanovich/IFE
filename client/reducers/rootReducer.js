import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import flashMessages from './flashMessages';
import auth from './auth';
import questions from './questions';

export default combineReducers({
  flashMessages,
  auth,
  questions,
  form: reduxFormReducer,
  routing: routerReducer
});
