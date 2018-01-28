import { combineReducers } from 'redux';
import auth from './reducers/authentication/auth';
import { recipesReducer } from './reducers/recipes/recipesReducer';
import isFetching from './reducers/isFetching';
import profile from './reducers/profile/userProfileReducer';

export default combineReducers({
  auth,
  recipesReducer,
  isFetching,
  profile,
});
