import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { RECEIVE_RECIPE, RECEIVE_RECIPE_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * Set type for GET all recipes
 *
 * @export {function} export function receiveRecipe
 *
 * @param {Object} recipe recipe object parameter
 * @param {Object} favorited favorited object parameter
 *
 * @returns {Object} returns requested recipe
 * @returns {Object} returned favorited
 */
export const receiveRecipe = (recipe, favorited) => ({
  type: RECEIVE_RECIPE,
  recipe,
  favorited
});

/**
 * @description recieve recipe error action creator
 *
 * @param {Object} error error object parameter
 *
 * @returns {Object} error recipe error
 */
const receiveRecipeError = error => ({
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
const getRecipeAction = id => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes/${id}`)
    .then((response) => {
      const recipeObject = {
        recipe: response.data.recipe,
        favorited: response.data.favorited
      };
      dispatch(batchActions([
        dispatch(receiveRecipe(recipeObject)),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      dispatch(receiveRecipeError(error.response.data.error));
    });
};
export default getRecipeAction;
