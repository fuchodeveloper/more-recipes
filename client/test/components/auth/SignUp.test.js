import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { SignUp } from '../../../components/auth/SignUp';

const userDetails = {
  emailAddress: 'john@gmail.com',
  password: 'password'
};
/**
 * @description function to setup props and
 * shallow mount LoginPage component
 *
 * @returns {DOM} LoginPage component
 */
const setup = () => {
  const props = {
    login: jest.fn(),
    auth: false,
    router: undefined
  };

  return shallow(<SignUp {...props} />);
};

describe('SignUp page component', () => {
  describe('SignUp component snapshot', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should set first name when first name changes', () => {
    const event = {
      target: {
        name: 'firstName',
        value: ''
      }
    };

    const wrapper = setup();
    const firstName = wrapper.find('#firstName');

    event.target.value = 'halle';
    firstName.simulate('change', event);

    const expectedFirstName = 'halle';

    expect(wrapper.instance().state.firstName).toBe(expectedFirstName);
  });

  it('should set last name when last name changes', () => {
    const event = {
      target: {
        name: 'lastName',
        value: ''
      }
    };

    const wrapper = setup();
    const lastName = wrapper.find('#lastName');

    event.target.value = 'berry';
    lastName.simulate('change', event);

    const expectedLastName = 'berry';

    expect(wrapper.instance().state.lastName).toBe(expectedLastName);
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

  it('should set confirm password when confirm password changes', () => {
    const event = {
      target: {
        name: 'passwordConfirmation',
        value: ''
      }
    };

    const wrapper = setup();
    const passwordConfirmation = wrapper.find('#passwordConfirmation');

    event.target.value = 'password';
    passwordConfirmation.simulate('change', event);

    const expectedPassword = 'password';

    expect(wrapper.instance().state.passwordConfirmation)
      .toBe(expectedPassword);
  });

  it('should sign up user when correct credentials are supplied', () => {
    const event = {
      preventDefault: jest.fn()
    };

    const wrapper = setup();
    const signupForm = wrapper.find('#signup-submit');

    wrapper.setState(userDetails);
    signupForm.simulate('submit', event);
  });
});

