const path = require('path');
const webpack = require('webpack');
const clientDirectory = path.resolve(__dirname, 'client');

module.exports = {
  devtool: 'eval', // http://webpack.github.io/docs/configuration.html#devtool
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server',
    clientDirectory + '/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: clientDirectory
      }
    ]
  }
  // debug: true,
  // devtool: "#eval-source-map", // Put this back if react-dev-tools not working properly
}