import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { GET_MY_RECIPES, GET_MY_RECIPES_FAIL } from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const myRecipesActionCreator = recipes => ({
  type: GET_MY_RECIPES,
  recipes
});

export const myRecipesActionCreatorError = error => ({
  type: GET_MY_RECIPES_FAIL,
  error
});

const myRecipesAction = () => (dispatch) => {
  dispatch(setFetching());
  axios.get('/api/v1/recipes/userRecipes')
    .then((response) => {
      dispatch(batchActions([
        myRecipesActionCreator(response.data.recipes),
        unsetFetching()
      ]));
    })
    .catch((error) => {
      console.log(error);
      dispatch(myRecipesActionCreatorError(error.data));
    });
};

export default myRecipesAction;
