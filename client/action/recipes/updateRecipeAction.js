import axios from 'axios';
import alertify from 'alertify.js';
import { batchActions } from 'redux-batched-actions';
import { UPDATE_RECIPE, UPDATE_RECIPE_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';
import networkError from '../networkError';

/**
 * @description update a recipe action creator
 *
 * @param {Object} recipe recipe object parameter
 *
 * @export updateRecipeActionCreator
 *
 * @returns {Object} recipe returns updated recipe
 */
export const updateRecipeActionCreator = recipe => ({
  type: UPDATE_RECIPE,
  recipe
});

/**
 * @description update a recipe action error
 *
 * @export updateRecipeError
 *
 * @param {Object} error error object parameter
 *
 * @returns {Object} error returns update recipe error
 */
export const updateRecipeError = error => ({
  type: UPDATE_RECIPE_ERROR,
  error
});

/**
 * @description Update a recipe action
 *
 * @export updateRecipeAction
 *
 * @param {Number} recipeId update recipe id parameter
 *
 * @param {Object} recipe update recipe object parameter
 *
 * @returns {Object} dispatch update recipe action
 */
const updateRecipeAction = (recipeId, recipe) =>
  (dispatch) => {
    dispatch(setFetching());
    return axios.put(`/api/v1/recipes/${recipeId}`, recipe)
      .then((response) => {
        alertify.delay(900);
        alertify.logPosition('bottom right');
        alertify.success(response.data.message);
        dispatch(batchActions([
          dispatch(updateRecipeActionCreator(response.data.recipe)),
          unsetFetching()
        ]));
      })
      .catch((error) => {
        if (!error.response) {
          return networkError(error);
        }
        dispatch([
          dispatch(updateRecipeError(error.response.data.error)),
          unsetFetching()
        ]);
      });
  };

export default updateRecipeAction;
