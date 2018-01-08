import { mapKeys } from 'lodash';

import { RECEIVE_RECIPE, GET_UPVOTE, ADD_REVIEW, GET_DOWNVOTE, ADD_FAVORITE_SUCCESS } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_RECIPE:
      return {
        ...action.recipe,
        Reviews: mapKeys(action.recipe.Reviews, 'id')
      };

    case GET_UPVOTE:
      return Object.assign(
        {},
        state,
        action.recipe
      );

    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favoriteCount: action.favorite
      };

    case GET_DOWNVOTE:
      return Object.assign(
        {},
        state,
        action.recipe
      );

    case ADD_REVIEW:
      return {
        ...state,
        ...state.recipe,
        Reviews: mapKeys(action.recipe.Reviews, 'id')
      };
    default:
      return state;
  }
};
