require('babel-register')({
    presets: ['stage-0', 'react'],
    plugins: ['transform-es2015-modules-commonjs'],
});
require('babel-polyfill');

require('../src/server');
