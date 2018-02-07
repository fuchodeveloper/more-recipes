import axios from 'axios';
import alertify from 'alertify.js';
import { batchActions } from 'redux-batched-actions';
import { UPDATE_RECIPE, UPDATE_RECIPE_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * @description update a recipe action creator
 *
 * @param {Object} recipe
 *
 * @export updateRecipeActionCreator
 *
 * @returns {Object} recipe
 */
export const updateRecipeActionCreator = recipe => ({
  type: UPDATE_RECIPE,
  recipe
});

/**
 * @description update a recipe action error
 *
 * @param {Object} error
 *
 * @export updateRecipeError
 *
 * @returns {Object} error
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
 * @param {Integer} recipeId
 *
 * @param {Object} recipe
 *
 * @returns {Object} dispatch
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
        dispatch([
          dispatch(updateRecipeError(error.response.data.error)),
          unsetFetching()
        ]);
      });
  };

export default updateRecipeAction;
