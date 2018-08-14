const path = require('path')
const puppeteer = require('puppeteer')

module.exports = async (opts) => {
  const {
    width = 876,
    height = 438,
    filename = 'card.png'
  } = opts
  const file = path.join(opts.outDir, filename)
  const browser = await puppeteer.launch()
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

  return file
}
