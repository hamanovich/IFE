import axios from 'axios';
import { ADD_QUESTIONS, QUESTION_ADDED, FILTER_QUESTIONS, QUESTION_GOT, QUESTION_UPDATED, REMOVE_QUESTION, EDIT_QUESTION } from './types';

export const addQuestions = questions => ({
  type: ADD_QUESTIONS,
  questions
});

export const filterQuestions = filter => ({
  type: FILTER_QUESTIONS,
  filter
});

export const questionGot = question => ({
  type: QUESTION_GOT,
  question
});

export const questionAdded = question => ({
  type: QUESTION_ADDED,
  question
});

export const questionUpdated = question => ({
  type: QUESTION_UPDATED,
  question
});

export const removeQuestion = question => ({
  type: REMOVE_QUESTION,
  question
});

export const editQuestion = question => ({
  type: EDIT_QUESTION,
  question
});

export const getQuestions = filter =>
  dispatch => axios.get('/api/questions')
    .then((res) => {
      dispatch(addQuestions(res.data.ans));

      if (filter) dispatch(filterQuestions(filter));
    });

export const getQuestion = id =>
  dispatch => axios.get(`/api/questions/id/${id}`)
    .then(res => dispatch(questionGot(res.data.ans)));

export const removeQuestionById = id =>
  dispatch => axios.delete(`/api/questions/${id}`)
    .then(res => dispatch(removeQuestion(res.data.ans)));

export const changeQuestionField = (id, field, value) =>
  dispatch => axios.put(`/api/questions/one/${id}`, { field, value })
    .then(res => dispatch(editQuestion(res.data.que)));

export const addQuestion = data =>
  dispatch => axios.post('/api/questions/add', data)
    .then(res => dispatch(questionAdded(res.data)));

export const updateQuestion = data =>
  dispatch => axios.put(`/api/questions/${data._id}`, data)
    .then(res => dispatch(questionUpdated(res.data.que)));
