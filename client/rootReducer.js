import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import questions from './reducers/questions';

export default combineReducers({
  flashMessages,
  auth,
  questions,
  form: reduxFormReducer
});
