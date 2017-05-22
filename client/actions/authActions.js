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

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
      dispatch(getUser(res.data._id));
    });

export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
