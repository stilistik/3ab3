const path = require('path');
const webpack = require('webpack');

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const createWebpackConfig = require('./webpack.utils');
const common = require('./webpack.common');

const { MEMBER_CLIENT_PORT } = process.env;

module.exports = createWebpackConfig(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: path.join(__dirname, './src'),
        use: [
          {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              forceIsolatedModules: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: MEMBER_CLIENT_PORT,
    host: '0.0.0.0',
    historyApiFallback: true,
    hotOnly: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new CheckerPlugin(),
  ],
});
