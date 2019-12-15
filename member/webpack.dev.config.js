const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
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
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
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
      Routes: path.resolve(__dirname, 'src/js/routes/'),
      History: path.resolve(__dirname, 'src/js/history/'),
      Redux: path.resolve(__dirname, 'src/js/redux'),
      Apollo: path.resolve(__dirname, 'src/js/apollo'),
      Style: path.resolve(__dirname, 'src/js/style'),
      Utils: path.resolve(__dirname, 'src/js/utils'),
    },
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    host: '0.0.0.0',
    publicPath: 'http://localhost:3000/dist/',
    historyApiFallback: true,
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
