import path from 'path';
import usersController from '../controllers/usersController';
import recipesController from '../controllers/recipesController';
import reviewsController from '../controllers/reviewsController';
import authorization from '../middleware/tokenMiddleware';
import favoritesController from '../controllers/favoritesController';
import votesController from '../controllers/votesController';
// import validateInput from '../shared/validations/signup';

const routes = (router) => {
  router.get('/', (request, response) => {
    response.status(200).sendFile(path.join(__dirname, '../../src/index.html'));
  });

  /**
   * User signup and sign in routes
   */
  router.post('/api/v1/users/signup', usersController.create); // changed
  router.post('/api/v1/users/signin', usersController.login); // changed

  /**
   * Recipe routes
   */
  router.post('/api/v1/recipes', authorization.verifyToken, recipesController.create); // changed
  router.get('/api/v1/recipes/:id', recipesController.get); // changed
  router.get('/api/v1/recipes', recipesController.getAll); // changed
  router.delete('/api/v1/recipes/:id', authorization.verifyToken, recipesController.delete); // changed
  router.put('/api/v1/recipes/:id', authorization.verifyToken, recipesController.update); // changed
  router.get('/api/v1/recipes/?sort=upvotes&order=desc', recipesController.sort); // changed
  router.post('/api/v1/recipes/:id/upvote', authorization.verifyUser, votesController.upVote); // changed
  router.post('/api/v1/recipes/:id/downvote', authorization.verifyUser, votesController.downVote); // changed

  /**
   * Recipe review routes
   */
  router.post('/api/v1/recipes/:id/reviews', authorization.verifyToken, reviewsController.create); // changed
  router.get('/api/v1/recipes/:id/reviews', authorization.verifyToken, reviewsController.get); // changed

  /**
   * Recipe favorite routes
   */
  router.post('/api/v1/users/:id/recipes', authorization.verifyToken, favoritesController.create); // changed
  router.get('/api/v1/users/:id/recipes', authorization.verifyToken, favoritesController.getAll); // changed

  router.get('/api/v1/favorites/:id', favoritesController.getFavoriteCount); // changed
};

export default routes;

