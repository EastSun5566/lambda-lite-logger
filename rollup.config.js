import { DEFAULT_EXTENSIONS } from '@babel/core';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { nodeResolve, DEFAULTS } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import {
  main,
  module,
  browser,
  name,
} from './package.json';

/**
 * @param {string} str
 */
const camalize = (str) => str
  .toLowerCase()
  .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: module,
      format: 'es',
      sourcemap: true,
    },
    {
      name: camalize(name),
      file: browser,
      format: 'umd',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    nodePolyfills(),
    nodeResolve({ extensions: [...DEFAULTS.extensions, '.ts'] }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      presets: ['@babel/env', '@babel/typescript'],
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
};

export default config;
