module.exports = {
  presets: [
    [
      '@babel/preset-stage-0',
      {
        decoratorsLegacy: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'dynamic-import-node',
    '@babel/plugin-transform-modules-commonjs',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'emotion',
  ],
};
