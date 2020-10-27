const path = require('path');
const webpack = require('webpack');

const { API_HOST, API_PORT } = process.env;

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        /**
          CSS/LESS MODULE LOADER FOR GENERAL PURPOSE
        */
        test: /\.(css|less)$/,
        exclude: path.resolve(__dirname, 'src/css/'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        /**
          CSS/LESS GLOBAL LOADER
          Loader for global imports, e.g. master less file
        */
        test: /\.(css|less)$/,
        include: path.resolve(__dirname, 'src/css/'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        /**
          FONT/FILE LOADER
        */
        test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'src/js/app'),
      Pages: path.resolve(__dirname, 'src/js/pages'),
      Auth: path.resolve(__dirname, 'src/js/auth/'),
      Components: path.resolve(__dirname, 'src/js/components/'),
      Graphql: path.resolve(__dirname, 'src/js/graphql'),
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      __API_HOST__: JSON.stringify(API_HOST),
      __API_PORT__: JSON.stringify(API_PORT),
    }),
  ],
};
