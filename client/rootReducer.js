import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import login from './reducers/authentication/login';
import recipe from './reducers/recipes/getRecipeDetails';
import recipes from './reducers/recipes/getAllRecipes';
import isFetching from './reducers/isFetching';
import profile from './reducers/profile/userProfileReducer';
import searchResult from './reducers/recipes/getSearchRecipes';
import favorite from './reducers/favorites/favoritesReducer';

export default combineReducers({
  flashMessages,
  login,
  recipe,
  isFetching,
  recipes,
  profile,
  searchResult,
  favorite
});
