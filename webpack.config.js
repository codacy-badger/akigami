const webpack = require('webpack');
const path = require('path');
const config = require('config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babelrc');

const host = config.get('server.host');
const port = config.get('server.port');

const paths = {
  source: path.join(__dirname, './src', 'client'),
  build: path.join(__dirname, './public'),
};

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = () => {
  const nodeEnv = config.get('enviroment');
  const isProd = nodeEnv === 'production';

  const plugins = [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
    new MiniCssExtractPlugin({ filename: 'assets/style.css' }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: process.cwd(), // or the same value as `context`
      },
    }),
  ];

  if (!isProd) {
    plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    );
  }

  const entryPoint = './index.js';

  return {
    mode: nodeEnv,
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'modules',
            chunks: 'all',
          },
        },
      },
    },
    performance: false,
    devtool: isProd ? 'source-map' : 'cheap-source-map',
    context: paths.source,
    entry: {
      main: entryPoint,
    },
    output: {
      path: paths.build,
      publicPath: '/',
      filename: 'assets/app.js',
      chunkFilename: 'assets/[name].chunk.js',
    },
    node: { Buffer: false },
    module: {
      rules: [
        {
          test: /\.(html|svg|jpe?g|png|ttf|eot|woff2?)(\?.+)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'static/[name]-[hash:8].[ext]',
            },
          },
        },
        {
          test: /\.css$/,
          exclude: [/node_modules/, /emotion\.css$/],
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: loader => {
                  const cfg = [
                    require('postcss-import')({
                      addDependencyTo: loader,
                      path: [
                        path.join(__dirname, 'src', 'common'),
                        path.join(__dirname, 'node_modules'),
                      ],
                      root: loader.resourcePath,
                    }),
                    require('postcss-simple-vars')(),
                    require('postcss-color-function')(),
                    require('postcss-nested')(),
                    require('autoprefixer')(),
                  ];
                  if (isProd) {
                    cfg.push(require('cssnano')());
                  }
                  return cfg;
                },
              },
            },
          ],
        },
        {
          test: /emotion\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: loader => {
                  const cfg = [
                    require('postcss-import')({
                      addDependencyTo: loader,
                      path: [
                        path.join(__dirname, 'src', 'common'),
                        path.join(__dirname, 'node_modules'),
                      ],
                      root: loader.resourcePath,
                    }),
                    require('postcss-simple-vars')(),
                    require('postcss-color-function')(),
                    require('postcss-nested')(),
                    require('autoprefixer')(),
                  ];
                  if (isProd) {
                    cfg.push(require('cssnano')());
                  }
                  return cfg;
                },
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules'), paths.source],
    },

    plugins,

    // performance: isProd && {
    //   maxAssetSize: 300000,
    //   maxEntrypointSize: 300000,
    //   hints: 'warning',
    // },

    stats,

    devServer: {
      contentBase: './src/client',
      publicPath: '/',
      historyApiFallback: true,
      port,
      host,
      compress: isProd,
      stats,
    },
  };
};
