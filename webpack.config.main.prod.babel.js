import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import {dependencies} from './package.json';

export default merge.smart(baseConfig, {
  externals: [
    ...Object.keys(dependencies || {}),
    'electron-devtools-installer',
  ], // prevent error when building main

  mode: 'production',

  target: 'electron-main',

  entry: './src/main',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.prod.js',
  },

  node: {
    __dirname: false,
    __filename: false,
  },
});
