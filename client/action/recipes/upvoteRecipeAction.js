import axios from 'axios';
import alertify from 'alertify.js';
import { UPVOTE_RECIPE } from '../types';

/**
 * upvote recipe action creator
 *
 * @export upvoteRecipeAction
 *
 * @param {Object} recipe
 *
 * @returns {object} recipe
 */
export const upvoteRecipeActionCreator = recipe => ({
  type: UPVOTE_RECIPE,
  recipe
});

/**
 * @description Authenticated user can upvote a recipe
 *
 * @export upvoteRecipe
 *
 * @param {Number} id
 *
 * @returns {Object} dispatch recipe upvote
 */
const upvoteRecipeAction = id => dispatch =>
  axios.post(`/api/v1/recipes/${id}/upvote`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.recipe.message);
      return dispatch(upvoteRecipeActionCreator(response.data.recipe));
    })
    .catch(() => {
      alertify.delay(1000);
      alertify.logPosition('bottom right');
      alertify.error('Please login to upvote recipe');
    });

export default upvoteRecipeAction;
