import axios from 'axios';
import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';
import networkError from '../networkError';

/**
 * @description update profile action creator
 *
 * @param {Object} profile user profile parameter
 *
 * @returns {Object} profile returns user profile object
 */
export const profileActionCreator = profile => ({
  type: GET_PROFILE_SUCCESS,
  profile
});

/**
 * @description update profile action error
 *
 * @param {Object} error user profile error object
 *
 * @returns {Object} error returns the error object
 */
export const profileActionCreatorError = error => ({
  type: GET_PROFILE_FAIL,
  error
});
/**
 * @description function to handle user profile
 *
 * @param {Nmber} id user profile id
 *
 * @returns {Object} returns the authenticated user profile
 */
const profileAction = id => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/profile/${id}`)
    .then((response) => {
      dispatch(profileActionCreator(response.data.user));
      dispatch(unsetFetching());
    })
    .catch((error) => {
      if (!error.response) {
        return networkError(error);
      }
      return dispatch(profileActionCreatorError(error.response.data.error));
    });
};

export default profileAction;
