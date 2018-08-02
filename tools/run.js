const Promise = require('bluebird');

Promise.config({
    longStackTraces: true,
});
process.on('unhandledRejection', (reason, promiseIgnored) => {
    console.log(reason);
    // See Promise.onPossiblyUnhandledRejection for parameter documentation
});
require('@babel/register').default({
    presets: [['@babel/preset-stage-0', {
        decoratorsLegacy: true,
    }], '@babel/preset-react'],
    plugins: ['dynamic-import-node', '@babel/plugin-transform-modules-commonjs', ['@babel/plugin-proposal-decorators', {
        legacy: true,
    }], ['@babel/plugin-proposal-class-properties', { loose: true }], 'emotion'],
});
require('@babel/polyfill');

if (!require('config').get('database.host')) {
    throw Error('Config file is not setting');
}

global.Promise = Promise;

require('../src/server');
