const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const createWebpackConfig = require('./webpack.utils');
const common = require('./webpack.common');

module.exports = createWebpackConfig(common, {
  mode: 'development',
  module: {
    rules: [
      {
        /**
          TYPESCRIPT SOURCE LOADER
        */
        test: /\.ts(x?)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        /**
          JAVASCRIPT SOURCE LOADER
        */
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
  ],
});
