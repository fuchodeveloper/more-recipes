import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import alertify from 'alertify.js';
import { UPDATE_PROFILE, UPDATE_PROFILE_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const updateProfileActionCreator = profile => ({
  type: UPDATE_PROFILE,
  profile
});

export const updateProfileActionCreatorError = error => ({
  type: UPDATE_PROFILE_FAIL,
  error
});

const updateProfileAction = profileUpdate => (dispatch) => {
  // debugger;
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
      console.log(error.message);
      alertify.logPosition('bottom right');
      alertify.error('An error occurred. Check input again');
      dispatch(updateProfileActionCreatorError(error.response.data));
    });
};

export default updateProfileAction;
