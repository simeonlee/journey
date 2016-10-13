const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const common = {
  debug: true,
  devtool: "#eval-source-map",
  entry: path.resolve(__dirname, 'client/index'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'client'),
        exclude: /(node_modules|bower_components)/,
      },
      // Disabling SCSS thru webpack for now (still gulping)
      // {
      //   test: /\.(scss|css)$/,
      //   loader: 'style!css!sass?sourceMap',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(jpg|png)$/,
        loader: 'file',
        include: path.resolve(__dirname, 'client/images'),
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    root: path.resolve(__dirname, 'client'),
    extensions: [
      '',
      '.js',
      '.jsx',
      // '.sass',
      // '.css',
    ],
  },
}

var config; // Will be our final webpack config

if (process.env.NODE_ENV === 'development') {
  config = merge(common, {
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(__dirname, 'client/index')
    ],
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
} else {
  config = merge(common, {
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
  });
}

module.exports = validate(config);

/**
 * devtool: 'eval', // http://webpack.github.io/docs/configuration.html#devtool
 */
