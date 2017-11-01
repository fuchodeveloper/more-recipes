import axios from 'axios';
import { ADD_DOWNVOTE } from '../types';

/**
 * downvoteRecipeAction
 *
 * @export func
 * @returns {obj} obj
 */
export function downvoteRecipeAction() {
  return {
    type: ADD_DOWNVOTE
  };
}

/**
 * Authenticated user can downvote a recipe
 *
 * @export func
 * @param {any} param
 * @returns {obj} obj
 */
export default function downvoteRecipe(param) {
  return dispatch => axios.post(`/api/v1/recipes/${param}/downvote`);
}
