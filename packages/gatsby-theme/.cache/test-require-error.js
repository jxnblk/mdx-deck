'use strict'

exports.__esModule = true
exports.default = void 0

// This module is also copied into the .cache directory some modules copied there
// from cache-dir can also use this module.
var _default = (moduleName, err) => {
  const regex = new RegExp(
    `Error: Cannot find module\\s.${moduleName.replace(
      /[-/\\^$*+?.()|[\]{}]/g,
      `\\$&`
    )}`
  )
  const firstLine = err.toString().split(`\n`)[0]
  return regex.test(firstLine)
}

exports.default = _default
//# sourceMappingURL=test-require-error.js.map
