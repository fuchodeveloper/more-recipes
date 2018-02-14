import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { ProfilePage }
  from '../../../components/profile/ProfilePage';

configure({ adapter: new Adapter() });

let props;

const setup = () => {
  props = {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
  };
  return mount(<ProfilePage {...props} />);
};

describe('Profile page component', () => {
  describe('ProfilePage component snapshot', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render profile form card', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('.user-profile-card').length).toBe(1);
  });

  it('should set firstName to state when input value changes', () => {
    const event = {
      target: { name: 'firstName', value: '' }
    };
    const wrapper = setup();
    const firstNameInput = wrapper.find('#firstName');

    event.target.value = 'james';
    firstNameInput.simulate('change', event);

    expect(wrapper.instance().state.firstName).toBe('james');
  });

  it('should set lastName to state when input value changes', () => {
    const event = {
      target: { name: 'lastName', value: '' }
    };
    const wrapper = setup();
    const firstNameInput = wrapper.find('#lastName');

    event.target.value = 'hardley';
    firstNameInput.simulate('change', event);

    expect(wrapper.instance().state.lastName).toBe('hardley');
  });

  it('component should receive props', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = sinon.spy(
      ProfilePage.prototype,
      'componentWillReceiveProps'
    );
    const nextProps = {
      profile: {
        firstName: 'john',
        lastName: 'doe',
        emailAddress: 'john@gmail.com'
      }
    };
    shallow(<ProfilePage {...props} componentWillReceiveProps={spy} />);
    action.componentWillReceiveProps(nextProps);
    expect(action.state.firstName).toBe(nextProps.profile.firstName);
    expect(action.state.lastName).toBe(nextProps.profile.lastName);
    expect(action.state.emailAddress).toBe(nextProps.profile.emailAddress);
  });
});

