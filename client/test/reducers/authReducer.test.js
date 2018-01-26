import expect from 'expect';
import authReducer from '../../reducers/authentication/auth';

describe('Auth reducer', () => {
  it('should return the initial state', (done) => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false, user: {}
    });
    done();
  });
});
