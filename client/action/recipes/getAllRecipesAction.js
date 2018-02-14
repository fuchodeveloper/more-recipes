import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import
{ GET_ALL_RECIPES, GET_PAGE_DETAILS, GET_ALL_RECIPES_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * @description get all recipes action creator
 *
 * @param {Object} recipes recipes object parameter
 *
 * @returns {Object} recipes returns all recipes object
 */
const receiveRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

/**
 * @description get all recipes error action
 *
 * @param {Object} error recipes error object
 *
 * @returns {Object} error returns get all recipes error object
 */
const receiveRecipesError = error => ({
  type: GET_ALL_RECIPES_ERROR,
  error
});

/**
 * @description handles page detail
 *
 * @param {Number} pageCount recipe page count parameter
 *
 * @returns {Number} returns recipes page Count
 */
const recipePageCount = pageCount => ({
  type: GET_PAGE_DETAILS,
  pageCount
});

const getAllRecipesAction = page => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes?page=${page}`)
    .then((response) => {
      dispatch(batchActions([
        dispatch(receiveRecipes(response.data.recipes)),
        recipePageCount(response.data.pageCount),
        unsetFetching(),
      ]));
    })
    .catch((serverError) => {
      dispatch(receiveRecipesError(serverError.recipes.data.error));
    });
};

export default getAllRecipesAction;
