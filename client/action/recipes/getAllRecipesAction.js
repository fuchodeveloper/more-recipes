import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import
{ GET_ALL_RECIPES, GET_PAGE_DETAILS, GET_ALL_RECIPES_ERROR } from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const receiveRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

export const receiveRecipesError = error => ({
  type: GET_ALL_RECIPES_ERROR,
  error
});

export const recipePageDetails = pageCount => ({
  type: GET_PAGE_DETAILS,
  pageCount
});

const getAllRecipesAction = page => (dispatch) => {
  dispatch(setFetching());
  return axios.get(`/api/v1/recipes?page=${page}`)
    .then((response) => {
      dispatch(batchActions([
        dispatch(receiveRecipes(response.data.recipes)),
        recipePageDetails(response.data.pageCount),
        unsetFetching(),
      ]));
    })
    .catch((serverError) => {
      dispatch(receiveRecipesError(serverError.recipes.data.error));
    });
};

export default getAllRecipesAction;
