import path from 'path';
import usersController from '../controllers/usersController';
import recipesController from '../controllers/recipesController';
import reviewsController from '../controllers/reviewsController';
import authorization from '../middleware/tokenMiddleware';
import favoritesController from '../controllers/favoritesController';
import votesController from '../controllers/votesController';

const routes = (router) => {
  // router.get('/', (request, response) => {
  //   response.status(200)
  //     .send({ message: 'Welcome to more-recipes!' });
  // });

  router.get('/', (request, response) => {
    response.status(200).sendFile(path.join(__dirname, '../../src/index.html'));
  });

  /**
   * User signup and sign in routes
   */
  router.post('/api/v1/users/signup', usersController.create);
  router.post('/api/v1/users/signin', usersController.login);

  /**
   * Recipe routes
   */
  router.post('/api/v1/recipes', authorization.verifyToken, recipesController.create);
  router.get('/api/v1/recipes/:id', recipesController.get);
  router.get('/api/v1/recipes', recipesController.getAll);
  router.delete('/api/v1/recipes/:id', authorization.verifyToken, recipesController.delete);
  router.put('/api/v1/recipes/:id', authorization.verifyToken, recipesController.update);
  router.get('/api/v1/recipes/?sort=upvotes&order=desc', recipesController.sort);
  router.post('/api/v1/recipes/:id/upvote', authorization.verifyUser, votesController.upVote);
  router.post('/api/v1/recipes/:id/downvote', authorization.verifyUser, votesController.downVote);

  /**
   * Recipe review routes
   */
  router.post('/api/v1/recipes/:id/reviews', authorization.verifyToken, reviewsController.create);
  router.get('/api/v1/recipes/:id/reviews', authorization.verifyToken, reviewsController.get);

  /**
   * Recipe favorite routes
   */
  router.post('/api/v1/users/:id/recipes', authorization.verifyToken, favoritesController.create);
  router.get('/api/v1/users/:id/recipes', authorization.verifyToken, favoritesController.getAll);
};

export default routes;

