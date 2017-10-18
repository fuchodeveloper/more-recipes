const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    inline: true,
    contentBase: 'src',
    host: 'localhost',
    port: 8000,
    historyApiFallback: true,
    hot: true
  },
  devtool: 'cheap-module-eval-source-map',
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
    filename: 'js/webpack-bundle.min.js',
    path: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};
