const path = require('path')
const puppeteer = require('puppeteer')
const execa = require('execa')
const mkdirp = require('mkdirp')

module.exports = async opts => {
  const { input, type, outDir, outFile, port, width, height, sandbox } = opts

  const args = []
  if (!sandbox) {
    args.push('--no-sandbox', '--disable-setuid-sandbox')
  }

  const server = execa('mdx-deck', [input, '--no-open', '--port', port], {
    stdio: 'inherit',
    preferLocal: true,
  })

  server.on('message', msg => {
    console.log('server', msg)
  })

  const browser = await puppeteer.launch({ args })
  const page = await browser.newPage()
  const filename = path.join(
    outDir,
    path.basename(outFile, path.extname(outFile)) + '.' + type
  )
  mkdirp.sync(outDir)

  /*
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
      loading = false
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
      loading = false
      break
  }

  await browser.close()
  */
  // await server.close()

  return new Promise((resolve, reject) => {
    ///
  })

  return filename
}
