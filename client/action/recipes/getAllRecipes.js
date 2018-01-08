import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { GET_ALL_RECIPES, GET_PAGE_DETAILS } from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const receiveRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

export const recipePageDetails = pageCount => ({
  type: GET_PAGE_DETAILS,
  pageCount
});

const getAllRecipes = page => (dispatch) => {
  dispatch(setFetching());
  axios.get(`/api/v1/recipes?page=${page}`)
    .then((response) => {
      dispatch(batchActions([
        receiveRecipes(response.data.recipes),
        recipePageDetails(response.data.pageCount),
        unsetFetching(),
      ]));
    })
    .catch((error) => {
      // dispatch(batchActions([

      // ]));
      console.log(error.message);
    });
};

export default getAllRecipes;
