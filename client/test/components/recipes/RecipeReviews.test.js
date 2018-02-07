import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { RecipeReviews }
  from '../../../components/recipes/RecipeReviews';

let props;

const setup = () => {
  props = {
    review: {
      review: ''
    }
  };

  return shallow(<RecipeReviews {...props} />);
};

describe('RecipeReviews component', () => {
  it('should render the right amount of elements', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
