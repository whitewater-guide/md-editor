module.exports = (baseConfig, env, config) => {
  config.resolve.extensions = ['.mjs', '.ts', '.tsx', ...config.resolve.extensions];
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve("awesome-typescript-loader")
    },
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    },
  ];
  const cssRules = config.module.rules.find((m) => m.use[0] === require.resolve('style-loader'));
  const cssLoader = cssRules.use.find((m) => m.loader === require.resolve('css-loader'));
  cssLoader.options = { ...cssLoader.options, modules: true };
  return config;
};
