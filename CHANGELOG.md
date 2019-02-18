
# Changelog

## Unreleased

## v1.8.2 2018-12-04

- Bugfix for window check

## v1.8.1 2018-11-27

- Show Appear children in PDF export

## v1.8.0 2018-11-27

- Adds button to open new window for presenting in presenter mode

## v1.7.14 2018-11-18

- Fix typo in SlideDeck

## v1.7.13 2018-11-18

- Add overflow auto to FullScreenCode

## v1.7.12 2018-11-18

- Keep styles intact for Appear children
- Fix prop types for Appear component
- Add missing CLI option to docs

## v1.7.11 2018-11-18

- Update remark-unwrap-images

## v1.7.10 2018-11-12

- Update dependencies

## v1.7.9 2018-11-12

- Update dependencies

## v1.7.8 2018-11-12

- Fix typo in Root prop types
- Edit docs

## v1.7.7 2018-09-22

- Remove overflow hidden styles from body
- Adds prettier

## v1.7.6 2018-09-22

- Changes styles to use `translate3d`
- Add support for page up and page down keys

## v1.7.5 2018-09-22

- Add `Horizontal` layout component

## v1.7.4 2018-09-15

- Add `--host` option

## v1.7.3 2018-09-05

- Fix swipe direction on touchscreens

## v1.7.1 2018-08-30

- Fix for localStorage updater

## v1.7.0 2018-08-29

- Adds support for stepping through Appear component with left and right arrows #144
- Refactor internal context

## v1.6.9 2018-08-27

- Adds support for custom webpack configs #136

## v1.6.8 2018-08-27

- Fixes `build` when using Notes or Appear components #138
- Fixes slide number in presenter mode #142

## v1.6.7 2018-08-25

- Use `mkdirp` for build and export
- Adds ability to change slide transition timing function and duration via themes

## v1.6.6 2018-08-25

- Left align text in code blocks #130
- Extract static CSS on build #129
- Adds `--no-html` option for client-side only builds

## v1.6.5 2018-08-25

- Adjust slide number in overview mode #122

## v1.6.4 2018-08-18

- Add respository field to package.json #117
- Remove trailing comma in function arguments #115

## v1.6.3 2018-08-16

- Disable swiping with mouse #113

## v1.6.2 2018-08-15

- Adjust import/export parsing in loader #110

## v1.6.1 2018-08-15

- Add missing `babel-core` dependency

## v1.6.0 2018-08-14

- Adds `Head` component for setting document head
- Adds screenshot command to create a screenshot of the first slide
- Removes the `--title` option in favor of using the `Head` component

## v1.5.15 2018-08-11

- Adds swipe gesture support for touchscreen devices
- Fixes URL bug when initializing mode
- Fixes bug previous/next buttons are not rendered
- Prevents last slide from cycling back to the beginning

## v1.5.14 2018-08-10

- Adds `size` prop to Image component

## v1.5.13 2018-08-10

- Fixes an issue where speaker notes would incorrectly show on the wrong slide

## v1.5.12 2018-08-10

- Add FullScreenCode layout component

## v1.5.11 2018-08-10

- Adjust querystring updater to fix mode showing as undefined

## v1.5.10 2018-08-05

- Update overview mode styles
- Add grid view mode
- Update docs

## v1.5.9 2018-08-05

- Update docs

## v1.5.8 2018-08-05

- Add support for `components` and `Provider` in themes

## v1.5.7 2018-08-05

- Add more built-in themes

## v1.5.6 2018-08-05

- Add invisible buttons to left and right for use on mobile devices

## v1.5.5 2018-08-05

- Update docs

## v1.5.4 2018-08-04

- Add docs for syntax highlighting

## v1.5.3 2018-08-04

- Add overview mode to see multiple slides at once
- Add default layouts for inverting colors and creating a split layout slide

## v1.5.2 2018-08-04

- Add default styles for tables

## v1.5.1 2018-08-04

- Use remark-unwrap-images plugin

## v1.5.0 2018-08-04

- Add syntax highlighting option for fenced code blocks

## v1.4.4 2018-08-04

- Fix for how Appear children display on slide change

## v1.4.3 2018-08-04

- Update build setup for smaller package
- Adjust keyboard shortcuts

## v1.4.2 2018-08-03

- Update ok-cli for better HTML output

## v1.4.1 2018-08-03

- Update docs
- Add `yellow` theme

## v1.4.0 2018-08-03

- Adds Appear component
- Adds propTypes to components
- Update README

## v1.3.2 2018-08-02

- Remove default `target="_blank"` from links
- Move custom Provider component into app

## v1.3.1 2018-08-02

- Add speaker notes markdown syntax and component

## v1.3.0 2018-08-02

- Add presenter mode with preview of next slide and timer

## v1.2.3 2018-08-01

- Fix `history.pushState` hash

## v1.2.2 2018-07-31

- Update dev server for static file server

## v1.2.1 2018-07-31

- Merge custom components with defaults

## v1.2.0 2018-07-31

- Add PDF export to CLI

## v1.1.3 2018-07-31

- Add emoji support
- Update `.npmignore`

## v1.1.2 2018-07-31

- Fix `--no-open` option
- Add ability to ignore key events
- Normalize newlines for cross-platform compatibility

## v1.1.1 2018-07-31

- Fix for supporting markdown tables

## v1.1.0 2018-07-30

- Updated styles and theming
- Updated docs

## v1.0.3 2018-07-29

- Updated docs

## v1.0.2 2018-07-29

- Add hashchange listeners

## v1.0.1 2018-07-29

- Fix for `--out-dir` CLI flag

## v1.0.0 2018-07-29

Initial release
