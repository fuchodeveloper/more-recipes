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
 * @export func
 * @param {integer} param
 * @returns {object} object
 */
const downvoteRecipe = param =>
  dispatch => axios.post(`/api/v1/recipes/${param}/downvote`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      return dispatch(downvoteRecipeActionCreator(response.data.recipe));
    })
    .catch((error) => {
      alertify.logPosition('bottom right');
      alertify.error(error.message);
    });


export default downvoteRecipe;
