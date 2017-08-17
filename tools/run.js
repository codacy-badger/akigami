const Promise = require('bluebird');

require('babel-register').default({
    presets: ['stage-0', 'react'],
    plugins: ['dynamic-import-node', 'transform-es2015-modules-commonjs', 'transform-decorators-legacy'],
});
require('babel-polyfill');

if (!require('config').get('database.host')) {
    throw Error('Config file is not setting');
}

global.Promise = Promise;

require('../src/server');
