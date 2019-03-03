module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop',
  ].map(require.resolve),
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
  ].map(require.resolve),
}
