import typescript from 'rollup-plugin-typescript2';
import postCSS from 'rollup-plugin-postcss';

import pkg from './package.json';

const deps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  external: (id) =>
    deps.some((dep) => dep === id || id.indexOf(`${dep}/`) === 0),

  plugins: [
    // nodeResolve({
    //   jsnext: true,
    //   main: true,
    //   browser: true,
    // }),
    // commonjs({
    //   include: './node_modules/**',
    // }),
    postCSS(),
    typescript(),
  ],
};
