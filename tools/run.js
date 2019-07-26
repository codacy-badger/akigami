const Promise = require('bluebird');
const config = require('../babelrc');

config.plugins[0][1].values._CLIENT_ = false;
config.plugins[0][1].values._SERVER_ = true;

config.plugins.unshift('dynamic-import-node');
config.plugins.push('@babel/plugin-transform-modules-commonjs');

Promise.config({
  longStackTraces: true,
});
process.on('unhandledRejection', (reason, promiseIgnored) => {
  console.log(reason);
  // See Promise.onPossiblyUnhandledRejection for parameter documentation
});
require('@babel/register').default(config);
require('@babel/polyfill');

if (!require('config').get('database.host')) {
  throw Error('Config file is not setting');
}

global.Promise = Promise;

require('../src/server');
