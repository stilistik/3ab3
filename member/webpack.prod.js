const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const createWebpackConfig = require('./webpack.utils');
const common = require('./webpack.common');

module.exports = createWebpackConfig(common, {
  mode: 'production',
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
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
});
