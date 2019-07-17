const path = require('path')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')

module.exports = async ({ url, outFile, width, height, sandbox }) => {
  if (!url) {
    throw new Error('URL is required for website-pdf')
  }

  const args = []
  if (!sandbox) {
    args.push('--no-sandbox', '--disable-setuid-sandbox')
  }

  const browser = await puppeteer.launch({ args })
  const page = await browser.newPage()
  const filename = path.resolve(outFile)
  const outDir = path.dirname(filename)
  mkdirp.sync(outDir)

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

  await browser.close()

  return filename
}
