'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _react = _interopRequireWildcard(require('react'))

var _router = require('@reach/router')

var _gatsbyReactRouterScroll = require('gatsby-react-router-scroll')

var _navigation = require('./navigation')

var _apiRunnerBrowser = require('./api-runner-browser')

var _syncRequires = _interopRequireDefault(require('./sync-requires'))

var _pages = _interopRequireDefault(require('./pages.json'))

var _loader = _interopRequireDefault(require('./loader'))

var _jsonStore = _interopRequireDefault(require('./json-store'))

var _ensureResources = _interopRequireDefault(require('./ensure-resources'))

var _errorOverlayHandler = require('./error-overlay-handler')

if (window.__webpack_hot_middleware_reporter__ !== undefined) {
  const overlayErrorID = `webpack` // Report build errors

  window.__webpack_hot_middleware_reporter__.useCustomOverlay({
    showProblems(type, obj) {
      if (type !== `errors`) {
        ;(0, _errorOverlayHandler.clearError)(overlayErrorID)
        return
      }

      ;(0, _errorOverlayHandler.reportError)(overlayErrorID, obj[0])
    },

    clear() {
      ;(0, _errorOverlayHandler.clearError)(overlayErrorID)
    },
  })
}

;(0, _navigation.init)()

class RouteHandler extends _react.default.Component {
  render() {
    let location = this.props.location // check if page exists - in dev pages are sync loaded, it's safe to use
    // loader.getPage

    let page = _loader.default.getPage(location.pathname)

    if (page) {
      return _react.default.createElement(
        _ensureResources.default,
        {
          location: location,
        },
        locationAndPageResources =>
          _react.default.createElement(
            _navigation.RouteUpdates,
            {
              location: location,
            },
            _react.default.createElement(
              _gatsbyReactRouterScroll.ScrollContext,
              {
                location: location,
                shouldUpdateScroll: _navigation.shouldUpdateScroll,
              },
              _react.default.createElement(
                _jsonStore.default,
                (0, _extends2.default)(
                  {
                    pages: _pages.default,
                  },
                  this.props,
                  locationAndPageResources
                )
              )
            )
          )
      )
    } else {
      const dev404Page = _pages.default.find(p =>
        /^\/dev-404-page\/?$/.test(p.path)
      )

      const Dev404Page =
        _syncRequires.default.components[dev404Page.componentChunkName]

      if (!_loader.default.getPage(`/404.html`)) {
        return _react.default.createElement(
          _navigation.RouteUpdates,
          {
            location: location,
          },
          _react.default.createElement(
            Dev404Page,
            (0, _extends2.default)(
              {
                pages: _pages.default,
              },
              this.props
            )
          )
        )
      }

      return _react.default.createElement(
        _ensureResources.default,
        {
          location: location,
        },
        locationAndPageResources =>
          _react.default.createElement(
            _navigation.RouteUpdates,
            {
              location: location,
            },
            _react.default.createElement(
              Dev404Page,
              (0, _extends2.default)(
                {
                  pages: _pages.default,
                  custom404: _react.default.createElement(
                    _jsonStore.default,
                    (0, _extends2.default)(
                      {
                        pages: _pages.default,
                      },
                      this.props,
                      locationAndPageResources
                    )
                  ),
                },
                this.props
              )
            )
          )
      )
    }
  }
}

const Root = () =>
  (0, _react.createElement)(
    _router.Router,
    {
      basepath: __PATH_PREFIX__,
    },
    (0, _react.createElement)(RouteHandler, {
      path: `/*`,
    })
  ) // Let site, plugins wrap the site e.g. for Redux.

const WrappedRoot = (0, _apiRunnerBrowser.apiRunner)(
  `wrapRootElement`,
  {
    element: _react.default.createElement(Root, null),
  },
  _react.default.createElement(Root, null),
  ({ result, plugin }) => {
    return {
      element: result,
    }
  }
).pop()

var _default = () => WrappedRoot

exports.default = _default
