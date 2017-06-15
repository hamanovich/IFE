import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/overall/Greetings';
import NotFound from './components/overall/NotFound';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import AddQuestionPage from './components/addQuestion/AddQuestionPage';
import QuestionsPage from './components/questions/QuestionsPage';
import AccountPage from './components/account/AccountPage';
import InterviewPage from './components/interview/InterviewPage';
import CandidateForm from './components/interview/CandidateForm';
import InterviewQuestions from './components/interview/InterviewQuestions';

import requireAuth from './utils/requireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Greetings} />
    <Route path="signup" component={SignupPage} />
    <Route path="user/:id" component={requireAuth(SignupPage)} />
    <Route path="login" component={LoginPage} />
    <Route path="add-question" component={requireAuth(AddQuestionPage)} />
    <Route path="question/:_id" component={requireAuth(AddQuestionPage)} />
    <Route path="account" component={requireAuth(AccountPage)} />
    <Route path="questions" component={QuestionsPage}>
      <Route path=":type" component={QuestionsPage} />
    </Route>
    <Route path="interview" component={InterviewPage} />
    <Route path="interview/step-1" component={CandidateForm} />
    <Route path="interview/step-2" component={InterviewQuestions} />
    <Route path="*" name="not-found" component={NotFound} />
  </Route>
);
