import path from 'path';
import webpack from 'webpack';

export default {
  // devServer: {
  //   inline: true,
  //   contentBase: 'src',
  //   host: 'localhost',
  //   port: 8000,
  //   historyApiFallback: true,
  //   hot: true
  // },
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, './client/index.js')
  ],
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
