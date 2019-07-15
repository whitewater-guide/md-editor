module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');

  const cssRules = config.module.rules.find(
    (m) => m.use[0] === require.resolve('style-loader'),
  );
  const cssLoader = cssRules.use.find(
    (m) => m.loader === require.resolve('css-loader'),
  );
  cssLoader.options = { ...cssLoader.options, modules: true };
  return config;
};
