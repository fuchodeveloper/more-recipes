import usersController from '../controllers/usersController';
import recipesController from '../controllers/recipesController';
import tokenMiddleware from '../middleware/tokenMiddleware';

const routes = (router) => {
  router.get('/', (request, response) => response.status(200).send({ message: 'Welcome to more-recipes!' }));

  router.post('/register', usersController.create);
  router.post('/login', usersController.login);

  router.post('/recipes', tokenMiddleware.verify, recipesController.create);
  router.get('/recipes/:id', recipesController.get);
  router.get('/recipes', recipesController.getAll);
  router.delete('/recipes/:id', recipesController.delete);
};

export default routes;

