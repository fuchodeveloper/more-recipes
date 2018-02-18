import { batchActions } from 'redux-batched-actions';
import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_RECIPE, ADD_RECIPE_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';
import networkError from '../networkError';

/**
 * @description create a new recipe
 *
 * @export addRecipeActionCreator export add recipe action creator
 *
 * @param {Object} recipe recipe object as parameter
 *
 * @returns {Object} recipe returns created recipe object
 */
const addRecipeActionCreator = recipe => ({
  type: ADD_RECIPE,
  recipe
});

/**
 * @description handles add recipe error
 *
 * @export addRecipeActionError exports add recipe error
 *
 * @param {Object} error recipe error object
 *
 * @returns {Object} error returns add recipe error
 */
const addRecipeActionError = error => ({
  type: ADD_RECIPE_ERROR,
  error
});

/**
 * @description add new recipe action
 *
 * @param {Object} recipe add recipe object parameter
 *
 * @returns {Object} recipe returns new recipe object
 */
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
      if (!error.response) {
        return networkError(error);
      }
      dispatch([
        dispatch(addRecipeActionError(error.response.data.error)),
        unsetFetching()
      ]);
    });
};

export default addRecipeAction;
