import axios from 'axios';
import alertify from 'alertify.js';
import { batchActions } from 'redux-batched-actions';
import {
  GET_SEARCHED_RECIPE, GET_MY_RECIPES_PAGE_COUNT
} from '../types';

/**
 * Recipe search action creator
 *
 * @export recipeSearchActionCreator
 * @param {recipes} recipes
 * @returns {recipes} recipes
 */
export const recipeSearchActionCreator = recipes => ({
  type: GET_SEARCHED_RECIPE,
  recipes
});

export const recipeSearchCount = pageCount => ({
  get: GET_MY_RECIPES_PAGE_COUNT,
  pageCount
});

const recipeSearchAction = (searchQuery, page) =>
  (dispatch) => {
    axios.post(`/api/v1/recipes/search?page=${page}`, { searchQuery })
      .then((response) => {
        if (response.data.recipes.length === 0) {
          const message = 'No recipe matches your search';
          alertify.logPosition('bottom right');
          alertify.error(message);
        }
        dispatch(recipeSearchActionCreator(response.data.recipes));
        dispatch(batchActions([
          recipeSearchActionCreator(response.data.recipes),
          recipeSearchCount(response.data.pageCount)
        ]));
      })
      .catch((error) => {
        if (error.response.status === 404) {
          const message = 'No recipe matches your search';
          alertify.logPosition('bottom right');
          alertify.error(message);
        } else {
          alertify.logPosition('bottom right');
          alertify.error(error.message);
        }
      });
  };

export default recipeSearchAction;
