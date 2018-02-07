import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import mockData from '../../__mocks__/mockData';
import ConnectedProfilePage, { ProfilePage }
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
});

