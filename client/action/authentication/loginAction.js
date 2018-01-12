/* eslint-disable no-undef */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { batchActions } from 'redux-batched-actions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_CURRENT_USER_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * set current user type
 *
 * @export setCurrentUser
 * @param {any} user
 * @returns {object} user
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

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
const login = data => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/users/signin', data)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(batchActions([
        dispatch(setCurrentUser(jwt.decode(token))),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      dispatch(batchActions([
        dispatch(setCurrentUserError(error.response.data.error)),
        unsetFetching()
      ]));
    });
};

export default login;
