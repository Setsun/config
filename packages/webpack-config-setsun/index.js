const webpack = require('webpack');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * The create function returns a full webpack configuration object.
 * 
 * @param {Object} config - The configuration options for webpack
 * @param {Object[]} config.rules - Additional rules for webpack
 * @param {Object[]} config.plugins - Additional plugins for webpack
 * @param {number} config.port - The port for webpack-dev-server
 * @param {Object} config.paths - The paths for certain folders that webpack watches / builds to
 * @param {string} config.paths.src - The folder for watching source files
 * @param {string} config.paths.dist - The folder for building distribution files to
 * @param {string} config.paths.cache - The folder for the webpack compilation cache
 * @param {string} config.paths.node_modules - The folder where node_modules are located
 */
const create = (config) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const rules = config.rules || [];
  const plugins = config.plugins || [];
  const port = config.port || 8888;

  const { entry, src, dist, cache, node_modules } = config.paths;

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
      rules: rules.concat([
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
              options: { hmr: !isProduction },
            },
            {
              loader: 'css-loader',
              options: { sourceMap: !isProduction },
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
      ]),
    },
    plugins: plugins.concat([
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
    ]).concat(
      !isProduction ? [new webpack.HotModuleReplacementPlugin()] : []
    ),
    devtool: 'cheap-module-source-map',
    devServer: {
      port: port,
      hot: true,
      inline: true,
      historyApiFallback: true,
    },
  };
};

module.exports = {
  create
};
