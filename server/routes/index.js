import path from 'path';
import UsersController from '../controllers/UsersController';
import RecipesController from '../controllers/RecipesController';
import ReviewsController from '../controllers/ReviewsController';
import Authorization from '../middleware/Authorization';
import FavoritesController from '../controllers/FavoritesController';
import VotesController from '../controllers/VotesController';

const index = (router) => {
  router.get('/', (request, response) => {
    response.status(200).sendFile(path.join(__dirname, '../../src/index.html'));
  });

  /**
   * User signup and sign in routes
   */
  router.post('/api/v1/users/signup', UsersController.create);
  router.post('/api/v1/users/signin', UsersController.login);

  /**
   * Recipe routes
   */
  router.post(
    '/api/v1/recipes',
    Authorization.verifyToken, RecipesController.createRecipe
  );
  router.get('/api/v1/recipes/:id', RecipesController.getRecipe);
  router.get('/api/v1/recipes', RecipesController.getAllRecipesPaginate);
  router.delete(
    '/api/v1/recipes/:id',
    Authorization.verifyToken, RecipesController.deleteRecipe
  );
  router.put(
    '/api/v1/recipes/:id',
    Authorization.verifyToken, RecipesController.updateRecipe
  );

  router.post(
    '/api/v1/recipes/:id/upvote',
    Authorization.verifyUser, VotesController.upVote
  );
  router.post(
    '/api/v1/recipes/:id/downvote',
    Authorization.verifyUser, VotesController.downVote
  );

  /**
   * Recipe review routes
   */
  router.post(
    '/api/v1/recipes/:id/reviews',
    Authorization.verifyToken, ReviewsController.create
  );
  router.get(
    '/api/v1/recipes/:id/reviews',
    Authorization.verifyToken, ReviewsController.get
  );

  /**
   * Recipe favorite routes
   */
  router.post(
    '/api/v1/users/:id/recipes',
    Authorization.verifyToken, FavoritesController.create
  );
  router.get(
    '/api/v1/users/:id/recipes',
    Authorization.verifyToken, FavoritesController.getAll
  );

  router.get('/api/v1/favorites/:id', FavoritesController.getFavoriteCount);
};

export default index;

