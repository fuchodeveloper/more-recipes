import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import alertify from 'alertify.js';
import { UPDATE_PROFILE, UPDATE_PROFILE_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';
/**
 * @description update profile action creator
 *
 * @param {Object} profile
 *
 * @returns {Object} profile
 */
const updateProfileActionCreator = profile => ({
  type: UPDATE_PROFILE,
  profile
});
/**
 * @description update profile action error
 *
 * @param {Object} error
 *
 * @returns {Object} error
 */
const updateProfileActionCreatorError = error => ({
  type: UPDATE_PROFILE_FAIL,
  error
});
/**
 * @description update profile action
 *
 * @param {Object} profileUpdate
 *
 * @returns {Object} dispatch
 */
const updateProfileAction = profileUpdate => (dispatch) => {
  dispatch(setFetching());
  axios.post('/api/v1/users/update', profileUpdate)
    .then((response) => {
      alertify.logPosition('bottom right');
      alertify.success('Profile updated!');
      dispatch(batchActions([
        updateProfileActionCreator(response.data.user),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      alertify.logPosition('bottom right');
      alertify.error('An error occurred. Check input again');
      dispatch(updateProfileActionCreatorError(error.response.data));
    });
};

export default updateProfileAction;
