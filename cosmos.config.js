const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
  webpackConfigPath: './webpack.config',
  watchDirs: ['src/client'],
  webpack: (config) => {
    config.plugins.push(new HtmlWebpackPlugin());
    // config.plugins.push(new HtmlWebpackIncludeAssetsPlugin({
    //   assets: ['assets/style.css'],
    //   append: true,
    // }));
    return config;
  },
};
