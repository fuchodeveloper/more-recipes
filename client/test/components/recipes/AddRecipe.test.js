import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import sinon from 'sinon';
import { AddRecipePage } from '../../../components/recipes/AddRecipePage';

let props;

const setup = () => {
  props = {
    addRecipeAction: jest.fn()
  };
  return shallow(<AddRecipePage {...props} />);
};

describe('AddRecipePage component', () => {
  describe('AddRecipePage component snapshot', () => {
    it('should render with right amount of elements', () => {
      const { wrapper } = setup();
      expect(wrapper).toMatchSnapshot();
    });
  });
  it(
    'should test that the AddRecipePage component rendered successfully',
    () => {
      const wrapper = setup();
      expect(wrapper.find('div').length).toBe(17);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('img').length).toBe(1);
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('textarea').length).toBe(2);
    }
  );

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

  it('should not add recipe if state is empty', () => {
    const event = {
      preventDefault: jest.fn()
    };
    const wrapper = setup();
    const form = wrapper.find('#add-recipe-form');

    form.simulate('submit', event);
  });

  it('component should receive props', () => {
    const wrapper = setup();
    const action = wrapper.instance();
    const spy = sinon.spy(
      AddRecipePage.prototype,
      'componentWillReceiveProps'
    );
    const nextProps = {
      errors: {
        serverError: {
          name: 'Recipe name is required',
          ingredients: 'Recipe ingredients is required',
          direction: 'Recipe ingredients is required'
        }
      },
    };
    shallow(<AddRecipePage {...props} componentWillReceiveProps={spy} />);
    action.componentWillReceiveProps(nextProps);
    expect(action.state.errors.name)
      .toBe(nextProps.errors.serverError.name);
    expect(action.state.errors.ingredients)
      .toBe(nextProps.errors.serverError.ingredients);
    expect(action.state.errors.direction)
      .toBe(nextProps.errors.serverError.direction);
  });
});

