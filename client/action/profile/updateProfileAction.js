import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import alertify from 'alertify.js';
import { UPDATE_PROFILE, UPDATE_PROFILE_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';
import networkError from '../networkError';

/**
 * @description update profile action creator
 *
 * @param {Object} profile user profile object
 *
 * @returns {Object} profile returns updated user profile object
 */
const updateProfileActionCreator = profile => ({
  type: UPDATE_PROFILE,
  profile
});

/**
 * @description update profile action error
 *
 * @param {Object} error profile error object
 *
 * @returns {Object} error returns update profile error object
 */
const updateProfileActionCreatorError = error => ({
  type: UPDATE_PROFILE_FAIL,
  error
});
/**
 * @description update profile action
 *
 * @param {Object} profileUpdate user profile update
 *
 * @returns {Object} dispatch updated user profile object
 */
const updateProfileAction = profileUpdate => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/users/update', profileUpdate)
    .then((response) => {
      alertify.delay(1000);
      alertify.logPosition('bottom right');
      alertify.success('Profile updated!');
      dispatch(batchActions([
        dispatch(updateProfileActionCreator(response.data.user)),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      if (!error.response) {
        return networkError(error);
      }
      alertify.logPosition('bottom right');
      alertify.error('An error occurred. Check input again');
      dispatch(updateProfileActionCreatorError(error.response.data));
    });
};

export default updateProfileAction;
