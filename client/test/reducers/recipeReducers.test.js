import expect from 'expect';
import {
  GET_ALL_RECIPES,
  RECEIVE_RECIPE,
  GET_MY_RECIPES,
  RECEIVE_RECIPE_ERROR,
  UPDATE_RECIPE,
  GET_MY_RECIPES_FAIL,
  GET_PAGE_DETAILS,
  GET_SEARCHED_RECIPE,
  GET_SEARCHED_RECIPE_COUNT,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  ADD_RECIPE,
  ADD_RECIPE_ERROR,
  UPDATE_RECIPE_ERROR,
  GET_MOST_UPVOTES,
  GET_ALL_FAVORITES,
  GET_ALL_FAVORITES_PAGE_COUNT,
  GET_MY_RECIPES_PAGE_COUNT,
  GET_MOST_UPVOTES_COUNT
} from '../../action/types';
import { recipesReducer } from '../../reducers/recipes/recipesReducer';
import mockData from '../__mocks__/mockData';

describe('Recipes reducer', () => {
  it('should return all recipes when passed GET_ALL_RECIPES', (done) => {
    const state = {
      recipes: []
    };

    const { allRecipesData } = mockData;
    const recipes = allRecipesData;

    const action = {
      type: GET_ALL_RECIPES,
      recipes
    };

    const newState = recipesReducer(state, action);
    expect(newState.recipes).toEqual(recipes);
    done();
  });

  it(
    'should return most voted recipes when passed GET_MOST_UPVOTES',
    (done) => {
      const state = {
        recipes: []
      };

      const { allRecipesData } = mockData;
      const recipes = allRecipesData;

      const action = {
        type: GET_MOST_UPVOTES,
        recipes
      };

      const newState = recipesReducer(state, action);
      expect(newState.recipes).toEqual(recipes);
      done();
    }
  );

  it(
    'should return user favorited recipes when passed GET_ALL_FAVORITES',
    (done) => {
      const state = {
        recipes: []
      };

      const { allRecipesData } = mockData;
      const recipes = allRecipesData;

      const action = {
        type: GET_ALL_FAVORITES,
        recipes
      };

      const newState = recipesReducer(state, action);
      expect(newState.recipes).toEqual(recipes);
      done();
    }
  );

  it(
    'should return page count when passed GET_ALL_FAVORITES_PAGE_COUNT',
    () => {
      const state = {
        pageCount: ''
      };
      const { pageCount } = mockData;

      const action = {
        type: GET_MY_RECIPES_PAGE_COUNT,
        pageCount
      };

      const newState = recipesReducer(state, action);

      expect(newState.pageCount).toEqual(1);
    }
  );

  it(
    'should return page count when passed GET_MOST_UPVOTES_COUNT',
    () => {
      const state = {
        pageCount: ''
      };
      const { pageCount } = mockData;

      const action = {
        type: GET_MOST_UPVOTES_COUNT,
        pageCount
      };

      const newState = recipesReducer(state, action);

      expect(newState.pageCount).toEqual(1);
    }
  );

  it(
    'should return page count when passed GET_MY_RECIPES_PAGE_COUNT',
    () => {
      const state = {
        pageCount: ''
      };
      const { pageCount } = mockData;

      const action = {
        type: GET_ALL_FAVORITES_PAGE_COUNT,
        pageCount
      };

      const newState = recipesReducer(state, action);

      expect(newState.pageCount).toEqual(1);
    }
  );

  it(
    'should return all searched recipes when passed GET_SEARCHED_RECIPE',
    (done) => {
      const state = {
        recipes: []
      };

      const { allRecipesData } = mockData;
      const recipes = allRecipesData;

      const action = {
        type: GET_SEARCHED_RECIPE,
        recipes
      };

      const newState = recipesReducer(state, action);
      expect(newState.recipes).toEqual(recipes);
      done();
    }
  );

  it('should return a recipe', (done) => {
    const state = {
      recipe: {}
    };

    const { singleRecipeData } = mockData;

    const recipe = singleRecipeData;

    const action = {
      type: RECEIVE_RECIPE,
      recipe
    };

    const newState = recipesReducer(state, action);
    expect(newState.recipe).toEqual(recipe.recipe);

    done();
  });

  it('should return all user recipes when passed GET_MY_RECIPES', (done) => {
    const state = {
      recipes: {}
    };

    const recipes = mockData.allRecipesData;

    const action = {
      type: GET_MY_RECIPES,
      recipes
    };

    const newState = recipesReducer(state, action);
    expect(newState.recipes).toEqual(recipes);

    done();
  });

  it('should return recipes error when passed GET_MY_RECIPES_FAIL', (done) => {
    const state = {
      recipes: {}
    };

    const error = {
      error: 'Recipe not found!'
    };

    const action = {
      type: GET_MY_RECIPES_FAIL,
      error
    };

    const newState = recipesReducer(state, action);

    expect(newState.recipeErrors.error).toEqual('Recipe not found!');
    expect(newState.recipes).toEqual({});

    done();
  });

  it(
    'should get get all recipes to error when passed RECEIVE_RECIPE_ERROR',
    (done) => {
      const state = {
        recipes: {}
      };

      const error = {
        error: 'Recipe not found!'
      };

      const action = {
        type: RECEIVE_RECIPE_ERROR,
        error
      };

      const newState = recipesReducer(state, action);

      expect(newState.error.error).toEqual('Recipe not found!');
      expect(newState.recipes).toEqual({});

      done();
    }
  );

  it('should add recipe when passed ADD_RECIPE', () => {
    const state = {
      recipe: {}
    };
    const { addRecipe } = mockData;

    const action = {
      type: ADD_RECIPE,
      recipe: addRecipe
    };

    const newState = recipesReducer(state, action);
    expect(newState.recipe.name).toEqual(action.recipe.name);
    expect(newState.recipe.ingredients).toEqual(action.recipe.ingredients);
    expect(newState.recipe.direction).toEqual(action.recipe.direction);
  });

  it('should add recipe error when passed ADD_RECIPE_ERROR', () => {
    const state = {
      recipe: {}
    };
    const serverError = {
      name: 'Recipe name is required',
      ingredients: 'Recipe ingredients is required'
    };

    const action = {
      type: ADD_RECIPE_ERROR,
      error: serverError
    };

    const newState = recipesReducer(state, action);
    expect(newState.serverError.name).toEqual(action.error.name);
    expect(newState.serverError.ingredients).toEqual(action.error.ingredients);
  });

  it('should update recipe when passed UPDATE_RECIPE', () => {
    const state = {
      recipe: {}
    };
    const { recipe } = mockData.updatedRecipe;

    const action = {
      type: UPDATE_RECIPE,
      recipe
    };

    const newState = recipesReducer(state, action);
    expect(newState.recipe.name).toEqual('party rice and beans');
    expect(newState.recipe.ingredients).toEqual('local rice and beans');
  });

  it(
    'should return recipe update error when passed UPDATE_RECIPE_ERROR',
    () => {
      const state = {
        recipe: {}
      };
      const serverError = {
        name: 'Recipe name is required',
        ingredients: 'Recipe ingredients is required'
      };

      const action = {
        type: UPDATE_RECIPE_ERROR,
        error: serverError
      };

      const newState = recipesReducer(state, action);
      expect(newState.serverError.name).toEqual(action.error.name);
      expect(newState.serverError.ingredients)
        .toEqual(action.error.ingredients);
    }
  );

  it('should return page count when passed GET_PAGE_DETAILS', () => {
    const state = {
      pageCount: ''
    };
    const { pageCount } = mockData;

    const action = {
      type: GET_PAGE_DETAILS,
      pageCount
    };

    const newState = recipesReducer(state, action);

    expect(newState.pageCount).toEqual(1);
  });

  it(
    'should return searched page count when passed GET_SEARCHED_RECIPE_COUNT',
    () => {
      const state = {
        pageCount: ''
      };
      const { pageCount } = mockData;

      const action = {
        type: GET_SEARCHED_RECIPE_COUNT,
        pageCount
      };

      const newState = recipesReducer(state, action);

      expect(newState.pageCount).toEqual(1);
    }
  );

  it(
    'should return recipe upvote when passed UPVOTE_RECIPE',
    () => {
      const state = {
        recipe: {}
      };
      const upvotedRecipe = {
        recipe: {
          upVotes: 1,
          downVotes: 0,
          message: 'Recipe upvoted'
        }
      };

      const action = {
        type: UPVOTE_RECIPE,
        recipe: upvotedRecipe.recipe
      };

      const newState = recipesReducer(state, action);

      expect(newState.recipe.upVotes).toEqual(action.recipe.upVotes);
    }
  );

  it(
    'should return recipe downvote when passed DOWNVOTE_RECIPE',
    () => {
      const state = {
        recipe: {}
      };
      const upvotedRecipe = {
        recipe: {
          upVotes: 0,
          downVotes: 2,
          message: 'Recipe downvoted'
        }
      };

      const action = {
        type: DOWNVOTE_RECIPE,
        recipe: upvotedRecipe.recipe
      };

      const newState = recipesReducer(state, action);

      expect(newState.recipe.downVotes).toEqual(action.recipe.downVotes);
    }
  );
});

