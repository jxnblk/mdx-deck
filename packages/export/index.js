const path = require('path')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const dev = require('mdx-deck/lib/dev')

module.exports = async opts => {
  const { outDir, outFile, port, width, height, sandbox } = opts

  console.log(width, height)
  const args = []
  if (!sandbox) {
    args.push('--no-sandbox', '--disable-setuid-sandbox')
  }

  const server = await dev(opts)

  const browser = await puppeteer.launch({ args })
  const page = await browser.newPage()
  const filename = path.join(outDir, outFile)
  mkdirp.sync(outDir)

  await page.goto(`http://localhost:${port}/print`, {
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
  await server.close()

  return filename
}
