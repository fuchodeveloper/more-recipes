import axios from 'axios';
import alertify from 'alertify.js';
import { GET_SEARCHED_RECIPE } from '../types';

/**
 * Recipe search action creator
 *
 * @export recipeSearchActionCreator
 * @param {recipes} recipes
 * @returns {recipes} recipes
 */
const recipeSearchActionCreator = recipes => ({
  type: GET_SEARCHED_RECIPE,
  recipes
});

const recipeSearch = searchParam =>
  dispatch => axios.post('/api/v1/recipes/search', { search: searchParam })
    .then(response => dispatch(recipeSearchActionCreator(response.data.recipes)))
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

export default recipeSearch;
