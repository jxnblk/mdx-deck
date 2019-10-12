const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')

function updatePackageJson(cwd) {
  const pkg = require(`${cwd}/package.json`)

  pkg.private = true

  delete pkg.devDependencies['mdx-deck']

  pkg.dependencies = pkg.dependencies || {}
  pkg.dependencies['gatsby'] = '^2.13.25'
  pkg.dependencies['gatsby-theme-mdx-deck'] = '^3.0.13'
  pkg.dependencies['react'] = '^16.8.6'
  pkg.dependencies['react-dom'] = '^16.8.6'

  pkg.scripts = pkg.scripts || {}
  for (let i in pkg.scripts) {
    if (/\bmdx-deck\b/.test(pkg.scripts[i])) {
      delete pkg.scripts[i]
    }
  }
  pkg.scripts.start = 'gatsby develop'
  pkg.scripts.clean = 'gatsby clean'
  pkg.scripts.build = 'gatsby build'

  fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(pkg, null, 2))
}

function createGatsbyConfig(cwd) {
  const config = {
    plugins: ['gatsby-theme-mdx-deck'],
  }
  const contents = `module.exports = ${JSON.stringify(config, null, 2)}`

  fs.writeFileSync(path.join(cwd, 'gatsby-config.js'), contents)
}

function moveDeck(cwd, file) {
  const filename = path.basename(file)
  fs.moveSync(filename, path.join(cwd, 'decks', filename))
}

async function runNpmInstall(cwd) {
  process.chdir(cwd)
  await execa('npm', ['install'], { stdout: 'inherit', stderr: 'inherit' })
}

module.exports = async ({ cwd, file }) => {
  updatePackageJson(cwd)
  createGatsbyConfig(cwd)
  moveDeck(cwd, file)
  await runNpmInstall(cwd)
}
