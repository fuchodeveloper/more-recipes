import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { RECEIVE_RECIPE, RECEIVE_VOTE } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * Set type for GET all recipes
 *
 * @export {func} func
 * @param {any} recipe
 * @returns {obj} obj
 */
export const receiveRecipe = recipe => ({
  type: RECEIVE_RECIPE,
  recipe
});

export const receiveVote = (upVotes, downVotes) => ({
  type: RECEIVE_VOTE,
  upVotes,
  downVotes
});


/**
 * GET a recipe
 * @param {id} id
 * @export {function} function
 * @returns {object} object
 */
const getRecipeDetails = id => (dispatch) => {
  dispatch(setFetching());
  axios.get(`/api/v1/recipes/${id}`)
    .then((res) => {
      dispatch(batchActions([
        receiveRecipe(res.data.recipe),
        unsetFetching()
      ]));
    })
    .catch((err) => {
      console.log(err.response.data.error);
      dispatch(unsetFetching());
    });
};


export default getRecipeDetails;
