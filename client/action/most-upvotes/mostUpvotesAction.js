import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { GET_MOST_UPVOTES, GET_MOST_UPVOTES_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * Most recipe upvotes action creator
 *
 * @param {object} recipes
 * @returns {object} recipes
 */
const mostUpvotesActionCreator = recipes => ({
  type: GET_MOST_UPVOTES,
  recipes
});

const mostUpvotesError = error => ({
  type: GET_MOST_UPVOTES_ERROR,
  error
});

/**
 * GET most upvoted recipes
 *
 * @export mostUpvotes
 * @returns {object} obj
 */
const mostUpvotes = () => (dispatch) => {
  dispatch(setFetching());
  axios.get('/api/v1/recipes/?sort=upvotes&order=desc')
    .then((response) => {
      dispatch(batchActions([
        mostUpvotesActionCreator(response.data.recipes),
        unsetFetching(),
      ]));
    })
    .catch((error) => {
      dispatch(mostUpvotesError(error));
    });
};

export default mostUpvotes;
