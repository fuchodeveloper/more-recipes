import { GET_ALL_RECIPES } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return Object.assign(
        {},
        state,
        action.recipes
      );
    default:
      return state;
  }
};
