const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack_common.config');

const { MEMBER_CLIENT_PORT } = process.env;

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '/public/'),
    port: 3001,
    host: '0.0.0.0',
    historyApiFallback: true,
    hotOnly: true,
  },
  devtool: 'eval-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEPLOYMENT_TARGET__: JSON.stringify('on-prem'),
      __CERTIFIED__: JSON.stringify(process.env.CERTIFIED === 'true'),
      __USE_COGNITO__: JSON.stringify(process.env.USE_COGNITO === 'true'),
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
  ],
});
