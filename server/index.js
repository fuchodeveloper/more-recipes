import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfiguration from '../webpack.config';
import webpackConfigurationProd from '../webpack.config.prod';
import auth from './routes/auth';
import recipes from './routes/recipes';
import favorites from './routes/favorites';
import reviews from './routes/reviews';
import votes from './routes/votes';
import users from './routes/users';

const app = express();
const compiler = webpack(webpackConfiguration);

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

if (process.env.NODE_ENV !== 'production') {
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfiguration.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

if (process.env.NODE_ENV === 'production') {
  app.use(webpackMiddleware(webpack(webpackConfigurationProd)));
}

app.use(
  '/api-docs',
  express.static(path.join(path.dirname(__dirname), 'docs'))
);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else if (process.env.NODE_ENV === 'development'
  || process.env.NODE_ENV === 'test_dev') {
  app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.all('*', (req, res) => res.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

app.listen(port);

export default app;
