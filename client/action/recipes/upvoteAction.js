import axios from 'axios';
import { ADD_UPVOTE } from '../types';

/**
 * upvoteRecipeAction
 *
 * @export func
 * @returns {obj} obj
 */
export function upvoteRecipeAction() {
  return {
    type: ADD_UPVOTE
  };
}

/**
 * Authenticated user can upvote a recipe
 *
 * @export upvoteRecipe
 * @param {any} param
 * @returns {null} null
 */
export default function upvoteRecipe(param) {
  return dispatch => axios.post(`/api/v1/recipes/${param}/upvote`);
}
