import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { GET_PROFILE_SUCCESS, GET_PROFILE_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const profileActionCreator = profile => ({
  type: GET_PROFILE_SUCCESS,
  profile
});

export const profileActionCreatorError = error => ({
  type: GET_PROFILE_FAIL,
  error
});

const profileAction = id => (dispatch) => {
  // debugger;
  dispatch(setFetching());
  axios.get(`/api/v1/profile/${id}`)
    .then((response) => {
      dispatch(batchActions([
        profileActionCreator(response.data.user),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      dispatch(profileActionCreatorError(error));
    });
};

export default profileAction;
