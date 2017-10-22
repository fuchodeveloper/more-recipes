import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';
import login from './reducers/authentication/login';

export default combineReducers({
  flashMessages,
  login
});

