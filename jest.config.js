module.exports = {
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '.*$': './tools/jestPreprocess.js',
  },
};
