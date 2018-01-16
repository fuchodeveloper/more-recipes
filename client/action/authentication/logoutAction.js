import { SET_CURRENT_USER } from '../types';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

/**
 * @description The set current user action creator
 *
 * @export  setCurrentUser
 * @param   {object} user - the user object
 *
 * @returns {object} user - the user details saved
 * @returns {string} type - the action type
 */

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 *
 *
 * @export logout
 * @returns {void}
 */

/**
 * @description Log authenticated user out from app
 *
 * @export  logout
 *
 * @returns {object} dispatch - the dispatch object returned
 */
const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export default logout;
