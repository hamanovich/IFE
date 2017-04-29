import axios from 'axios';
import { ADD_QUESTIONS, QUESTION_GOT } from './types';

export function addQuestions(payload) {
  return {
    type: ADD_QUESTIONS,
    payload
  };
}

export function questionGot(question) {
  return {
    type: QUESTION_GOT,
    question
  };
}

export function getQuestions(type) {
  return dispatch => axios.get(`/api/questions/${type || ''}`)
    .then((res) => {
      dispatch(addQuestions(res.data.ans));
      return res.data.ans;
    });
}

export function getQuestion(id) {
  return dispatch => axios.get(`/api/questions/id/${id}`)
    .then((res) => {
      dispatch(questionGot(res.data.ans));
      return res.data.ans;
    });
}

export function removeQuestionById(id) {
  return () => axios.delete(`/api/questions/${id}`);
}

export function changeQuestionField(id, field, value) {
  return () => axios.put(`/api/questions/${id}`, { field, value });
}
