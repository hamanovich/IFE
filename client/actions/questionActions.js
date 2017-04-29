import axios from 'axios';

export function addQuestion(data) {
  return () => axios.post('/api/add-question', data);
}

export function updateQuestion(data) {
  console.log('update', data);
  return () => axios.put(`/api/add-question/${data._id}`, data);
}
