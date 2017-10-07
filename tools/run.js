const Promise = require('bluebird');

Promise.config({
    longStackTraces: true
});
process.on("unhandledRejection", function(reason, promise) {
    console.log(reason);
    // See Promise.onPossiblyUnhandledRejection for parameter documentation
});
require('babel-register').default({
    presets: ['stage-0', 'react'],
    plugins: ['dynamic-import-node', 'transform-es2015-modules-commonjs', 'transform-decorators-legacy', 'transform-class-properties', 'emotion'],
});
require('babel-polyfill');

if (!require('config').get('database.host')) {
    throw Error('Config file is not setting');
}

global.Promise = Promise;

require('../src/server');
