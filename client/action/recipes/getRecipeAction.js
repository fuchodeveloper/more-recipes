import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { RECEIVE_RECIPE, RECEIVE_RECIPE_ERROR } from '../types';

/**
 * Set type for GET all recipes
 *
 * @export {function} function
 *
 * @param {Object} recipe
 * @param {Object} favorited
 *
 * @returns {Object} recipe
 * @returns {Object} favorited
 */
export const receiveRecipe = (recipe, favorited) => ({
  type: RECEIVE_RECIPE,
  recipe,
  favorited
});

export const receiveRecipeError = error => ({
  type: RECEIVE_RECIPE_ERROR,
  error
});

/**
 * GET a recipe
 * @param {Number} id
 *
 * @export {function} getRecipeAction
 *
 * @returns {Object} dispatch - dispatch the get recipe action
 */
const getRecipeAction = id => dispatch =>
  axios.get(`/api/v1/recipes/${id}`)
    .then((response) => {
      const recipeObject = {
        recipe: response.data.recipe,
        favorited: response.data.favorited
      };
      dispatch(batchActions([
        receiveRecipe(recipeObject),
      ]));
    })
    .catch((error) => {
      dispatch(receiveRecipeError(error));
    });
export default getRecipeAction;
