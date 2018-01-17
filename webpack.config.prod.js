const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
});

module.exports = {

  devtool: 'cheap-module-source-map',
  entry: [path.join(__dirname, './client/index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('./styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    HtmlWebpackPluginConfig
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-class-properties',
            'transform-object-rest-spread']
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.mp4$/,
        // options: {
        //   limit: 2000000,
        //   mimetype: 'video/mp4'
        // }
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};


// const path = require('path');
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const GLOBALS = {
//   'process.env.NODE_ENV': JSON.stringify('production')
// };

// module.exports = {
//   devtool: 'source-map',
//   entry: [
//     path.join(__dirname, './client/index.js')
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.(jpe?g|png|gif|svg)$/,
//         loader: 'url-loader'
//       },
//       {
//         test: /\.jsx?$/,
//         include: path.join(__dirname, 'client'),
//         loaders: ['react-hot-loader/webpack', 'babel-loader'],
//         exclude: /node_modules/
//       },
//       {
//         test: /\.(s*)css$/,
//         loader: ExtractTextPlugin.extract('css-loader!sass-loader')
//       }
//     ]
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/'
//   },
//   plugins: [
//     new webpack.optimize.OccurrenceOrderPlugin(),
//     new webpack.DefinePlugin(GLOBALS),
//     new ExtractTextPlugin('./styles.css'),
//     new webpack.optimize.UglifyJsPlugin()
//   ],
//   resolve: {
//     extensions: ['.js', '.json', '.jsx', '.css', '.scss']
//   },
//   node: {
//     fs: 'empty',
//     net: 'empty'
//   }
// };
