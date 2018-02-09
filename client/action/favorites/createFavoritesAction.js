import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_FAVORITE_SUCCESS, ADD_FAVORITE_FAIL } from '../types';
import networkError from '../networkError';
/**
 * Create a favorite
 *
 * @export createFavoriteActionCreator
 *
 * @param {Object} recipeId
 *
 * @returns {Object} favorite
 */

export const createFavoriteActionCreator = favorite => ({
  type: ADD_FAVORITE_SUCCESS,
  favorite
});

export const createFavoriteActionError = error => ({
  type: ADD_FAVORITE_FAIL,
  error
});

const createFavoriteAction = recipeId =>
  dispatch => axios.post(`/api/v1/users/${recipeId}/recipes`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.favorite.message);
      return dispatch(createFavoriteActionCreator(response.data.favorite));
    })
    .catch((error) => {
      if (!error.response) {
        return networkError(error);
      }
      alertify.delay(2000);
      alertify.logPosition('bottom right');
      alertify.error('Please login to favorite recipe');
      dispatch(createFavoriteActionError(error.response.data.error));
    });


export default createFavoriteAction;
