import axios from 'axios';

/**
 * Create a favorite
 *
 * @export
 * @param {any} recipeId
 * @returns {obj} obj
 */
export default function createFavorite(recipeId) {
  return axios.post(`/api/v1/users/${recipeId}/recipes`);
}

