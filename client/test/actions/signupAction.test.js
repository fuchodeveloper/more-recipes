/* eslint-disable max-len */
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import signupAction from '../../action/authentication/signupAction';
import { SET_CURRENT_USER } from '../../action/types';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates SET_CURRENT_USER when signup action is successful', async (done) => {
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
  });
});
