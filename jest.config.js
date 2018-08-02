module.exports = {
  testEnvironment: 'node',
  verbose: true,
  cacheDirectory: './node_modules/.cache/jest',
  transform: {
    '.*$': './tools/jestPreprocess.js',
  },
};
