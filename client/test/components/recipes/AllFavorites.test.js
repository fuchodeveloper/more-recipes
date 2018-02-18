/* eslint-disable max-len */
import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AllFavoriteRecipes }
  from '../../../components/favorites/AllFavoriteRecipes';

let props;

const setup = () => {
  props = {
    details: {
      Recipe: {
        image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
        name: 'jollof',
        direction: 'rice, beans',
        views: 0,
        id: 1
      }
    }
  };
  return shallow(<AllFavoriteRecipes {...props} />);
};

describe('AllFavoriteRecipes component', () => {
  it('should render with right amount of elements', () => {
    expect(setup()).toMatchSnapshot();
  });
});

