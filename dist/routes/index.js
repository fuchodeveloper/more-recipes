'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _usersController = require('../controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

var _recipesController = require('../controllers/recipesController');

var _recipesController2 = _interopRequireDefault(_recipesController);

var _reviewsController = require('../controllers/reviewsController');

var _reviewsController2 = _interopRequireDefault(_reviewsController);

var _tokenMiddleware = require('../middleware/tokenMiddleware');

var _tokenMiddleware2 = _interopRequireDefault(_tokenMiddleware);

var _favoritesController = require('../controllers/favoritesController');

var _favoritesController2 = _interopRequireDefault(_favoritesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(router) {
  router.get('/', function (request, response) {
    response.status(200).send({ message: 'Welcome to more-recipes!' });
  });

  router.post('/users/signup', _usersController2.default.create);
  router.post('/users/signin', _usersController2.default.login);

  /**
   * Recipe routes
   */
  router.post('/recipes', _tokenMiddleware2.default.verifyToken, _recipesController2.default.create);
  router.get('/recipes/:id', _recipesController2.default.get);
  router.get('/recipes', _recipesController2.default.getAll);
  router.delete('/recipes/:id', _tokenMiddleware2.default.verifyToken, _recipesController2.default.delete);
  router.put('/recipes/:id', _tokenMiddleware2.default.verifyToken, _recipesController2.default.update);
  // router.get('/recipes/?sort=upvotes&order=desc', recipesController.getUpVotes);

  /**
   * Recipe review routes
   */
  router.post('/recipes/:id/reviews', _tokenMiddleware2.default.verifyToken, _reviewsController2.default.create);

  /**
   * Recipe favorite routes
   */
  router.post('/users/:id/recipes', _tokenMiddleware2.default.verifyToken, _favoritesController2.default.create);
  router.get('/users/:id/recipes', _favoritesController2.default.getAll);
};

exports.default = routes;