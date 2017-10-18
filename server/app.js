import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import routes from './routes/index';
import webpackConfiguration from '../webpack.config';


const app = express();
const compiler = webpack(webpackConfiguration);

const port = parseInt(process.env.PORT, 10) || 8000;
const router = express.Router();
routes(router);

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(webpackMiddleware(compiler));

app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfiguration.output.path
}));

app.get('/', (request, response) => {
  response.status(200).sendFile(path.join(__dirname, '../src'));
});

app.use('/', router);

// app.get('*', (request, response) => response.status(404)
//   .json({ message: 'Route does not exist!' }));

app.listen(port);

export default app;
