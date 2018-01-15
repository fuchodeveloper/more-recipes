import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, SET_CURRENT_USER_FAIL } from '../../action/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };

    case SET_CURRENT_USER_FAIL:
      return {
        isAuthenticated: false,
        user: {},
        error: action.error
      };

    default:
      return state;
  }
};
