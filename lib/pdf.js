const path = require('path')
const puppeteer = require('puppeteer')

module.exports = async (opts = {}) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const {
    outDir,
    outFile,
    port,
    width = 1280,
    height = 960,
  } = opts
  const filename = path.join(outDir, outFile)

  await page.goto('http://localhost:' + port, {
    waitUntil: 'networkidle2'
  })

  await page.pdf({
    width,
    height,
    path: filename,
    scale: 1,
    printBackground: true
  })

  await browser.close()

  return filename
}
