import { batchActions } from 'redux-batched-actions';
import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_RECIPE, ADD_RECIPE_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * @description create a recipe
 *
 * @export addRecipeActionCreator
 *
 * @param {Object} recipe
 *
 * @returns {Object} recipe
 */
const addRecipeActionCreator = recipe => ({
  type: ADD_RECIPE,
  recipe
});

/**
 * @description create a recipe error
 *
 * @export addRecipeActionError
 *
 * @param {Object} error
 *
 * @returns {Object} error
 */
const addRecipeActionError = error => ({
  type: ADD_RECIPE_ERROR,
  error
});

const addRecipeAction = recipe => (dispatch) => {
  dispatch(setFetching());
  return axios.post('/api/v1/recipes', recipe)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      dispatch(batchActions([
        dispatch(addRecipeActionCreator(response.data.recipe)),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      dispatch([
        dispatch(addRecipeActionError(error.response.data.error)),
        unsetFetching()
      ]);
    });
};

export default addRecipeAction;
