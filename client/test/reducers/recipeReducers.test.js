import expect from 'expect';
import { GET_ALL_RECIPES, RECEIVE_RECIPE } from '../../action/types';
import recipesReducer from '../../reducers/recipes/getAllRecipes';
import singleRecipeReducer from '../../reducers/recipes/recipesReducer';
import mockData from '../__mocks__/mockData';

describe('Recipes reducer', () => {
  it('should return all recipes', (done) => {
    const initialState = {
      recipes: {}
    };

    const { allRecipesData } = mockData;
    const recipes = allRecipesData;

    const action = {
      type: GET_ALL_RECIPES,
      recipes
    };

    const newState = recipesReducer(initialState, action);

    expect(newState.recipes).toEqual(recipes.recipes);
    done();
  });

  it('should return a recipe', (done) => {
    const initialState = {
      recipe: {}
    };

    const { singleRecipeData } = mockData;

    const recipe = singleRecipeData;

    const action = {
      type: RECEIVE_RECIPE,
      recipe
    };

    const newState = singleRecipeReducer(initialState, action);
    expect(newState.recipe).toEqual(recipe.recipe);

    done();
  });
});

