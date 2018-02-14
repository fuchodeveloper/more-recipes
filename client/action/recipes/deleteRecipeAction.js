import axios from 'axios';
import alertify from 'alertify.js';
import { DELETE_RECEIPE, DELETE_RECEIPE_FAIL } from '../types';
import networkError from '../networkError';

/**
 * @description delete recipe action creator
 *
 * @param {Object} recipes delete recipes object parameter
 *
 * @returns {Object} recipes returns delete recipes object
 */
const deleteRecipeActionCreator = recipes => ({
  type: DELETE_RECEIPE,
  recipes
});

/**
 * @description handles delete recipe
 *
 * @param {Object} error delete recipe error object
 *
 * @returns {Object} error returns delete recipe error
 */
const deleteRecipeActionError = error => ({
  type: DELETE_RECEIPE_FAIL,
  error
});

/**
 * @description delete recipe action
 *
 * @param {Number} recipeId recipe id to delete
 *
 * @returns {Object} dispatch delete recipe action
 */
const deleteRecipeAction = recipeId => dispatch =>
  axios.delete(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      dispatch(deleteRecipeActionCreator(response.data.recipes));
    })
    .catch((error) => {
      if (!error.response) {
        return networkError(error);
      }
      dispatch(deleteRecipeActionError(error.response.data));
    });

export default deleteRecipeAction;
