import axios from 'axios';
import { ADD_QUESTIONS, FILTER_QUESTIONS, QUESTION_GOT } from './types';

export function addQuestions(questions) {
  return {
    type: ADD_QUESTIONS,
    questions
  };
}

export function filterQuestions(filter) {
  return {
    type: FILTER_QUESTIONS,
    filter
  };
}

export function questionGot(question) {
  return {
    type: QUESTION_GOT,
    question
  };
}

export function getQuestions(filter) {
  return dispatch => axios.get('/api/questions')
    .then((res) => {
      dispatch(addQuestions(res.data.ans));
      if (filter) {
        dispatch(filterQuestions(filter));
      }
    });
}

export function getQuestion(id) {
  return dispatch => axios.get(`/api/questions/id/${id}`)
    .then(res => dispatch(questionGot(res.data.ans)));
}

export function removeQuestionById(id) {
  return () => axios.delete(`/api/questions/${id}`);
}

export function changeQuestionField(id, field, value) {
  return () => axios.put(`/api/questions/${id}`, { field, value });
}
