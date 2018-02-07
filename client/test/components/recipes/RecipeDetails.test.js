import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockData from '../../__mocks__/mockData';
import ConnectedRecipeDetails, { RecipeDetails }
  from '../../../components/recipes/RecipeDetails';

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let props;

const setup = () => {
  props = {
    getRecipeAction: jest.fn(() => Promise.resolve()),
    recipe: mockData.singleRecipeData.recipe.recipe,
    reviews: mockData.reviews,
    favorited: false,
    receiveUpvote: jest.fn(),
    postReview: jest.fn(),
    receiveDownvote: jest.fn(),
    isFetching: false,
    createFavoritesAction: jest.fn(),
    match: {
      params: {
        id: 1
      }
    }
  };

  return shallow(<RecipeDetails {...props} />);
};

describe('ReceipeDetails component', () => {
  it('should render preloader', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the right amount of elements', () => {
    const wrapper = setup();
    wrapper.setProps({ isFetching: false });
    expect(wrapper).toMatchSnapshot();
  });

  it('should update the review form input on change', () => {
    const wrapper = setup();
    wrapper.setProps({ isFetching: false });

    const reviewInput = wrapper.find('#review-body');
    reviewInput.simulate('change', {
      target: {
        name: 'review',
        value: ''
      }
    });
    expect(wrapper.instance().state.review).toEqual('');
  });

  describe('RecipeDetails connected component', () => {
    it(
      'should test that the RecipeDetails component successfully rendered',
      () => {
        const store = mockStore({
          recipesReducer: mockData.singleRecipeData.recipe,
          auth: {
            user: 1
          },
          error: {}
        });
        const wrapper = shallow(<ConnectedRecipeDetails store={store} />);
        expect(wrapper.length).toBe(1);
      }
    );
  });
});
