
import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { RecipeSearchPage }
  from '../../../components/recipes/RecipeSearchPage';

let props;

const setup = () => {
  props = {
    recipes: {},
    pageCount: 1,
    recipeSearchAction: jest.fn(),
    // event: {
    preventDefault: jest.fn()
    // }
  };
  return shallow(<RecipeSearchPage {...props} />);
};


describe('RecipeSearchPage component', () => {
  const page = {
    selected: 1
  };

  describe('RecipeSearchPage component snapshot', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should call the onPageChange handler', () => {
    const spy = sinon.spy(RecipeSearchPage.prototype, 'onPageChange');
    shallow(<RecipeSearchPage {...props} onPageChange={spy} />)
      .instance().onPageChange(page);
  });

  // it('should set searchQuery to state when input values changes', () => {
  //   const event = { target: { name: 'searchQuery', value: '' } };

  //   const wrapper = setup();
  //   const searchInput = wrapper.find('#searchQuery');

  //   event.target.value = 'rice';
  //   searchInput.simulate('change', event);

  //   expect(wrapper.instance().state.searchQuery).toBe('rice');
  // });

  it('should submit search when query is supplied', () => {
    const event = {
      preventDefault: jest.fn()
    };

    const recipeSearchQuery = {
      searchQuery: 'rice'
    };

    const wrapper = setup();
    const searchForm = wrapper.find('#submit-search');

    wrapper.setState(recipeSearchQuery);
    searchForm.simulate('submit', event);
  });

  it('component should receive props', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = sinon.spy(
      RecipeSearchPage.prototype,
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
          direction: 'proin eget tortor risus. nulla quis lorem ut libero '
          + 'malesuada feugiat. curabitur non nulla  sit amet nisl tempus '
          + 'convallis quis ac lectus. curabitur arcu erat,  accumsan id '
          + 'imperdiet et, porttitor at sem. cras ultricies ligula sed magna '
          + 'dictum porta.',
          image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/'
          + 'v1516760699/noodles_c6ltkq.jpg',
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
    shallow(<RecipeSearchPage {...props} componentWillReceiveProps={spy} />);
    action.componentWillReceiveProps(nextProps);
    expect(action.state.recipes).toBe(nextProps.recipes);
    expect(action.state.pageCount).toBe(nextProps.pageCount);
  });
});
