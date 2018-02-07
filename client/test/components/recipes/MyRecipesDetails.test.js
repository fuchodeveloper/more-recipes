import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { MyRecipesDetail } from '../../../components/recipes/MyRecipesDetail';

let props;

const setup = () => {
  props = {
    details: {
      image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/'
      + 'v1516760699/noodles_c6ltkq.jpg',
      name: 'jollof rice',
      direction: 'cook for five minutes'
    }
  };
  return shallow(<MyRecipesDetail {...props} />);
};

describe('MyRecipesDetail component', () => {
  describe('MyRecipesDetail component snapshot', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
