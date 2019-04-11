'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _react = _interopRequireDefault(require('react'))

var _reactDom = _interopRequireDefault(require('react-dom'))

var _domready = _interopRequireDefault(require('@mikaelkristiansson/domready'))

var _socketIo = _interopRequireDefault(require('./socketIo'))

var _emitter = _interopRequireDefault(require('./emitter'))

var _apiRunnerBrowser = require('./api-runner-browser')

var _loader = _interopRequireWildcard(require('./loader'))

var _syncRequires = _interopRequireDefault(require('./sync-requires'))

var _pages = _interopRequireDefault(require('./pages.json'))

window.___emitter = _emitter.default
;(0, _loader.setApiRunnerForLoader)(_apiRunnerBrowser.apiRunner) // Let the site/plugins run code very early.

;(0, _apiRunnerBrowser.apiRunnerAsync)(`onClientEntry`).then(() => {
  // Hook up the client to socket.io on server
  const socket = (0, _socketIo.default)()

  if (socket) {
    socket.on(`reload`, () => {
      window.location.reload()
    })
  }
  /**
   * Service Workers are persistent by nature. They stick around,
   * serving a cached version of the site if they aren't removed.
   * This is especially frustrating when you need to test the
   * production build on your local machine.
   *
   * Let's unregister the service workers in development, and tidy up a few errors.
   */

  if (supportsServiceWorkers(location, navigator)) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (
        var _iterator = registrations,
          _isArray = Array.isArray(_iterator),
          _i = 0,
          _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

      ) {
        var _ref

        if (_isArray) {
          if (_i >= _iterator.length) break
          _ref = _iterator[_i++]
        } else {
          _i = _iterator.next()
          if (_i.done) break
          _ref = _i.value
        }

        let registration = _ref
        registration.unregister()
      }
    })
  }

  const rootElement = document.getElementById(`___gatsby`)
  const renderer = (0, _apiRunnerBrowser.apiRunner)(
    `replaceHydrateFunction`,
    undefined,
    _reactDom.default.render
  )[0]

  _loader.default.addPagesArray(_pages.default)

  _loader.default.addDevRequires(_syncRequires.default)

  _loader.default.getResourcesForPathname(window.location.pathname).then(() => {
    const preferDefault = m => (m && m.default) || m

    let Root = preferDefault(require(`./root`))
    ;(0, _domready.default)(() => {
      renderer(_react.default.createElement(Root, null), rootElement, () => {
        ;(0, _loader.postInitialRenderWork)()
        ;(0, _apiRunnerBrowser.apiRunner)(`onInitialClientRender`)
      })
    })
  })
})

function supportsServiceWorkers(location, navigator) {
  if (location.hostname === `localhost` || location.protocol === `https:`) {
    return `serviceWorker` in navigator
  }

  return false
}
