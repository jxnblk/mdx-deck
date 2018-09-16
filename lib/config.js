const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('mini-html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const merge = require('webpack-merge')
const chalk = require('chalk')
const remark = {
  emoji: require('remark-emoji'),
  unwrapImages: require('remark-unwrap-images')
}

const babel = {
  presets: [
    'babel-preset-env',
    'babel-preset-stage-0',
    'babel-preset-react',
  ].map(require.resolve),
  plugins: [
    'babel-plugin-styled-components'
  ].map(require.resolve)
}

const rules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: babel
  },
  {
    test: /\.js$/,
    exclude: path.resolve(__dirname, '../node_modules'),
    include: [
      path.resolve(__dirname, '..'),
    ],
    loader: require.resolve('babel-loader'),
    options: babel
  },
  {
    test: /\.mdx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: babel
      },
      {
        loader: require.resolve('./loader.js'),
        options: {
          mdPlugins: [
            remark.emoji,
            remark.unwrapImages
          ]
        }
      }
    ]
  }
]

const template = ({
  head = '<title>mdx-deck</title>',
  css = '',
  body = '',
  js,
  publicPath
}) => `<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>
<style>*{box-sizing:border-box}body{font-family:system-ui,sans-serif;margin:0}html,body{overflow:hidden}</style>
<meta name='generator' content='mdx-deck'>
${head}${css}
</head>
<body>
<div id=root>${body}</div>
${HTMLPlugin.generateJSReferences(js, publicPath)}
</body>
</html>
`

const baseConfig = {
  stats: 'errors-only',
  mode: 'development',
  module: {
    rules
  },
  resolve: {
    alias: {
      'mdx-deck': path.resolve(__dirname, '..')
    },
    modules: [
      path.relative(process.cwd(), path.join(__dirname, '../node_modules')),
      'node_modules'
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      width: '24',
      complete: '█',
      incomplete: chalk.gray('░'),
      format: [
        chalk.magenta('[mdx-deck] :bar'),
        chalk.magenta(':percent'),
        chalk.gray(':elapseds :msg'),
      ].join(' '),
      summary: false,
      customSummary: () => {},
    })
  ]
}

const createConfig = (opts = {}) => {
  const config = merge(baseConfig, opts.webpack)
  config.context = opts.dirname

  config.resolve.modules.push(
    opts.dirname,
    path.join(opts.dirname, 'node_modules')
  )

  config.entry = [
    path.join(__dirname, '../dist/entry.js')
  ]

  const defs = Object.assign({}, opts.globals, {
    OPTIONS: JSON.stringify(opts),
    HOT_PORT: JSON.stringify(opts.hotPort),
    HOT_HOST: JSON.stringify(opts.host)
  })

  config.plugins.push(
    new webpack.DefinePlugin(defs),
    new HTMLPlugin({ template, context: opts })
  )

  if (config.resolve.alias) {
    const hotAlias = config.resolve.alias['webpack-hot-client/client']
    if (!fs.existsSync(hotAlias)) {
      const hotPath = path.dirname(require.resolve('webpack-hot-client/client'))
      config.resolve.alias['webpack-hot-client/client'] = hotPath
    }
  }

  return config
}

module.exports = createConfig
