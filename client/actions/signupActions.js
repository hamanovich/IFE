import axios from 'axios';
import { USER_GOT } from './types';

export const userGot = user => ({
  type: USER_GOT,
  user
});

export const userSignupRequest = userData =>
  () => axios.post('/api/users', userData);

export const isUserExists = id =>
  () => axios.get(`/api/users/${id}`);

export const getUser = id =>
  dispatch => axios.get(`/api/users/id/${id}`)
    .then(res => dispatch(userGot(res.data.user)));

export const removeUserById = id =>
  () => axios.delete(`/api/users/${id}`);

export const updateUser = user =>
  () => axios.put(`/api/users/${user.id}`, user);
