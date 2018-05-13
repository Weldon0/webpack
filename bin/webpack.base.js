const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkHash].js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: false,
            hash: process.env.NODE_ENV === 'production',
            excludeChunks: ['contract']
        }),
        new HtmlWebpackPlugin({
            template: './src/contract.html',
            filename: 'contract.html',
            minify: false,
            hash: process.env.NODE_ENV === 'production',
            chunks: ['contract']
        })
    ],
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
    }
}