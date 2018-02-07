import axios from 'axios';
import jwt from 'jsonwebtoken';
import { batchActions } from 'redux-batched-actions';
import alertify from 'alertify.js';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_CURRENT_USER_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * @description The set current user action creator
 *
 * @export  setCurrentUser
 * @param   {object} user - the user object
 *
 * @returns {object} user - the user details saved
 * @returns {string} type - the action type
 */

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * @description The set current user error
 *
 * @export  setCurrentUserError
 * @param   {object} error - the error that occurred while signing up
 *
 * @returns {object} error - the error details from the server
 * @returns {string} type  - the error type
 */

export const setCurrentUserError = error => ({
  type: SET_CURRENT_USER_FAIL,
  error
});

/**
 * @description log in user into the application
 *
 * @export  signupAction
 *
 * @param   {object} userDetails -
 *          the details supplied by the user to be used for authentication
 *
 * @returns {object} dispatch    - the dispatch object returned
 */
const loginAction = userDetails => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/users/signin', userDetails)
    .then((response) => {
      const { token, message } = response.data;
      alertify.delay(2000);
      alertify.logPosition('bottom right');
      alertify.success(message);
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(batchActions([
        dispatch(setCurrentUser(jwt.decode(token))),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      alertify.delay(2000);
      alertify.logPosition('bottom right');
      alertify.error(error.response.data.error);
      dispatch(batchActions([
        dispatch(setCurrentUserError(error.response.data.error)),
        unsetFetching()
      ]));
    });
};

export default loginAction;
