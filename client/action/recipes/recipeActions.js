import axios from 'axios';

/**
 * create a recipe
 *
 * @export createRecipe
 * @param {any} recipe
 * @returns {onj} onj
 */
export function createRecipe(recipe) {
  return dispatch => axios.post('/api/v1/recipes', recipe);
}

