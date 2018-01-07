import { GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL } from '../../action/types';

export default (state = [], action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
    // debugger;
      return Object.assign(
        {},
        state,
        action.profile
      );

    case UPDATE_PROFILE_SUCCESS:
      // debugger;
      return Object.assign(
        {},
        state,
        action.profile
      );

    case UPDATE_PROFILE_FAIL:
      // debugger;
      return Object.assign(
        {},
        state,
        action.error
      );

    default:
      return state;
  }
};
