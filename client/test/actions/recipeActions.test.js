import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import getRecipeAction from '../../action/recipes/getRecipeAction';
import myRecipesAction from '../../action/recipes/myRecipesActions';
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
  ADD_RECIPE,
  RECEIVE_RECIPE_ERROR,
  ADD_FAVORITE_SUCCESS,
  UPDATE_RECIPE
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
import mostUpvotesAction from '../../action/most-upvotes/mostUpvotesAction';
import addRecipeAction from '../../action/recipes/addRecipeAction';
import createFavoritesAction
  from '../../action/favorites/createFavoritesAction';
import updateRecipeAction from '../../action/recipes/updateRecipeAction';

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
    'should create ADD_REVIEW when trying to add review to recipes',
    (done) => {
      const { addReview, recipeReviews } = mockData;
      moxios.stubRequest('/api/v1/recipes/1/reviews', {
        status: 201,
        response: recipeReviews
      });
      const expectedActions = [{
        type: ADD_REVIEW,
        recipe: recipeReviews.recipe.Reviews
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
    'should create GET_SEARCHED_RECIPE when trying to search recipes',
    (done) => {
      const { allRecipesData } = mockData;
      moxios.stubRequest('/api/v1/recipes/search?page=1', {
        status: 200,
        response: allRecipesData
      });
      const expectedActions = {
        type: GET_SEARCHED_RECIPE,
        recipes: allRecipesData.recipes
      };

      const store = mockStore({});
      store.dispatch(recipeSearchAction(1, 'rice'))
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

  // it(
  //   'creates RECEIVE_RECIPE when trying to view a recipe',
  //    (done) => {
  //     const { viewedRecipe } = mockData;
  //     moxios.stubRequest('/api/v1/recipes/1', {
  //       status: 200,
  //       response: viewedRecipe.recipe.recipe
  //     });
  //     const expectedActions = {
  //       type: RECEIVE_RECIPE,
  //       recipe: viewedRecipe.recipe.recipe,
  //       favorited: viewedRecipe.recipe.favorited
  //     };
  //     const store = mockStore({});

  //     store.dispatch(getRecipeAction(1))
  //       .then(() => {
  //         expect(store.getActions()[1]).toEqual(expectedActions);
  //       });
  //     done();
  //   }
  // );

  // it(
  //   'should create GET_SEARCHED_RECIPE when trying to search for recipes',
  //   (done) => {
  //     const { searchRecipeQuery, searchRecipes } = mockData;
  //     moxios.stubRequest('/api/v1/recipes/search', {
  //       status: 200,
  //       response: searchRecipes.recipes
  //     });
  //     const expectedActions = {
  //       type: GET_SEARCHED_RECIPE,
  //       recipes: searchRecipes.recipes
  //     };

  //     const store = mockStore({});
  //     store.dispatch(recipeSearchAction(searchRecipeQuery.searchQuery, 1))
  //       .then(() => {
  //         expect(store.getActions()[1]).toEqual(expectedActions);
  //       });
  //     done();
  //   }
  // );

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
});
