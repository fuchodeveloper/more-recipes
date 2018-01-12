import {
  GET_ALL_RECIPES,
  GET_MOST_UPVOTES,
  GET_MY_RECIPES,
  GET_MY_RECIPES_FAIL } from '../../action/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return Object.assign(
        {},
        state,
        action.recipes
      );

    case GET_MOST_UPVOTES:
      return {
        ...state,
        recipes: action.recipes
      };


    case GET_MY_RECIPES:
      return {
        ...state,
        recipes: action.recipes
      };

    case GET_MY_RECIPES_FAIL:
      return {
        ...state,
        recipeErrors: action.error
      };

    default:
      return state;
  }
};
