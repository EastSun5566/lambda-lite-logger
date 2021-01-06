import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import {
  main,
  module,
  browser,
  name,
} from './package.json';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/index.ts',
  output: [
    { file: main, format: 'cjs' },
    { file: module, format: 'es' },
    { name, file: browser, format: 'umd' },
  ],
  plugins: [
    nodeResolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      presets: ['@babel/preset-env', '@babel/typescript'],
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
};
