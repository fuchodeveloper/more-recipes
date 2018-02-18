/* eslint-disable max-len */
import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { MostUpvotesPage }
  from '../../../components/upvotes/MostUpvotesPage';

let props;

const setup = () => {
  props = {
    mostUpvotesAction: jest.fn()
  };
  return shallow(<MostUpvotesPage {...props} />);
};

describe('MostUpvotesPage component', () => {
  describe('MostUpvotesPage component snapshot', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('component should receive props', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = sinon.spy(
      MostUpvotesPage.prototype,
      'componentWillReceiveProps'
    );
    const nextProps = {
      recipes: [
        {
          id: 1,
          userId: 1,
          name: 'jollof rice and beans',
          favoriteCount: 0,
          ingredients: 'rice and beans',
          direction: 'proin eget tortor risus. nulla quis lorem ut libero malesuada feugiat. curabitur non nulla  sit amet nisl tempus convallis quis ac lectus. curabitur arcu erat,  accumsan id imperdiet et, porttitor at sem. cras ultricies ligula sed magna dictum porta.',
          image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/v1516760699/noodles_c6ltkq.jpg',
          views: 59,
          upVotes: 0,
          downVotes: 0,
          recipeOwnerView: true,
          createdAt: '2018-02-04T16:52:28.768Z',
          updatedAt: '2018-02-06T02:55:06.389Z'
        }
      ],
      pageCount: 1
    };
    shallow(<MostUpvotesPage {...props} componentWillReceiveProps={spy} />);
    action.componentWillReceiveProps(nextProps);
    expect(action.state.recipes).toBe(nextProps.recipes);
    expect(action.state.pageCount).toBe(nextProps.pageCount);
  });
});
