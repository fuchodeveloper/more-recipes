import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Footer } from '../../../components/navigation/Footer';
/**
 * @description function to setup props used in component
 *
 * @returns {DOM} Footer
 */
const setup = () => shallow(<Footer />);

describe('Header component', () => {
  it('should render with right amount of elements', () => {
    expect(setup).toMatchSnapshot();
  });
});
