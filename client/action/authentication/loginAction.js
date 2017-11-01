import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from '../types';

/**
 * set current user type
 *
 * @export currentUser
 * @param {any} user
 * @returns {obj} obj
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

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
  return (dispatch) => axios.post('/api/v1/users/signin', data)
     .then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
}
