import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import NotFound from './components/NotFound';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import AddQuestionPage from './components/addQuestion/AddQuestionPage';
import QuestionsPage from './components/questions/QuestionsPage';
import AccountPage from './components/account/AccountPage';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="add-question" component={requireAuth(AddQuestionPage)} />
    <Route path="question/:_id" component={AddQuestionPage} />
    <Route path="account" component={requireAuth(AccountPage)} />
    <Route path="questions" component={QuestionsPage}>
      <Route path=":type" component={QuestionsPage} />
    </Route>
    <Route path="*" name="not-found" component={NotFound} />
  </Route>
);
