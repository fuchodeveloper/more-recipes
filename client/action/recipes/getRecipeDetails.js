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

      // dispatch(receiveRecipe(res.data.recipe));
    })
    .catch(() => {
      // console.log(err.response.data.error);
      dispatch(unsetFetching());
    });
};


export default getRecipeDetails;
