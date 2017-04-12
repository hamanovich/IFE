import axios from 'axios';

export function login(userData) {
  return () => axios.post('/api/auth', userData);
}
