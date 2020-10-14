const path = require('path');

module.exports = {
  entry: './src/index.js',
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
      History: path.resolve(__dirname, 'src/js/history/'),
      Graphql: path.resolve(__dirname, 'src/js/graphql'),
      Style: path.resolve(__dirname, 'src/js/style'),
    },
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[hash].[name].bundle.js',
    publicPath: '/',
  },
};
