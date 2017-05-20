require('babel-register')({
    presets: ['stage-0', 'react'],
    plugins: ['transform-decorators-legacy'],
});
require('babel-polyfill');

require('./App');
