module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'].map(require.resolve),
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-styled-components',
  ].map(require.resolve),
}
