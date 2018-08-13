import typescript from 'rollup-plugin-typescript2';
import embedCSS from 'rollup-plugin-embed-css';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.devDependencies || {}),
  ],

  plugins: [
    peerDepsExternal(),
    embedCSS(),
    typescript({
      typescript: require('typescript'),
    }),
  ],
}
