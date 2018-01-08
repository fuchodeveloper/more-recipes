import { ADD_FAVORITE_SUCCESS } from '../../action/favorites/createFavorite';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE_SUCCESS:
      // return Object.assign(
      //   {},
      //   state,
      //   {recipe: action.recipe}
      // );
      return {
        ...state,
        recipe: action.recipe
      };
    default:
      return state;
  }
};
