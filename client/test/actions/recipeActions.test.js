import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import getRecipeAction from '../../action/recipes/getRecipeAction';
import myRecipesAction from '../../action/recipes/myRecipesAction';
import {
  RECEIVE_RECIPE,
  GET_MY_RECIPES,
  GET_ALL_RECIPES,
  GET_SEARCHED_RECIPE,
  GET_ALL_FAVORITES,
  UPVOTE_RECIPE,
  DOWNVOTE_RECIPE,
  ADD_REVIEW,
  GET_MOST_UPVOTES,
  GET_MOST_UPVOTES_ERROR,
  ADD_RECIPE,
  RECEIVE_RECIPE_ERROR,
  ADD_FAVORITE_SUCCESS,
  UPDATE_RECIPE,
  ADD_FAVORITE_FAIL,
  DELETE_RECEIPE_FAIL,
  DELETE_RECEIPE,
  GET_ALL_FAVORITES_FAIL,
  UPDATE_PROFILE_FAIL,
  ADD_RECIPE_ERROR,
  DOWNVOTE_RECIPE_ERROR,
  GET_SEARCHED_RECIPE_ERROR,
  UPDATE_RECIPE_ERROR,
  ADD_REVIEW_FAIL
} from '../../action/types';
import mockData from '../__mocks__/mockData';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import getAllRecipesAction from '../../action/recipes/getAllRecipesAction';
import recipeSearchAction from '../../action/recipes/recipeSearchAction';
import getAllFavoritesAction
  from '../../action/favorites/getAllFavoritesAction';
import upvoteRecipeAction from '../../action/recipes/upvoteRecipeAction';
import downvoteRecipeAction from '../../action/recipes/downvoteRecipeAction';
import postReviewAction from '../../action/reviews/postReviewAction';
import mostUpvotesAction from '../../action/upvotes/mostUpvotesAction';
import addRecipeAction from '../../action/recipes/addRecipeAction';
import createFavoritesAction
  from '../../action/favorites/createFavoritesAction';
