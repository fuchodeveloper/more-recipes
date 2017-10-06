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

var _votesController = require('../controllers/votesController');

var _votesController2 = _interopRequireDefault(_votesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(router) {
  router.get('/', function (request, response) {
    response.status(200).send({ message: 'Welcome to more-recipes!' });
  });

  /**
   * User signup and sign in routes
   */
  router.post('/api/v1/users/signup', _usersController2.default.create);
  router.post('/api/v1/users/signin', _usersController2.default.login);

  /**
   * Recipe routes
   */
  router.post('/api/v1/recipes', _tokenMiddleware2.default.verifyToken, _recipesController2.default.create);
  router.get('/api/v1/recipes/:id', _recipesController2.default.get);
  router.get('/api/v1/recipes', _recipesController2.default.getAll);
  router.delete('/api/v1/recipes/:id', _tokenMiddleware2.default.verifyToken, _recipesController2.default.delete);
  router.put('/api/v1/recipes/:id', _tokenMiddleware2.default.verifyToken, _recipesController2.default.update);
  router.get('/api/v1/recipes/?sort=upvotes&order=desc', _recipesController2.default.sort);
  router.post('/api/v1/recipes/:id/upvote', _tokenMiddleware2.default.verifyToken, _votesController2.default.upVote);
  router.post('/api/v1/recipes/:id/downvote', _tokenMiddleware2.default.verifyToken, _votesController2.default.downVote);

  /**
   * Recipe review routes
   */
  router.post('/api/v1/recipes/:id/reviews', _tokenMiddleware2.default.verifyToken, _reviewsController2.default.create);

  /**
   * Recipe favorite routes
   */
  router.post('/api/v1/users/:id/recipes', _tokenMiddleware2.default.verifyToken, _favoritesController2.default.create);
  router.get('/api/v1/users/:id/recipes', _tokenMiddleware2.default.verifyToken, _favoritesController2.default.getAll);
};

exports.default = routes;