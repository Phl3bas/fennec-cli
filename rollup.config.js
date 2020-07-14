import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';

import pkg from './package.json';

const input = 'bin/index.ts';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'child_process',
  'fs',
  'path',
  'os',
  'https',
  'readline',
  'zlib',
  'events',
  'stream',
  'util',
  'buffer',
];

const plugins = [
  commonjs({ include: 'node_modules/**' }),
  globals(),
  json(),

  resolve({
    extensions,
  }),
  babel({ extensions, include: ['bin/**/*', 'commands/**/*', 'lib/**/*'] }),
];

const createConfig = (inpt, outpt, format) => {
  return {
    input: inpt,
    output: {
      file: outpt,
      format,
      sourcemap: true,
      strict: false,
      banner: '#! /usr/bin/env node\n',
    },
    plugins,
    external,
  };
};

export default [createConfig(input, pkg.main, 'cjs')];
