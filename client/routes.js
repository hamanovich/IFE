import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import AddQuestionPage from './components/addQuestion/AddQuestionPage';
import AnswersPage from './components/answers/AnswersPage';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="add-question" component={requireAuth(AddQuestionPage)} />
    <Route path="answers" component={AnswersPage}>
      <Route path="*/:type" component={AnswersPage} />
    </Route>
  </Route>
);
