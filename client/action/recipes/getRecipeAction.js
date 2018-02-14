import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { RECEIVE_RECIPE, RECEIVE_RECIPE_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * @description get a recipe action creator
 *
 * @export receiveRecipe exports receiveRecipe function
 *
 * @param {Object} recipe recipe object parameter
 * @param {Object} favorited favorited object parameter
 *
 * @returns {Object} returns recipe object
 * @returns {Object} returns favorited object
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
 * @returns {Object} error returns recipe error
 */
const receiveRecipeError = error => ({
  type: RECEIVE_RECIPE_ERROR,
  error
});

/**
 * @description get a recipe action
 *
 * @param {Number} id recipe id
 *
 * @export getRecipeAction exports getRecipeAction
 *
 * @returns {Object} - dispatch the get recipe action
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
      window.location.replace('/notfound');
      dispatch(receiveRecipeError(error.response.data.error));
    });
};
export default getRecipeAction;
