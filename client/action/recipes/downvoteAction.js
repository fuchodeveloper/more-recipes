import axios from 'axios';
import alertify from 'alertify.js';
import { GET_DOWNVOTE } from '../types';

/**
 * Recipe doenvote action creator
 * @param {recipe} recipe
 * @returns {recipe} recipe
 */
export const downvoteRecipeActionCreator = recipe => ({
  type: GET_DOWNVOTE,
  recipe
});

/**
 * Authenticated user can downvote a recipe
 *
 * @export downvoteRecipe
 *
 * @param {Number} id
 *
 * @returns {object} object
 */
const downvoteRecipe = id =>
  dispatch => axios.post(`/api/v1/recipes/${id}/downvote`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.recipe.message);
      return dispatch(downvoteRecipeActionCreator(response.data.recipe));
    })
    .catch(() => {
      alertify.delay(1000);
      alertify.logPosition('bottom right');
      alertify.error('Please login to downvote recipe');
    });


export default downvoteRecipe;
