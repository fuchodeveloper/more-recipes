import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import signupAction from '../../action/authentication/signupAction';
import loginAction from '../../action/authentication/loginAction';
import logoutAction from '../../action/authentication/logoutAction';
import profileAction from '../../action/profile/profileAction';
import updateProfileAction from '../../action/profile/updateProfileAction';
import {
  SET_CURRENT_USER,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE
} from '../../action/types';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(
    'creates SET_CURRENT_USER when signup action is successful',
    async (done) => {
      const { authResponse, signupData } = mockData;
      moxios.stubRequest('/api/v1/users/signup', {
        status: 201,
        response: authResponse
      });
      const expectedActions = {
        type: SET_CURRENT_USER,
        user: jwt.decode(authResponse.token)
      };
      const store = mockStore({});
      await store.dispatch(signupAction(signupData))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates SET_CURRENT_USER when login action is successful',
    async (done) => {
      const { authResponse, signinData } = mockData;
      moxios.stubRequest('/api/v1/users/signin', {
        status: 200,
        response: authResponse
      });
      const expectedActions = {
        type: SET_CURRENT_USER,
        user: jwt.decode(authResponse.token)
      };
      const store = mockStore({});
      await store.dispatch(loginAction(signinData))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates GET_PROFILE_SUCCESS to get user profile details',
    async (done) => {
      const { authProfile } = mockData;
      moxios.stubRequest('/api/v1/profile/1', {
        status: 200,
        response: authProfile
      });
      const expectedActions = {
        type: GET_PROFILE_SUCCESS,
        profile: authProfile.user
      };
      const store = mockStore({});
      await store.dispatch(profileAction(1))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates SET_CURRENT_USER to be empty object on logout',
    async (done) => {
      const expectedActions = [{
        type: SET_CURRENT_USER,
        user: {}
      }];
      const store = mockStore({});
      await store.dispatch(logoutAction());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }
  );

  it(
    'creates UPDATE_PROFILE when trying to edit profile',
    async (done) => {
      const { authProfile, updatedAuthProfile } = mockData;
      moxios.stubRequest('/api/v1/users/update', {
        status: 200,
        response: updatedAuthProfile
      });
      const expectedActions = {
        type: UPDATE_PROFILE,
        profile: updatedAuthProfile.user
      };
      const store = mockStore({});
      await store.dispatch(updateProfileAction(authProfile))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );
});
