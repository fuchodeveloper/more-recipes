import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import {
  GET_MY_RECIPES,
  GET_MY_RECIPES_FAIL,
  GET_MY_RECIPES_PAGE_COUNT
} from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const myRecipesActionCreator = recipes => ({
  type: GET_MY_RECIPES,
  recipes
});

export const myRecipesActionCreatorError = error => ({
  type: GET_MY_RECIPES_FAIL,
  error
});

export const myRecipesPageCount = pageCount => ({
  type: GET_MY_RECIPES_PAGE_COUNT,
  pageCount
});

const myRecipesAction = page => (dispatch) => {
  dispatch(setFetching());
  axios.get(`/api/v1/recipes/userRecipes?page=${page}`)
    .then((response) => {
      dispatch(batchActions([
        myRecipesActionCreator(response.data.recipes),
        myRecipesPageCount(response.data.pageCount),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      dispatch(myRecipesActionCreatorError(error.response.data));
    });
};

export default myRecipesAction;
