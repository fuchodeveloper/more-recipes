import expect from 'expect';
import authReducer from '../../reducers/authentication/auth';
// import loginAction from '../../action/authentication/loginAction';
// import { SET_CURRENCT_USER } from '../../action/types';
// import mockData from '../__mocks__/mockData';
// import mockLocalStorage from '../__mocks__/mockLocalStorage';

describe('Auth reducer', () => {
  it('should return the initial state', (done) => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false, user: {}
    });
    done();
  });
});
