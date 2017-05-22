import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import flashMessages from './flashMessages';
import auth from './auth';
import questions from './questions';

const reducer = combineReducers({
  flashMessages,
  auth,
  questions,
  form: reduxFormReducer,
  routing: routerReducer
});

export default reducer;
