const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')

module.exports = async (opts) => {
  const {
    width = 1280,
    height = 720,
    outFile = 'card.png',
    sandbox = true
  } = opts
  const file = path.join(opts.outDir, outFile)

  if (!fs.existsSync(opts.outDir)) mkdirp.sync(opts.outDir)

  const browser = await puppeteer.launch({
    args: [
      !sandbox && '--no-sandbox'
    ].filter(Boolean)
  })
  const page = await browser.newPage()

  await page.setViewport({ width, height })

  await page.goto('http://localhost:' + opts.port, {
    waitUntil: 'networkidle2'
  })

  await page.screenshot({
    path: file,
    type: 'png',
    clip: {
      x: 0,
      y: 0,
      width,
      height,
    }
  })

  await browser.close()

  return outFile
}
