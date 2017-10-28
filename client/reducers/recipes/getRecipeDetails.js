import { GET_RECIPE_DETAILS } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPE_DETAILS:
      return {
        ...state,
        action
      };
    default:
      return state;
  }
};
