import axios from 'axios';
import { batchActions } from 'redux-batched-actions';

export function userSignupRequest(userData) {
  return dispatch => axios.post('/api/v1/users/signup', userData);
}
