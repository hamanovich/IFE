import axios from 'axios';

export function userSignupRequest(userData) {
  console.log(userData.avatar.img);
  return () => axios.post('/api/users', userData);
}

export function isUserExists(id) {
  return () => axios.get(`/api/users/${id}`);
}
