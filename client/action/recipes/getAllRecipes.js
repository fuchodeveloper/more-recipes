import axios from 'axios';
import { batchActions } from 'redux-batched-actions';
import { GET_ALL_RECIPES } from '../types';
import { setFetching, unsetFetching } from '../fetching';

export const receiveRecipes = recipes => ({
  type: GET_ALL_RECIPES,
  recipes
});

const getAllRecipes = () => (dispatch) => {
  dispatch(setFetching());
  axios.get('/api/v1/recipes')
    .then((response) => {
      dispatch(batchActions([
        receiveRecipes(response.data.recipes),
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
