import {
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  GET_PROFILE_FAIL
} from '../../action/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.profile
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.error
      };

    case GET_PROFILE_FAIL:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};
