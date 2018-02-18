import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import {
  GET_MY_RECIPES,
  GET_MY_RECIPES_FAIL,
  GET_MY_RECIPES_PAGE_COUNT
} from '../types';
import { setFetching, unsetFetching } from '../fetching';

/**
 * @description action creator for myRecipesAction
 *
 * @param {Object} recipes recipes object parameter
 *
 * @returns {Object} recipes returns user recipes object
 */
const myRecipesActionCreator = recipes => ({
  type: GET_MY_RECIPES,
  recipes
});

/**
 * @description error action creator for myRecipesAction
 *
 * @param {Object} error error object parameter
 *
 * @returns {Object} error returns recipes error object
 */
const myRecipesActionCreatorError = error => ({
  type: GET_MY_RECIPES_FAIL,
  error
});

/**
 * @description handles recipes page count
 *
 * @param {Number} pageCount recipes page count parameter
 *
 * @returns {Number} pageCount returns recipes page count
 */
const myRecipesPageCount = pageCount => ({
  type: GET_MY_RECIPES_PAGE_COUNT,
  pageCount
});

/**
 * @description user recipes action
 *
 * @param {Number} page recipe page paramter
 *
 * @returns {Object} recipes returns a dispatch of user recipes
 */
const myRecipesAction = page => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes/userRecipes?page=${page}`)
    .then((response) => {
      dispatch(batchActions([
        dispatch(myRecipesActionCreator(response.data.recipes)),
        myRecipesPageCount(response.data.pageCount),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      dispatch(myRecipesActionCreatorError(error.response.data));
    });
};

export default myRecipesAction;
