import { combineReducers } from 'redux';
import auth from './reducers/authentication/auth';
import recipe from './reducers/recipes/getRecipeDetails';
import recipes from './reducers/recipes/getAllRecipes';
import isFetching from './reducers/isFetching';
import profile from './reducers/profile/userProfileReducer';
import searchResult from './reducers/recipes/getSearchRecipes';
import favorites from './reducers/favorites/favoritesReducer';
import pageCount from './reducers/recipes/getRecipePageDetails';

export default combineReducers({
  auth,
  recipe,
  isFetching,
  recipes,
  profile,
  searchResult,
  favorites,
  pageCount
});
