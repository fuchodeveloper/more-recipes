import axios from 'axios';
import { GET_MOST_UPVOTES } from '../types';

/**
 * Most upvotes action
 *
 * @export func
 * @returns {obj} obj
 */
export function mostUpvotesAction() {
  return {
    type: GET_MOST_UPVOTES
  };
}
/**
 * GET most upvoted recipes
 *
 * @export mostUpvotes
 * @returns {obj} obj
 */
export default function mostUpvotes() {
  return dispatch => axios.get('/api/v1/recipes/?sort=upvotes&order=desc');
}
