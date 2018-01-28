import axios from 'axios';
import alertify from 'alertify.js';
import { DELETE_RECEIPE, DELETE_RECEIPE_FAIL } from '../types';

export const deleteRecipeActionError = error => ({
  type: DELETE_RECEIPE_FAIL,
  error
});

export const deleteRecipeActionCreator = recipes => ({
  type: DELETE_RECEIPE,
  recipes
});

const deleteRecipeAction = recipeId => dispatch =>
  axios.delete(`/api/v1/recipes/${recipeId}`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      dispatch(deleteRecipeActionCreator(response.data.recipes));
    })
    .catch((error) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(error.data.message);
      dispatch(deleteRecipeActionError(error.data.message));
    });

export default deleteRecipeAction;
