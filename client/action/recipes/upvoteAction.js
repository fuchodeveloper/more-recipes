import axios from 'axios';
import alertify from 'alertify.js';
import { GET_UPVOTE } from '../types';

/**
 * upvote recipe action creator
 *
 * @export upvoteRecipeAction
 * @param {any} recipe
 * @returns {object} object
 */
export const upvoteRecipeAction = recipe => ({
  type: GET_UPVOTE,
  recipe
});

/**
 * Authenticated user can upvote a recipe
 *
 * @export upvoteRecipe
 * @param {any} param
 * @returns {null} null
 */
const upvoteRecipe = param =>
  dispatch => axios.post(`/api/v1/recipes/${param}/upvote`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      return dispatch(upvoteRecipeAction(response.data.recipe));
    })
    .catch(() => {
      alertify.delay(1000);
      alertify.logPosition('bottom right');
      alertify.error('Please login to upvote recipe');
    });

export default upvoteRecipe;
