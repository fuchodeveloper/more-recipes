/* eslint-disable no-undef */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_CURRENT_USER_FAIL } from '../types';

/**
 * set current user type
 *
 * @export setCurrentUser
 * @param {any} user
 * @returns {object} user
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export const setCurrentUserError = error => ({
  type: SET_CURRENT_USER_FAIL,
  error
});

/**
 * log authenticated user out from app
 *
 * @export logout
 * @returns {obj} obj
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

/**
 * log user into app
 *
 * @export login
 * @param {any} data
 * @returns {obj} obj
 */
export function login(data) {
  return dispatch => axios.post('/api/v1/users/signin', data)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch((error) => {
      console.log(error);
    });
}
