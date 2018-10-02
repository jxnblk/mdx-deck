const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')

module.exports = async (opts = {}) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // This can be used to control some UI components's visibility like: Appear,...
  page.setUserAgent('MDX-Deck/1.7.7 Print/PDF')

  const {
    outDir,
    outFile = 'presentation.pdf',
    port,
    width = 1280,
    height = 960,
  } = opts
  const filename = path.join(outDir, outFile)
  if (!fs.existsSync(outDir)) mkdirp.sync(outDir)

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
