import expect from 'expect';
import authReducer from '../../reducers/authentication/auth';
import userProfileReducer from '../../reducers/profile/userProfileReducer';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FAIL,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL
} from '../../action/types';
import mockData from '../__mocks__/mockData';

describe('Auth reducer', () => {
  it('should return the initial state', (done) => {
    expect(authReducer(undefined, {})).toEqual({
      isAuthenticated: false, user: {}
    });
    done();
  });

  it('should set the current user when passed  SET_CURRENT_USER', (done) => {
    const state = {};
    const user = mockData.signupDetails;

    const action = {
      type: SET_CURRENT_USER,
      user
    };

    const newState = authReducer(state, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user.firstName).toEqual('mary');
    expect(newState.user.lastName).toEqual('bella');
    done();
  });

  it(
    'should set the current user to empty when passed SET_CURRENT_USER_FAIL',
    (done) => {
      const state = {};
      const error = mockData.signupDetailsError;

      const action = {
        type: SET_CURRENT_USER_FAIL,
        error
      };

      const newState = authReducer(state, action);
      expect(newState.isAuthenticated).toEqual(false);
      expect(newState.error.firstName).toEqual('');
      expect(newState.error.lastName).toEqual('');
      done();
    }
  );

  it(
    'should set the current profile when passed GET_PROFILE_SUCCESS',
    (done) => {
      const state = {};
      const profile = mockData.authProfile;

      const action = {
        type: GET_PROFILE_SUCCESS,
        profile
      };

      const newState = userProfileReducer(state, action);

      expect(newState.profile.firstName).toEqual('john');
      expect(newState.profile.lastName).toEqual('doe');
      expect(newState.profile.emailAddress).toEqual('john@gmail.com');
      done();
    }
  );

  it(
    'should update profile when passed UPDATE_PROFILE_SUCCESS',
    (done) => {
      const state = {};
      const profile = mockData.updatedAuthProfile.user;

      const action = {
        type: UPDATE_PROFILE,
        profile
      };

      const newState = userProfileReducer(state, action);
      expect(newState.profile.firstName).toEqual('johnny');
      expect(newState.profile.lastName).toEqual('doey');
      expect(newState.profile.emailAddress).toEqual('johnny@gmail.com');
      done();
    }
  );

  it(
    'should set update profile to error when passed UPDATE_PROFILE_FAIL',
    (done) => {
      const state = {};
      const error = {
        firstName: '',
        lastName: ''
      };

      const action = {
        type: UPDATE_PROFILE_FAIL,
        error
      };

      const newState = userProfileReducer(state, action);

      expect(newState.error.firstName).toEqual('');
      expect(newState.error.lastName).toEqual('');
      done();
    }
  );
});
