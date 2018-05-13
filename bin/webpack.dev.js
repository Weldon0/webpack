const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const bootstrapEntryPoints = require('./webpack.bootstrap.config')

module.exports = merge(common, {
  entry: {
    "app.bundle": './src/app.js',
    "contact": './src/contact.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 9000,
    open: true,
  }
});