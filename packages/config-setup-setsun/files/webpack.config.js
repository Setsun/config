const webpack = require('webpack');
const path = require('path');
const config = require('webpack-config-setsun');

const entry = 'index.tsx';
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const cache = path.resolve(__dirname, '.webpack-cache');
const node_modules = path.resolve(__dirname, 'node_modules');

module.exports = config.create({
  paths: {
    entry,
    src,
    dist,
    cache,
    node_modules,
  },
});
