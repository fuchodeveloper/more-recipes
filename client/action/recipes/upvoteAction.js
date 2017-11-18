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
  payload: upvoteSuccess

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
      // console.log(recipeUpvoteSuccess);
      const upvoteSuccess = recipeUpvoteSuccess;
      return dispatch(upvoteRecipeAction(upvoteSuccess));
      // alert(recipeUpvoteSuccess.response.data.message);
      // this.setState({ upVote: recipeUpvoteSuccess.response.data.message });
    })
    .catch((recipeUpvoteError) => {
      // alert(recipeUpvoteError.response.data.error);
      // this.setState({ errors: recipeUpvoteError.response.data.error });
      toastr.error(recipeUpvoteError.response.data.error);
    });
export default upvoteRecipe;
