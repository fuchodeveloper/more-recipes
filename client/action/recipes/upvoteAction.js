import axios from 'axios';
import toastr from 'toastr';
import { ADD_UPVOTE } from '../types';

/**
 * upvote recipe action
 *
 * @export upvoteRecipeAction
 * @param {any} upvoteSuccess
 * @returns {object} object
 */
export const upvoteRecipeAction = upvoteSuccess => ({

  type: ADD_UPVOTE,
  upvoteSuccess

});

/**
 * Authenticated user can upvote a recipe
 *
 * @export upvoteRecipe
 * @param {any} param
 * @returns {null} null
 */
const upvoteRecipe = param =>
  // return dispatch => axios.post(`/api/v1/recipes/${param}/upvote`);
  dispatch => axios.post(`/api/v1/recipes/${param}/upvote`)
    .then((recipeUpvoteSuccess) => {
      const upvoteSuccess = recipeUpvoteSuccess;
      return dispatch(upvoteRecipeAction(upvoteSuccess));
    })
    .catch((recipeUpvoteError) => {
      toastr.error(recipeUpvoteError.response.data.error);
    });
export default upvoteRecipe;
