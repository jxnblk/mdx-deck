const path = require('path')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const dev = require('mdx-deck/lib/dev')
const findup = require('find-up')

module.exports = async opts => {
  const { type, outDir, outFile, port, width, height, sandbox } = opts

  const args = []
  if (!sandbox) {
    args.push('--no-sandbox', '--disable-setuid-sandbox')
  }

  if (opts.webpack) {
    opts.webpack = require(path.resolve(opts.webpack))
  } else {
    const webpackConfig = findup.sync('webpack.config.js', { cwd: opts.dirname })
    if (webpackConfig) opts.webpack = require(webpackConfig)
  }

  const server = await dev(opts)

  const browser = await puppeteer.launch({ args })
  const page = await browser.newPage()
  const filename = path.join(
    outDir,
    path.basename(outFile, path.extname(outFile)) + '.' + type
  )
  mkdirp.sync(outDir)

  switch (type) {
    case 'pdf':
      const url = `http://localhost:${port}/print`
      await page.goto(url, {
        waitUntil: 'networkidle2',
      })
      await page.pdf({
        width,
        height,
        path: filename,
        scale: 1,
        printBackground: true,
      })
      break
    case 'png':
      await page.setViewport({ width, height })
      await page.goto('http://localhost:' + port, {
        waitUntil: 'networkidle2',
      })
      await page.screenshot({
        path: filename,
        type: 'png',
        clip: {
          x: 0,
          y: 0,
          width,
          height,
        },
      })
      break
  }

  await browser.close()
  await server.close()

  return filename
}
