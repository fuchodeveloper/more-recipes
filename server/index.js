import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import webpackConfiguration from '../webpack.config';
import auth from './routes/auth';
import recipes from './routes/recipes';
import favorites from './routes/favorites';
import reviews from './routes/reviews';
import votes from './routes/votes';
import users from './routes/users';

const app = express();
const compiler = webpack(webpackConfiguration);

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'More recipes API documentation',
    version: '1.0.0',
    description: 'API documentation for more-recipes. More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt',
  },
  host: parseInt(process.env.PORT, 10) || 8000,
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/docs.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(express.static('server/api'));

const port = parseInt(process.env.PORT, 10) || 8000;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', auth);
app.use('/api/v1/recipes', recipes);
app.use('/api/v1', favorites);
app.use('/api/v1/recipes', reviews);
app.use('/api/v1/recipes', votes);
app.use('/api/v1', users);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfiguration.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, '../client/index.html'));
});


app.listen(port);

export default app;
