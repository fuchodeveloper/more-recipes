import usersController from '../controllers/usersController';
import recipesController from '../controllers/recipesController';
import reviewsController from '../controllers/reviewsController';
import authorization from '../middleware/tokenMiddleware';
import favoritesController from '../controllers/favoritesController';
import votesController from '../controllers/votesController';

const routes = (router) => {
  router.get('/', (request, response) => {
    response.status(200)
      .send({ message: 'Welcome to more-recipes!' });
  });

  router.post('/users/signup', usersController.create);
  router.post('/users/signin', usersController.login);

  /**
   * Recipe routes
   */
  router.post('/recipes', authorization.verifyToken, recipesController.create);
  router.get('/recipes/:id', recipesController.get);
  router.get('/recipes', recipesController.getAll);
  router.delete('/recipes/:id', authorization.verifyToken, recipesController.delete);
  router.put('/recipes/:id', authorization.verifyToken, recipesController.update);
  // router.get('/recipes/?sort=upvotes&order=desc', recipesController.getUpVotes);
  router.post('/recipes/:id/upvote', authorization.verifyToken, votesController.upVote);
  router.post('/recipes/:id/downvote', authorization.verifyToken, votesController.downVote);

  /**
   * Recipe review routes
   */
  router.post('/recipes/:id/reviews', authorization.verifyToken, reviewsController.create);

  /**
   * Recipe favorite routes
   */
  router.post('/users/:id/recipes', authorization.verifyToken, favoritesController.create);
  router.get('/users/:id/recipes', favoritesController.getAll);
};

export default routes;

