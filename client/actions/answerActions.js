import axios from 'axios';

export function getQuestionsRequest(type) {
  return () => axios.get(`/api/questions/${type}`);
}
