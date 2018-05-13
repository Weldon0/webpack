const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV === 'production'; // true or false

let pathsToClean = [
  'dist',
]

const extCSS = new MiniCssExtractPlugin({ // webpack4处理单独打包css文件
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: devMode ? '[name].css' : '[name].[hash].css',
  chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
})
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  minify: {
    collapseWhitespace: true
  },
  hash: true,
  chunks: ['app']
});
const contractPlugin = new HtmlWebpackPlugin({
  template: './src/contract.html',
  filename: 'contract.html',
  minify: {
    collapseWhitespace: true
  },
  hash: true,
  chunks: ['contract'] // 包含文件
})

module.exports = {
  entry: {
    app: './src/app.js',
    contract: './src/contract.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          devMode ? 'style-loader'
          : MiniCssExtractPlugin.loader,
          'css-loader?source-map',
          // 'postcss-loader',
          'sass-loader?source-map',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outpath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
        {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        },
      ],
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    htmlPlugin,
    contractPlugin,
    extCSS,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  devServer: {
    port: 9000,
    inline: true,
    open: true
  },
};