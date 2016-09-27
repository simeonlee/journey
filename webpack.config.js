module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  debug: true,
  devtool: "#eval-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }
    ]
  }
}