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
 * GET all favorite recipes action creator
 *
 * @param {Object} recipes
 *
 * @export getAllFavoritesActionCreator
 *
 * @returns {Object} recipes
 */
export const getAllFavoritesActionCreator = recipes => ({
  type: GET_ALL_FAVORITES,
  recipes
});

export const getAllFavoritesActionFail = error => ({
  type: GET_ALL_FAVORITES_FAIL,
  error
});

export const favoritesPageCount = pageCount => ({
  type: GET_ALL_FAVORITES_PAGE_COUNT,
  pageCount
});

/**
 * GET all favorite recipes action for an authenticated user
 *
 * @export getAllFavoritesAction
 *
 * @param {Number} userId Id of authenticated user
 * @param {Number} page page number
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