import updateRecipeAction from '../../action/recipes/updateRecipeAction';
import deleteRecipeAction from '../../action/recipes/deleteRecipeAction';
import updateProfileAction from '../../action/profile/updateProfileAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(
    'should create ADD_RECIPE when trying to add new recipes',
    (done) => {
      const { addRecipe, addRecipeResponse } = mockData;
      moxios.stubRequest('/api/v1/recipes', {
        status: 201,
        response: addRecipeResponse
      });
      const expectedActions = {
        type: ADD_RECIPE,
        recipe: addRecipeResponse.recipe
      };

      const store = mockStore({});
      store.dispatch(addRecipeAction(addRecipe))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates ADD_RECIPE_ERROR when add recipe fails',
    (done) => {
      const { addRecipeError } = mockData;
      moxios.stubRequest('/api/v1/recipes', {
        status: 400,
        response: 'Recipe name is required!'
      });
      const expectedActions = {
        type: ADD_RECIPE_ERROR,
        error: 'First name field is required!'
      };
      const store = mockStore({});
      store.dispatch(addRecipeAction(addRecipeError))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create ADD_REVIEW when trying to add review to recipes',
    (done) => {
      const { addReview, recipeReviews } = mockData;
      moxios.stubRequest('/api/v1/recipes/1/reviews', {
        status: 201,
        response: recipeReviews
      });
      const expectedActions = [{
        type: ADD_REVIEW,
        review: recipeReviews.recipe.Reviews
      }];

      const store = mockStore({});
      store.dispatch(postReviewAction(1, addReview))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create ADD_REVIEW_FAIL when trying to add review to recipes fails',
    (done) => {
      const id = 1;
      moxios.stubRequest(`/api/v1/recipes/${id}/reviews`, {
        status: 400,
        response: 'review is required'
      });
      const expectedActions = [{
        type: ADD_REVIEW_FAIL,
        error: 'review is required'
      }];

      const store = mockStore({});
      store.dispatch(postReviewAction(id, '    '))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create UPDATE_RECIPE when trying to update a recipe',
    (done) => {
      const { addRecipe, addRecipeResponse } = mockData;
      moxios.stubRequest('/api/v1/recipes/1', {
        status: 200,
        response: addRecipeResponse
      });
      const expectedActions = {
        type: UPDATE_RECIPE,
        recipe: addRecipeResponse.recipe
      };

      const store = mockStore({});
      store.dispatch(updateRecipeAction(1, addRecipe))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create UPDATE_RECIPE_ERROR when update a recipe fails',
    (done) => {
      const { updateRecipeError } = mockData;
      const id = 1;
      moxios.stubRequest(`/api/v1/recipes/${id}`, {
        status: 400,
        response: 'Recipe name is required'
      });
      const expectedActions = {
        type: UPDATE_RECIPE_ERROR,
        error: 'Recipe name is required'
      };

      const store = mockStore({});
      store.dispatch(updateRecipeAction(id, updateRecipeError))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create GET_MY_RECIPES when trying to get user recipes',
    (done) => {
      const { myRecipes } = mockData;
      moxios.stubRequest('/api/v1/recipes/userRecipes?page=1', {
        status: 200,
        response: myRecipes
      });
      const expectedActions = {
        type: GET_MY_RECIPES,
        recipes: myRecipes.recipes
      };

      const store = mockStore({});
      store.dispatch(myRecipesAction(1))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create DELETE_RECEIPE when trying to delete a recipe',
    (done) => {
      const id = 3;
      const { deletedRecipe } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${id}`, {
        status: 200,
        response: deletedRecipe
      });
      const expectedActions = {
        type: DELETE_RECEIPE,
        recipes: deletedRecipe.recipes
      };

      const store = mockStore({});
      store.dispatch(deleteRecipeAction(id))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create DELETE_RECEIPE_FAIL when trying to delete a recipe fails',
    (done) => {
      const id = 1000;
      moxios.stubRequest(`/api/v1/recipes/${id}`, {
        status: 404,
        response: 'Recipe not found'
      });
      const expectedActions = {
        type: DELETE_RECEIPE_FAIL,
        error: 'Recipe not found'
      };

      const store = mockStore({});
      store.dispatch(deleteRecipeAction(id))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create RECEIVE_RECIPE when trying to get a recipe',
    (done) => {
      const { viewedRecipe } = mockData;
      moxios.stubRequest('/api/v1/recipes/1', {
        status: 200,
        response: viewedRecipe
      });
      const expectedActions = {
        type: RECEIVE_RECIPE,
        recipe: viewedRecipe
      };

      const store = mockStore({});
      store.dispatch(getRecipeAction(1))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create RECEIVE_RECIPE_ERROR when get recipe fails',
    (done) => {
      const id = 10;
      const { errorResponse } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${id}`, {
        status: 400,
        response: errorResponse
      });
      const expectedActions = {
        type: RECEIVE_RECIPE_ERROR,
        error: errorResponse.error
      };

      const store = mockStore({});
      store.dispatch(getRecipeAction(id))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create GET_ALL_RECIPES when trying to get all recipes',
    (done) => {
      const { allRecipesData } = mockData;
      moxios.stubRequest('/api/v1/recipes?page=1', {
        status: 200,
        response: allRecipesData
      });
      const expectedActions = {
        type: GET_ALL_RECIPES,
        recipes: allRecipesData.recipes
      };

      const store = mockStore({});
      store.dispatch(getAllRecipesAction(1))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates GET_FAVORITE_RECIPES when trying to get user favorited recipe',
    (done) => {
      const { allRecipesData } = mockData;
      moxios.stubRequest('/api/v1/users/1/recipes?page=1', {
        status: 200,
        response: allRecipesData
      });
      const expectedActions = {
        type: GET_ALL_FAVORITES,
        recipes: allRecipesData.recipes
      };
      const store = mockStore({});
      store.dispatch(getAllFavoritesAction(1, 1))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates UPVOTE_RECIPE when trying to upvote recipe',
    (done) => {
      const { upvotedRecipe } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${1}/upvote`, {
        status: 201,
        response: upvotedRecipe
      });
      const expectedActions = [{
        type: UPVOTE_RECIPE,
        recipe: upvotedRecipe.recipe
      }];
      const store = mockStore({});
      store.dispatch(upvoteRecipeAction(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates DOWNVOTE_RECIPE when trying to downvote recipe',
    (done) => {
      const { downvotedRecipe } = mockData;
      moxios.stubRequest(`/api/v1/recipes/${1}/downvote`, {
        status: 201,
        response: downvotedRecipe
      });
      const expectedActions = [{
        type: DOWNVOTE_RECIPE,
        recipe: downvotedRecipe.recipe
      }];
      const store = mockStore({});
      store.dispatch(downvoteRecipeAction(1))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates DOWNVOTE_RECIPE_ERROR when trying to downvote recipe fails',
    (done) => {
      const id = 1000;

      moxios.stubRequest(`/api/v1/recipes/${id}/downvote`, {
        status: 404,
        response: 'Recipe not found'
      });
      const expectedActions = {
        type: DOWNVOTE_RECIPE_ERROR,
        error: 'Recipe not found'
      };
      const store = mockStore({});
      store.dispatch(downvoteRecipeAction(id))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates GET_MOST_UPVOTES when trying to get most upvoted recipes',
    (done) => {
      const { allRecipesData } = mockData;
      moxios.stubRequest(
        '/api/v1/recipes?page=1&sort=upvotes&order=desc',
        {
          status: 200,
          response: allRecipesData
        }
      );
      const expectedActions = {
        type: GET_MOST_UPVOTES,
        recipes: allRecipesData.recipes
      };
      const store = mockStore({});
      store.dispatch(mostUpvotesAction(1))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates GET_MOST_UPVOTES_ERROR when get most upvoted recipes fails',
    (done) => {
      const { errorResponse } = mockData;
      const id = 10;
      moxios.stubRequest(
        `/api/v1/recipes?page=${id}&sort=upvotes&order=desc`,
        {
          status: 400,
          response: errorResponse
        }
      );
      const expectedActions = {
        type: GET_MOST_UPVOTES_ERROR,
        error: errorResponse.error
      };
      const store = mockStore({});
      store.dispatch(mostUpvotesAction(id))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create GET_SEARCHED_RECIPE when trying to search for recipes',
    (done) => {
      const page = 1;
      const { searchRecipeQuery, searchRecipes } = mockData;
      moxios.stubRequest(`/api/v1/recipes/search?page=${page}`, {
        status: 200,
        response: searchRecipes
      });
      const expectedActions = {
        type: GET_SEARCHED_RECIPE,
        recipes: searchRecipes.recipes
      };

      const store = mockStore({});
      store.dispatch(recipeSearchAction(searchRecipeQuery.searchQuery, page))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'should create GET_SEARCHED_RECIPE_ERROR when search for recipes fails',
    (done) => {
      const page = 1;
      const { errorSearchRecipeQuery } = mockData;
      moxios.stubRequest(`/api/v1/recipes/search?page=${page}`, {
        status: 404,
        response: 'Recipe not found'
      });
      const expectedActions = {
        type: GET_SEARCHED_RECIPE_ERROR,
        error: 'Recipe not found'
      };

      const store = mockStore({});
      store
        .dispatch(recipeSearchAction(errorSearchRecipeQuery.searchQuery, page))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates ADD_FAVORITE_SUCCESS when trying to favorite a recipe',
    (done) => {
      const { addFavoriteResponse } = mockData;
      moxios.stubRequest('/api/v1/users/1/recipes', {
        status: 201,
        response: addFavoriteResponse
      });
      const expectedActions = {
        type: ADD_FAVORITE_SUCCESS,
        favorite: addFavoriteResponse.favorite
      };
      const store = mockStore({});
      store.dispatch(createFavoritesAction(1))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates ADD_FAVORITE_FAIL when trying to favorite a recipe fails',
    (done) => {
      const id = 10;
      const { errorResponse } = mockData;
      moxios.stubRequest(`/api/v1/users/${id}/recipes`, {
        status: 400,
        response: errorResponse
      });
      const expectedActions = {
        type: ADD_FAVORITE_FAIL,
        error: errorResponse.error
      };
      const store = mockStore({});
      store.dispatch(createFavoritesAction(id))
        .then(() => {
          expect(store.getActions()[0]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates GET_ALL_FAVORITES_FAIL when get favorited recipe fails',
    (done) => {
      const id = 100;
      const pageId = 100;
      const { errorResponse } = mockData;
      moxios.stubRequest(`/api/v1/users/${id}/recipes?page=${pageId}`, {
        status: 400,
        response: errorResponse
      });
      const expectedActions = {
        type: GET_ALL_FAVORITES_FAIL,
        error: errorResponse.error
      };
      const store = mockStore({});
      store.dispatch(getAllFavoritesAction(id, pageId))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );

  it(
    'creates UPDATE_PROFILE_FAIL when update profile fails',
    (done) => {
      const { updatedAuthProfileError } = mockData;
      moxios.stubRequest('/api/v1/users/update', {
        status: 400,
        response: 'First name field is required!'
      });
      const expectedActions = {
        type: UPDATE_PROFILE_FAIL,
        error: 'First name field is required!'
      };
      const store = mockStore({});
      store.dispatch(updateProfileAction(updatedAuthProfileError))
        .then(() => {
          expect(store.getActions()[1]).toEqual(expectedActions);
        });
      done();
    }
  );
});
