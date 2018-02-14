import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import {
  GET_ALL_FAVORITES,
  GET_ALL_FAVORITES_PAGE_COUNT,
  GET_ALL_FAVORITES_FAIL
} from '../types';
import { setFetching, unsetFetching } from '../fetching';
import networkError from '../networkError';

/**
 * @description get all favorite recipes action creator
 *
 * @param {Object} recipes recipes parameter
 *
 * @export getAllFavoritesActionCreator get all favorites action creator
 *
 * @returns {Object} recipes returns all favorited recipes
 */
export const getAllFavoritesActionCreator = recipes => ({
  type: GET_ALL_FAVORITES,
  recipes
});

/**
 * @description get all favorites fail action creator
 *
 * @param {Object} error favorites fail error
 *
 * @returns {Object} error returns favorites fail error object
 */
const getAllFavoritesActionFail = error => ({
  type: GET_ALL_FAVORITES_FAIL,
  error
});

/**
 * @description get favorited recipes page count
 *
 * @param {Number} pageCount favorites page count parameter
 *
 * @returns {Number} pageCount returns favorited recipes page count
 */
const favoritesPageCount = pageCount => ({
  type: GET_ALL_FAVORITES_PAGE_COUNT,
  pageCount
});

/**
 * @description get all favorite recipes action for an authenticated user
 *
 * @export getAllFavoritesAction exports getAllFavoritesAction
 *
 * @param {Number} userId Id of authenticated user
 * @param {Number} page favorited recipes page number
 *
 * @returns {Object} dispatch favorites and page count dispatch
 */
const getAllFavoritesAction = (userId, page) => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/users/${userId}/recipes?page=${page}`)
    .then((response) => {
      dispatch(batchActions([
        dispatch(getAllFavoritesActionCreator(response.data.recipes)),
        favoritesPageCount(response.data.pageCount),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      if (!error.response) {
        return networkError(error);
      }
      dispatch(getAllFavoritesActionFail(error.response.data.error));
    });
};

export default getAllFavoritesAction;
