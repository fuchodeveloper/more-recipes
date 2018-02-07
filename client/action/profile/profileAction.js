import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';
/**
 * @description update profile action creator
 *
 * @param {Object} profile
 *
 * @returns {Object} profile
 */
export const profileActionCreator = profile => ({
  type: GET_PROFILE_SUCCESS,
  profile
});

/**
 * @description update profile action error
 *
 * @param {Object} error
 *
 * @returns {Object} error
 */
export const profileActionCreatorError = error => ({
  type: GET_PROFILE_FAIL,
  error
});
/**
 * @description function to handle user profile
 *
 * @param {Nmber} id
 *
 * @returns {Promise} returns the authenticated user
 */
const profileAction = id => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/profile/${id}`)
    .then((response) => {
      dispatch(profileActionCreator(response.data.user));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      dispatch(profileActionCreatorError(error));
    });
};

export default profileAction;
