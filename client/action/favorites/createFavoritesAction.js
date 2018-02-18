import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_FAVORITE_SUCCESS, ADD_FAVORITE_FAIL } from '../types';
import networkError from '../networkError';
/**
 * @description Create a favorite
 *
 * @export createFavoriteActionCreator action creator for create recipe favorite
 *
 * @param {Object} favorite favorite supplied
 *
 * @returns {Object} favorite recipe favorite object
 */

export const createFavoriteActionCreator = favorite => ({
  type: ADD_FAVORITE_SUCCESS,
  favorite
});
/**
 * @description create favorite action creator error
 *
 * @param {Object} error favorite error
 *
 * @returns {Object} error favorite recipe error
 */
const createFavoriteActionError = error => ({
  type: ADD_FAVORITE_FAIL,
  error
});

/**
 * @description create recipe favorite action
 *
 * @param {Number} recipeId id of recipe to be favorited
 *
 * @returns {Object} dispatch recipe favorite object
 */
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
