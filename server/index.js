import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfiguration from '../webpack.config';
import auth from './routes/auth';
import recipes from './routes/recipes';
import favorites from './routes/favorites';
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
app.use('/upload', users);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfiguration.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port);

// export default app;
