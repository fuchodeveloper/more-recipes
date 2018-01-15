/* eslint-disable max-len */
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import loginAction from '../../action/authentication/loginAction';
import { SET_CURRENT_USER } from '../../action/types';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates SET_CURRENT_USER when login action is successful', async (done) => {
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
  });
});
