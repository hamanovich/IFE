import axios from 'axios';

export function getAnswersRequest() {
  return () => axios.get('/api/answers');
}

export function getAnswersByType(type) {
  console.log(type, type.split('/')[1]);
  return () => axios.get(`/api/answers/${type.split('/')[1]}`);
}
