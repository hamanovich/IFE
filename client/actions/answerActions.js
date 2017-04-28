import axios from 'axios';

export function getQuestionsRequest(type) {
  return () => axios.get(`/api/questions/${type || ''}`);
}

export function removeQuestionById(id) {
  return () => axios.delete(`/api/questions/${id}`);
}

export function changeQuestionField(id, field, value) {
  console.log('PUT', id, field, value);

  return () => axios.put(`/api/questions/${id}`, { field, value });
}
