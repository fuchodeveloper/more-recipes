import axios from 'axios';
import { GET_SEARCHED_RECIPE } from '../types';
/**
 * Recipe search action
 *
 * @export recipeSearchAction
 * @returns {obj} obj
 */
export function recipeSearchAction() {
  return {
    type: GET_SEARCHED_RECIPE
  };
}

export default function recipeSearch(searchParam) {
  return dispatch => axios.post('/api/v1/recipes/search', searchParam);
}
