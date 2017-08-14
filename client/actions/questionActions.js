import axios from 'axios';
import {
  ADD_QUESTIONS,
  QUESTION_ADDED,
  FILTER_QUESTIONS,
  QUESTION_GOT,
  QUESTION_UPDATED,
  REMOVE_QUESTION,
  EDIT_QUESTION,
  VOTE_LIKE,
  VOTE_DISLIKE
} from './types';

export const addQuestions = (questions, count, pages) => ({
  type: ADD_QUESTIONS,
  questions,
  count,
  pages
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

export const voteLike = question => ({
  type: VOTE_LIKE,
  question
});

export const voteDislike = question => ({
  type: VOTE_DISLIKE,
  question
});

export const getQuestions = (page = 1) =>
  dispatch => axios.get(`/api/questions/page/${page}`)
    .then((res) => {
      const { ans, count, pages } = res.data;
      dispatch(addQuestions(ans, count, pages));

      return { ans, count, pages };
      // if (filter) dispatch(filterQuestions(filter));
    });

export const getQuestion = id =>
  dispatch => axios.get(`/api/questions/id/${id}`)
    .then(res => dispatch(questionGot(res.data.ans)));

export const removeQuestionById = id =>
  dispatch => axios.delete(`/api/questions/${id}`)
    .then(res => dispatch(removeQuestion(res.data.ans)));

export const changeQuestionField = (id, field, value, lastModified) =>
  dispatch => axios.put(`/api/questions/one/${id}`, { field, value, lastModified: lastModified || new Date() })
    .then(res => dispatch(editQuestion(res.data.que)));

export const voteQuestion = (id, field, value) =>
  dispatch => axios.put(`/api/questions/vote/${id}`, { field, value })
    .then((res) => {
      const like = field.split('.')[1];

      return like === 'like'
        ? dispatch(voteLike(res.data.que))
        : dispatch(voteDislike(res.data.que));
    });

export const addQuestion = data =>
  dispatch => axios.post('/api/questions/add', data)
    .then(res => dispatch(questionAdded(res.data)));

export const updateQuestion = data =>
  dispatch => axios.put(`/api/questions/${data._id}`, data)
    .then(res => dispatch(questionUpdated(res.data.que)));
