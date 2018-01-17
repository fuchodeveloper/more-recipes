/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Header } from '../../../components/navigation/Header';

configure({ adapter: new Adapter() });

/**
 * @description function to setup props used in component
 * @returns {Object} props, enzymeWrapper
 */
const setup = () => {
  const props = {
    logoutProps: jest.fn(),
    auth: {
      user: { firstName: '' }
    }
  };
  const enzymeWrapper = shallow(<Header {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe('<Header />', () => {
  it('should check for the site brand name', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('a').text()).toBe('More Recipes');
    expect(enzymeWrapper.find('nav').hasClass('navbar')).toBe(true);
  });
});

