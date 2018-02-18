import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import {
  GET_MOST_UPVOTES,
  GET_MOST_UPVOTES_ERROR,
  GET_MOST_UPVOTES_COUNT
} from '../types';
import { setFetching, unsetFetching } from '../fetching';
import networkError from '../networkError';

/**
 * @description Most recipe upvotes action creator
 *
 * @param {Object} recipes recipes object parameter
 *
 * @returns {Object} recipes returns most upvotes recipes
 */
export const mostUpvotesActionCreator = recipes => ({
  type: GET_MOST_UPVOTES,
  recipes
});

/**
 * @description most upvotes recipes error
 *
 * @param {Object} error most upvotes recipes error parameter
 *
 * @returns {Object} error returns most upvotes recipes error
 */
const mostUpvotesError = error => ({
  type: GET_MOST_UPVOTES_ERROR,
  error
});

/**
 * @description most upvotes recipes page count
 *
 * @param {Number} pageCount most upvotes recipes page count parameter
 *
 * @returns {Object} most upvotes recipes page count
 */
const mostUpvotesPageCount = pageCount => ({
  type: GET_MOST_UPVOTES_COUNT,
  pageCount
});

/**
 * @description GET most upvoted recipes
 *
 * @export mostUpvotes
 *
 * @param {Number} page most upvotes recipes page parameter
 *
 * @returns {object} recipes returns most upvotes recipes
 */
const mostUpvotesAction = page => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes?page=${page}&sort=upvotes&order=desc`)
    .then((response) => {
      dispatch(batchActions([
        dispatch(mostUpvotesActionCreator(response.data.recipes)),
        mostUpvotesPageCount(response.data.pageCount),
        unsetFetching(),
      ]));
    })
    .catch((serverError) => {
      if (!serverError.response) {
        return networkError(serverError);
      }
      dispatch(mostUpvotesError(serverError.response.data.error));
    });
};

export default mostUpvotesAction;
