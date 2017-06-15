import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import flashMessages from './flashMessages';
import auth from './auth';
import questions from './questions';
import interview from './interview';

const reducer = combineReducers({
  flashMessages,
  auth,
  questions,
  interview,
  form: reduxFormReducer,
  routing: routerReducer
});

export default reducer;
