/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { LoginPage } from '../../../components/auth/LoginPage';
// import mockLocalStorage from '../../__mocks__/mockLocalStorage';

configure({ adapter: new Adapter() });

const userDetails = {
  emailAddress: 'john@gmail.com',
  password: 'password'
};

const setup = () => {
  const props = {
    login: jest.fn(),
    auth: false,
    router: undefined
  };

  return shallow(<LoginPage {...props} />);
};

describe('Login component', () => {
  it('should test that the component rendered successfully', () => {
    const wrapper = setup();
    expect(wrapper.find('.welcome-back').text()).toBe('Welcome Back');
  });

  it('should set email address when email address changes', () => {
    const event = {
      target: {
        name: 'emailAddress',
        value: ''
      }
    };

    const wrapper = setup();
    const emailAddress = wrapper.find('#emailAddress');

    event.target.value = 'john@gmail.com';
    emailAddress.simulate('change', event);

    const expectedEmail = 'john@gmail.com';

    expect(wrapper.instance().state.emailAddress).toBe(expectedEmail);
  });

  it('should set password when password changes', () => {
    const event = {
      target: {
        name: 'password',
        value: ''
      }
    };

    const wrapper = setup();
    const password = wrapper.find('#password');

    event.target.value = 'password';
    password.simulate('change', event);

    const expectedPassword = 'password';

    expect(wrapper.instance().state.password).toBe(expectedPassword);
  });

  it('should login user when correct credentials are supplied', () => {
    const event = {
      preventDefault: jest.fn()
    };

    const wrapper = setup();
    const loginForm = wrapper.find('#loginForm');

    wrapper.setState(userDetails);
    loginForm.simulate('submit', event);
  });
});

