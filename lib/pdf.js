
const puppeteer = require('puppeteer');

module.exports = async (opts = {}) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:' + opts.port, {
    waitUntil: 'networkidle2'
  })

  await page.pdf({
    path: opts.outFile,
    scale: 1,
    width: 1280,
    height: 960,
    printBackground: true
  })

  await browser.close()

  return opts.outFile
}
