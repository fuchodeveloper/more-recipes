import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { GET_ALL_FAVORITES } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * GET all favorite recipes action creator
 *
 * @param {onject} favorites
 * @export getAllFavoritesAction
 * @returns {object} favorites
 */
export const getAllFavoritesActionCreator = favorites => ({
  type: GET_ALL_FAVORITES,
  favorites
});
/**
 * GET all favorite recipes action for an authenticated user
 *
 * @export getAllFavorites
 * @param {integer} userId
 * @param {integer} page
 * @returns {obj} obj
 */
const getAllFavorites = (userId, page) => (dispatch) => {
  dispatch(setFetching());
  axios.get(`/api/v1/users/${userId}/recipes?page=${page}`)
    .then((response) => {
      dispatch(batchActions([
        getAllFavoritesActionCreator(response.data.favorites),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default getAllFavorites;
