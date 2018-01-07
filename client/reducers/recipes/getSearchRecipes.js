import { GET_SEARCHED_RECIPE } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SEARCHED_RECIPE:
      return Object.assign(
        {},
        action.recipes
      );

    default:
      return state;
  }
};
