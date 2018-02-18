import { SET_CURRENT_USER } from '../types';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

/**
 * @description The set current user action creator
 *
 * @export  setCurrentUser action creator for set current user
 *
 * @param   {Object} user - the user object
 *
 * @returns {Object} user - the user details saved
 */

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * @description Log authenticated user out from app
 *
 * @export logoutAction function to log out user
 *
 * @returns {Object} dispatch - the dispatch object returned
 */
const logoutAction = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export default logoutAction;
