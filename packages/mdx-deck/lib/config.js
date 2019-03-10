const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
const chalk = require('chalk')
const remark = {
  emoji: require('remark-emoji'),
  unwrapImages: require('remark-unwrap-images'),
}
const HTMLPlugin = require('@mdx-deck/webpack-html-plugin')
const babel = require('../babel.config')

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: babel,
  },
  {
    test: /\.js$/,
    exclude: path.resolve(__dirname, '../node_modules'),
    include: [path.resolve(__dirname, '..'), /mdx-deck/],
    loader: require.resolve('babel-loader'),
    options: babel,
  },
  {
    test: /\.mdx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: babel,
      },
      {
        loader: require.resolve('@mdx-deck/loader'),
        options: {
          mdPlugins: [remark.emoji, remark.unwrapImages],
        },
      },
    ],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'].map(require.resolve),
  },
]

const baseConfig = {
  stats: 'errors-only',
  mode: 'development',
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'mdx-deck': path.resolve(__dirname, '..'),
      'webpack-hot-middleware/client': path.resolve(
        require.resolve('webpack-hot-middleware/client')
      ),
    },
    modules: [
      path.relative(process.cwd(), path.join(__dirname, '../node_modules')),
      'node_modules',
    ],
  },
  plugins: [
    new WebpackBar({
      name: '[mdx-deck]',
    }),
    new FriendlyErrorsPlugin(),
  ],
}

const createConfig = (opts = {}) => {
  const config = merge(baseConfig, opts.webpack)
  config.context = opts.dirname

  config.resolve.modules.push(
    opts.dirname,
    path.join(opts.dirname, 'node_modules')
  )

  config.entry = [path.join(__dirname, './entry.js')]

  const defs = Object.assign({}, opts.globals, {
    OPTIONS: JSON.stringify(opts),
    HOT_PORT: JSON.stringify(opts.hotPort),
    HOT_HOST: JSON.stringify(opts.host),
  })

  config.plugins.push(
    new webpack.DefinePlugin(defs),
    new HTMLPlugin({ context: opts })
  )

  return config
}

module.exports = createConfig
