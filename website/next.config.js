const webpack = require('webpack');

module.exports = {
  webpack: (cfg) => {
    cfg.plugins.push(
      new webpack.DefinePlugin({
        __API_HOST__: JSON.stringify(process.env.API_HOST),
        __API_PORT__: JSON.stringify(process.env.API_PORT),
      })
    );

    return cfg;
  },
};
