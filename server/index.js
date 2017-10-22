import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// import routes from './routes/index';
import webpackConfiguration from '../webpack.config';
import auth from './routes/auth';
import recipes from './routes/recipes';

const app = express();
const compiler = webpack(webpackConfiguration);

const port = parseInt(process.env.PORT, 10) || 8000;

// const router = express.Router();
// routes(router);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', auth);
app.use('/api/v1/recipes', recipes);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfiguration.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));


app.get('/*', (request, response) => {
  response.sendFile(path.join(__dirname, './index.html'));
});

// router.get('/signup', (request, response) => {
//   response.status(200)
//     .send({ message: 'Welcome to more-recipes!' });
// });

// app.use((req, res, next) => {
//   const err = res.status(404).send({
//     message: '404: Sorry Page Not Found!'
//   });
//   next(err);
// });

// app.use('/', router);

// app.get('*', (request, response) => response.status(404)
//   .json({ message: 'Route does not exist!' }));

app.listen(port);

// export default app;
