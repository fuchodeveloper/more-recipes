import { mapKeys } from 'lodash';

import {
  RECEIVE_RECIPE,
  UPVOTE_RECIPE, ADD_REVIEW,
  DOWNVOTE_RECIPE,
  ADD_FAVORITE_SUCCESS,
  ADD_RECIPE,
  ADD_RECIPE_ERROR,
  UPDATE_RECIPE,
  UPDATE_RECIPE_ERROR,
  GET_ALL_RECIPES,
  GET_MY_RECIPES,
  DELETE_RECEIPE,
  GET_MY_RECIPES_PAGE_COUNT,
  GET_MOST_UPVOTES_COUNT,
  GET_MOST_UPVOTES,
  GET_ALL_FAVORITES,
  GET_ALL_FAVORITES_PAGE_COUNT,
  GET_SEARCHED_RECIPE,
  GET_SEARCHED_RECIPE_COUNT,
  GET_MY_RECIPES_FAIL,
  GET_PAGE_DETAILS,
  RECEIVE_RECIPE_ERROR,
  GET_MOST_UPVOTES_ERROR,
  ADD_FAVORITE_FAIL,
  DELETE_RECEIPE_FAIL,
  GET_ALL_FAVORITES_FAIL,
  UPDATE_PROFILE_FAIL,
  DOWNVOTE_RECIPE_ERROR,
  GET_ALL_RECIPES_ERROR,
  GET_SEARCHED_RECIPE_ERROR,
  ADD_REVIEW_FAIL
} from '../../action/types';

export const recipesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
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

    case GET_PAGE_DETAILS:
      return {
        ...state,
        pageCount: action.pageCount
      };

    case RECEIVE_RECIPE:
      return {
        ...state,
        recipe: action.recipe.recipe,
        favorited: action.recipe.favorited,
        reviews: mapKeys(action.recipe.recipe.Reviews, 'id'),
      };

    case RECEIVE_RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ADD_FAVORITE_FAIL:
      return {
        ...state,
        error: action.error
      };

    case GET_MOST_UPVOTES_ERROR:
      return {
        ...state,
        error: action.error
      };

    case DELETE_RECEIPE_FAIL:
      return {
        ...state,
        error: action.error
      };

    case DOWNVOTE_RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };

    case GET_ALL_FAVORITES_FAIL:
      return {
        ...state,
        error: action.error
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        error: action.error
      };

    case GET_ALL_RECIPES_ERROR:
      return {
        ...state,
        error: action.error
      };

    case GET_SEARCHED_RECIPE_ERROR:
      return {
        ...state,
        error: action.error
      };

    case ADD_REVIEW_FAIL:
      return {
        ...state,
        error: action.error
      };

    case GET_SEARCHED_RECIPE:
      return {
        ...state,
        recipes: action.recipes
      };

    case GET_SEARCHED_RECIPE_COUNT:
      return {
        ...state,
        pageCount: action.pageCount
      };

    case UPVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          upVotes: action.recipe.upVotes,
          downVotes: action.recipe.downVotes,
        }
      };

    case DOWNVOTE_RECIPE:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          upVotes: action.recipe.upVotes,
          downVotes: action.recipe.downVotes,
        }
      };

    case ADD_RECIPE:
      return {
        ...state,
        recipe: action.recipe
      };

    case ADD_RECIPE_ERROR:
      return {
        ...state,
        serverError: action.error
      };

    case UPDATE_RECIPE:
      return {
        ...state,
        recipe: action.recipe
      };

    case UPDATE_RECIPE_ERROR:
      return {
        ...state,
        serverError: action.error
      };

    case GET_ALL_FAVORITES:
      return {
        ...state,
        recipes: action.recipes
      };

    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        favorited: action.favorite.favorited,
        favorite: action.favorite
      };

    case GET_ALL_FAVORITES_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.pageCount
      };

    case GET_MY_RECIPES_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.pageCount
      };

    case GET_MOST_UPVOTES:
      return {
        ...state,
        recipes: action.recipes
      };

    case GET_MOST_UPVOTES_COUNT:
      return {
        ...state,
        pageCount: action.pageCount
      };

    case ADD_REVIEW:
      return {
        ...state,
        reviews: mapKeys(action.review, 'id')
      };

    case DELETE_RECEIPE: {
      const recipes = state.recipes
        .filter(recipe => recipe.id !== Number(action.recipes));
      return {
        ...state,
        recipes
      };
    }
    default:
      return state;
  }
};
