import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import {
  GET_MOST_UPVOTES,
  GET_MOST_UPVOTES_ERROR,
  GET_MOST_UPVOTES_COUNT
} from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * @description Most recipe upvotes action creator
 *
 * @param {object} recipes
 *
 * @returns {object} recipes
 */
export const mostUpvotesActionCreator = recipes => ({
  type: GET_MOST_UPVOTES,
  recipes
});

export const mostUpvotesError = error => ({
  type: GET_MOST_UPVOTES_ERROR,
  error
});

export const mostUpvotesPageCount = pageCount => ({
  type: GET_MOST_UPVOTES_COUNT,
  pageCount
});

/**
 * @description GET most upvoted recipes
 *
 * @export mostUpvotes
 *
 * @param {Number} page
 *
 * @returns {object} object
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
      dispatch(mostUpvotesError(serverError.response.data.error));
    });
};

export default mostUpvotesAction;
