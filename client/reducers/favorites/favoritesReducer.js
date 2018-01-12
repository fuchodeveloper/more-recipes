import { ADD_FAVORITE_SUCCESS, GET_ALL_FAVORITES, GET_PAGE_DETAILS } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        recipe: action.recipe
      };
    case GET_ALL_FAVORITES:
      return {
        ...state,
        favorites: action.favorites
      };
    case GET_PAGE_DETAILS:
      return {
        ...state,
        pageCount: action.pageCount
      };
    default:
      return state;
  }
};
