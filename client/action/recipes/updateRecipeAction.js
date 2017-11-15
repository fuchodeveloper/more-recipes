import axios from 'axios';
import { UPDATE_RECIPE } from '../types';
/**
 * update a recipe action
 *
 * @export updateRecipeAction
 * @returns {obj} obj
 */
export function updateRecipeAction() {
  return {
    type: UPDATE_RECIPE
  };
}
/**
 * Update a recipe post request
 *
 * @export updateRecipe
 * @param {any} recipe
 * @param {any} param
 * @returns {obj} obj
 */
export default function updateRecipe(recipe, param) {
  return dispatch => axios.put(`/api/v1/recipes/${param}`, recipe);
}
