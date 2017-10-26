import axios from 'axios';
import { GET_RECIPES } from '../types';

/**
 * Set type for GET all recipes
 *
 * @export {func} func
 * @param {any} recipes
 * @returns {obj} obj
 */
export function getPosts(recipes) {
  return {
    type: GET_RECIPES,
    recipes
  };
}

/**
 * GET all recipes
 *
 * @export {func} func
 * @returns {obj} obj
 */
export function getAllRecipes() {
  return dispatch => axios.get('/api/v1/recipes');
}

