require('babel-register')({
    presets: ['stage-0', 'react'],
});
require('babel-polyfill');

require('./App');
