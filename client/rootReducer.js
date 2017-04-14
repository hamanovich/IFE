import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';

export default combineReducers({
  flashMessages,
  auth,
  form: reduxFormReducer
});
