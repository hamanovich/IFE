import axios from 'axios';

export function addQuestionRequest(data) {
  return () => axios.post('/api/add-question', data);
}
