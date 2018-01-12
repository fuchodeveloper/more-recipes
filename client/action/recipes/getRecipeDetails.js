import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { RECEIVE_RECIPE } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * Set type for GET all recipes
 *
 * @export {function} function
 * @param {any} recipe
 * @returns {object} object
 */
export const receiveRecipe = recipe => ({
  type: RECEIVE_RECIPE,
  recipe
});

/**
 * GET a recipe
 * @param {integer} id
 * @export {function} getRecipeDetails
 * @returns {object} recipe
 */
const getRecipeDetails = id => (dispatch) => {
  dispatch(setFetching());
  axios.get(`/api/v1/recipes/${id}`)
    .then((response) => {
      dispatch(batchActions([
        receiveRecipe(response.data.recipe),
        unsetFetching()
      ]));
    })
    .catch(() => {
      // console.log(err.response.data.error);
      dispatch(unsetFetching());
    });
};


export default getRecipeDetails;
