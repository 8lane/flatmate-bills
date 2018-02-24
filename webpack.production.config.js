const webpack = require('webpack')
const path = require('path')
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin')
const BaseConfig = require('./webpack.base.config')

module.exports = Object.assign({}, BaseConfig, {
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      screw_ie8: true,
      mangle: true,
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        properties: true
      },
      comments: false
    }),
    new WebpackExtractTextPlugin({
      filename: 'css/homepage.min.css?v=[contenthash]',
      allChunks: true
    })
  ],
  stats: {
    colors: true
  }
})
