import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { UpdateRecipePage } from '../../../components/recipes/UpdateRecipePage';

let props;

const setup = () => {
  props = {
    match: {
      params: {
        id: 1
      }
    },
    recipe: {
      name: 'jollof rice',
      image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/'
      + 'v1516760699/noodles_c6ltkq.jpg',
    },
    getRecipe: jest.fn()
  };
  return shallow(<UpdateRecipePage {...props} />);
};

describe('UpdateRecipePage component', () => {
  it('should render with right amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should set the recipe name when input value changes', () => {
    const event = {
      target: { name: 'name', value: '' }
    };
    const wrapper = setup();
    const recipeName = wrapper.find('#name');

    event.target.value = 'jollof rice';
    recipeName.simulate('change', event);

    expect(wrapper.instance().state.name).toBe('jollof rice');
  });

  it('should set the recipe ingredients when input value changes', () => {
    const event = {
      target: { name: 'ingredients', value: '' }
    };
    const wrapper = setup();
    const recipeName = wrapper.find('#ingredients');

    event.target.value = 'rice and maggi';
    recipeName.simulate('change', event);

    expect(wrapper.instance().state.ingredients).toBe('rice and maggi');
  });

  it('should not update recipe if state is empty', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = setup();
    const form = wrapper.find('#update-recipe-form');

    form.simulate('submit', event);
  });

  it('component should receive props', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = sinon.spy(
      UpdateRecipePage.prototype,
      'componentWillReceiveProps'
    );
    const nextProps = {
      recipe: {
        recipe: {
          name: 'party jollof rice and beans',
          image: 'https://res.cloudinary.com/fuchodeveloper/image/upload/'
          + 'v1516760699/noodles_c6ltkq.jpg',
          ingredients: 'local rice and beans',
          direction: 'proin eget tortor risus. nulla quis lorem ut libero '
          + 'malesuada feugiat. curabitur non nulla  sit amet nisl tempus '
          + 'convallis quis ac lectus. curabitur arcu erat,  accumsan id '
          + 'imperdiet et, porttitor at sem. cras ultricies ligula sed magna '
          + 'dictum porta.',
        }
      }
    };
    shallow(<UpdateRecipePage {...props} componentWillReceiveProps={spy} />);
    action.componentWillReceiveProps(nextProps);

    expect(action.state.name).toBe(nextProps.recipe.recipe.name);
    expect(action.state.ingredients).toBe(nextProps.recipe.recipe.ingredients);
  });
});
