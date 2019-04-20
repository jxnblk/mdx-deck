const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

console.log('bundle analyzer')

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
}
