const webpack = require('webpack');

module.exports = {
  webpack: (cfg) => {
    cfg.plugins.push(
      new webpack.DefinePlugin({
        __API_HOST__: JSON.stringify(process.env.API_HOST),
        __API_PORT__: JSON.stringify(process.env.API_PORT),
        __GOOGLE_MAPS_API_KEY__: JSON.stringify(
          process.env.GOOGLE_MAPS_API_KEY
        ),
        __RECAPTCHA_PUBLIC_KEY__: JSON.stringify(
          process.env.RECAPTCHA_PUBLIC_KEY
        ),
      })
    );

    return cfg;
  },
};
