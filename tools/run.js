const Promise = require('bluebird');
const config = require('../babelrc');

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
