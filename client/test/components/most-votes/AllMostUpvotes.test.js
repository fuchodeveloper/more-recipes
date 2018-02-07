import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AllMostUpvotes }
  from '../../../components/most-upvotes/AllMostUpvotes';

let props;

const setup = () => {
  props = {
    details: {
      upVotes: 0,
      image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/'
    + 'v1516760699/noodles_c6ltkq.jpg',
      name: 'jollof',
      direction: 'rice, beans',
      views: 0,
      id: 1
    }
  };
  return shallow(<AllMostUpvotes {...props} />);
};

describe('MostUpvotesPage component', () => {
  describe('MostUpvotesPage component snapshot', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
