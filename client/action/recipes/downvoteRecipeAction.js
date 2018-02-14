import axios from 'axios';
import alertify from 'alertify.js';
import { DOWNVOTE_RECIPE, DOWNVOTE_RECIPE_ERROR } from '../types';
import networkError from '../networkError';

/**
 * @description Recipe downvote action creator
 *
 * @param {Object} recipe recipe object parameter
 *
 * @returns {Object} recipe returns downvote object
 */
export const downvoteRecipeActionCreator = recipe => ({
  type: DOWNVOTE_RECIPE,
  recipe
});

/**
 * @description Recipe downvote error
 *
 * @param {Object} error downvote recipe error parameter
 *
 * @returns {Object} error returns delete recipe error
 *
 */
const downvoteRecipeActionError = error => ({
  type: DOWNVOTE_RECIPE_ERROR,
  error
});

/**
 * @description Authenticated user can downvote a recipe
 *
 * @export downvoteRecipeAction export downvoteRecipeAction
 *
 * @param {Number} id downvote recipe id
 *
 * @returns {object} returns downvote recipe object
 */
const downvoteRecipeAction = id =>
  dispatch => axios.post(`/api/v1/recipes/${id}/downvote`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.recipe.message);
      return dispatch(downvoteRecipeActionCreator(response.data.recipe));
    })
    .catch((error) => {
      if (!error.response) {
        return networkError(error);
      }
      alertify.delay(1000);
      alertify.logPosition('bottom right');
      alertify.error('Please login to downvote recipe');
      dispatch(downvoteRecipeActionError(error.response.data));
    });


export default downvoteRecipeAction;
