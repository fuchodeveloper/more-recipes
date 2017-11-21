import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import login from './reducers/authentication/login';
import recipe from './reducers/recipes/getRecipeDetails';
import isFetching from './reducers/isFetching';

export default combineReducers({
  flashMessages,
  login,
  recipe,
  isFetching
});

