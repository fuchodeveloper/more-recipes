import axios from 'axios';
import alertify from 'alertify.js';
import { batchActions } from 'redux-batched-actions';
import {
  GET_SEARCHED_RECIPE,
  GET_MY_RECIPES_PAGE_COUNT,
  GET_SEARCHED_RECIPE_ERROR
} from '../types';

/**
 * @description Recipe search action creator
 *
 * @export recipeSearchActionCreator
 *
 * @param {Object} recipes search parameter
 *
 * @returns {Object} return searched recipes object
 */
export const recipeSearchActionCreator = recipes => ({
  type: GET_SEARCHED_RECIPE,
  recipes
});

/**
 * @description recipe search error
 *
 * @param {Object} error recipes error parameter
 *
 * @returns {Object} error returns recipes search error
 */
const recipeSearchActionError = error => ({
  type: GET_SEARCHED_RECIPE_ERROR,
  error
});

/**
 * @description Recipe search page count
 *
 * @param {Number} pageCount recipes search page count parameter
 *
 * @returns {Number} returns pageCount
 */
const recipeSearchCount = pageCount => ({
  type: GET_MY_RECIPES_PAGE_COUNT,
  pageCount
});

/**
 * @description recipe search action
 *
 * @param {Object} searchQuery recipe search query parameter
 * @param {Number} page recipe search page
 *
 * @returns {Object} recipes returns searched recipes
 */
const recipeSearchAction = (searchQuery, page) =>
  dispatch => axios.post(`/api/v1/recipes/search?page=${page}`, { searchQuery })
    .then((response) => {
      if (response.data.recipes.length === 0) {
        const message = 'No recipe matches your search';
        alertify.logPosition('bottom right');
        alertify.error(message);
      }

      dispatch(batchActions([
        dispatch(recipeSearchActionCreator(response.data.recipes)),
        recipeSearchCount(response.data.pageCount)
      ]));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        const message = 'No recipe matches your search';
        alertify.logPosition('bottom right');
        alertify.error(message);
        dispatch(recipeSearchActionError(error.response.data));
      } else {
        alertify.logPosition('bottom right');
        alertify.error(error.message);
      }
    });

export default recipeSearchAction;
