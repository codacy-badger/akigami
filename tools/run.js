require('babel-register')({
    presets: ['stage-0', 'react'],
    plugins: ['dynamic-import-node', 'transform-es2015-modules-commonjs', 'transform-decorators-legacy'],
});
require('babel-polyfill');

require('../src/server');
