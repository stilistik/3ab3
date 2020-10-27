const { DefinePlugin } = require('webpack');

function resolvePlugins(basePlugins = [], configPlugins = []) {
  const baseDefine = basePlugins.find((el) => el instanceof DefinePlugin);
  const configDefine = configPlugins.find((el) => el instanceof DefinePlugin);

  const restBase = basePlugins.filter((el) => !(el instanceof DefinePlugin));
  const restConfig = configPlugins.filter(
    (el) => !(el instanceof DefinePlugin)
  );

  const baseEnv = baseDefine ? baseDefine.definitions || {} : {};
  const configEnv = configDefine ? configDefine.definitions || {} : {};

  const mergedEnv = Object.assign({}, baseEnv, configEnv);

  return [new DefinePlugin(mergedEnv), ...restConfig, ...restBase];
}

function resolveModule(baseModule = {}, configModule = {}) {
  const configRules = configModule.rules || [];
  const baseRules = baseModule.rules || [];
  return { rules: [...configRules, ...baseRules] };
}

function createWebpackConfig(base, config) {
  return {
    ...base,
    ...config,
    module: resolveModule(base.module, config.module),
    plugins: resolvePlugins(base.plugins, config.plugins),
  };
}

module.exports = createWebpackConfig;
