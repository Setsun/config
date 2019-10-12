const webpack = require('webpack');
const path = require('path');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const src = path.resolve(__dirname, 'src');
const node_modules = path.resolve(__dirname, 'node_modules');
const dist = path.resolve(__dirname, 'dist');
const cache = path.resolve(__dirname, '.webpack-cache');

const isProduction = process.env.NODE_ENV === 'production';

const create = ({
  entry = 'index.tsx',
  src = src,
  dist = dist,
  cache = cache,
  rules = [],
  plugins = [],
}) => {
  const rules = rules || [];
  const plugins = plugins || [];

  return {
    entry,
    context: src,
    target: 'web',
    mode: isProduction ? 'production' : 'development',
    output: {
      path: dist,
      filename: '[name]-[hash].js',
      chunkFilename: '[id].[hash].bundle.js',
      publicPath: '/',
    },
    resolve: {
      modules: [node_modules, src],
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      splitChunks: {
        chunks: 'all',
      },
    },
    module: {
      rules: [
        {
          test: /\.(j|t)s(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: cache,
              },
            },
            {
              loader: 'thread-loader',
              options: {
                workers: Math.ceil(os.cpus() / 2),
                workerParallelJobs: 50,
                workerNodeArgs: ['--max-old-space-size=4096'],
              },
            },
            { loader: 'babel-loader' }
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV !== 'production',
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: process.env.NODE_ENV !== 'production',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 2048,
              },
            },
          ],
        },
        ...(rules ? rules : [])
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      ...(plugins ? plugins : [])
    ],
    devtool: 'cheap-module-source-map',
    devServer: {
      port: 8888,
      hot: true,
      inline: true,
      historyApiFallback: true,
    },
  };
};

module.exports = {
  create
};
