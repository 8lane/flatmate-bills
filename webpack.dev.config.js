const webpack = require('webpack')
const BaseConfig = require('./webpack.base.config')

module.exports = Object.assign({}, BaseConfig, {
  devtool: 'eval-source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  stats: {
    colors: true
  }
})
