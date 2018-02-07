import { SET_CURRENT_USER } from '../types';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

/**
 * @description The set current user action creator
 *
 * @export  setCurrentUser
 * @param   {Object} user - the user object
 *
 * @returns {Object} user - the user details saved
 * @returns {String} type - the action type
 */

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 * @description Log authenticated user out from app
 *
 * @export logout function
 *
 * @returns {Object} dispatch - the dispatch object returned
 */
const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};

export default logout;
