import axios from 'axios';
import alertify from 'alertify.js';
import { ADD_FAVORITE_SUCCESS } from '../types';

/**
 * Create a favorite
 *
 * @export
 * @param {any} recipeId
 * @returns {object} favorite
 */

export const createFavoriteActionCreator = favorite => ({
  type: ADD_FAVORITE_SUCCESS,
  favorite
});

const createFavorite = recipeId =>
  dispatch => axios.post(`/api/v1/users/${recipeId}/recipes`)
    .then((response) => {
      alertify.delay(900);
      alertify.logPosition('bottom right');
      alertify.success(response.data.message);
      return dispatch(createFavoriteActionCreator(response.data.favorite));
    })
    .catch(() => {
      alertify.delay(2000);
      alertify.logPosition('bottom right');
      alertify.error('Please login to favorite recipe');
    });


export default createFavorite;
