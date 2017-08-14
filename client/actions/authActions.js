import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { getUser } from './signupActions';

import { SET_CURRENT_USER } from './types';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const login = userData =>
  dispatch => axios.post('/api/auth', userData)
    .then((res) => {
      const token = res.data.token;

      console.log(jwtDecode(token));

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      dispatch(getUser(res.data._id));
    });

export const forgot = email =>
  () => axios.post('/api/auth/forgot', email)
    .then(res => res.data);

export const getReset = token =>
  () => axios.get(`/api/auth/reset/${token}`)
    .then(res => res.data);

export const reset = (token, passwords) =>
  () => axios.post(`/api/auth/reset/${token}`, passwords)
    .then(res => res.data);

export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
