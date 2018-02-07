/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import { Header } from '../../../components/navigation/Header';

configure({ adapter: new Adapter() });

/**
 * @description function to setup props used in component
 *
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
  describe('Header component', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should be successfully rendered', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Link').length).toBe(3);
  });
});

