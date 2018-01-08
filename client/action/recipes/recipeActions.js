import axios from 'axios';

/**
 * create a recipe
 *
 * @export createRecipe
 * @param {any} recipe
 * @returns {object} object
 */
export function createRecipe(recipe) {
  return dispatch => axios.post('/api/v1/recipes', recipe);
}

