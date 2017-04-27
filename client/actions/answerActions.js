import axios from 'axios';

export function getQuestionsRequest(type) {
  return () => axios.get(`/api/questions/${type || ''}`);
}

export function removeQuestionById(id) {
  return () => axios.delete(`/api/questions/${id}`);
}
