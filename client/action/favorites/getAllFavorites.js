import axios from 'axios';
import { GET_ALL_FAVORITES } from '../types';

/**
 * GET all favorite recipes action
 *
 * @export getAllFavoritesAction
 * @returns {obj} obj
 */
export function getAllFavoritesAction() {
  return {
    type: GET_ALL_FAVORITES
  };
}
/**
 * GET all favorite recipes of an authenticated user
 *
 * @export getAllFavorites
 * @param {any} userId
 * @returns {obj} obj
 */
export default function getAllFavorites(userId) {
  return dispatch => axios.get(`/api/v1/users/${userId}/recipes`);
}
