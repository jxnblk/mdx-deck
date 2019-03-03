# notes

mdx-deck v2 prototype

todo:

- [ ] WIP PR
- [ ] Publish beta
- [ ] Add issues

- [ ] presenter mode
  - [ ] timer/clock
  - [ ] open new tab button
- [ ] overview highlighted state bug - MDXDeck doesn't render on link navigation
- [ ] docs for customizing any component

- [x] set url query
- [x] BUG: import/export statements in code blocks
- [x] mdx-plugin: fix markdown table whitespace warnings
- [x] test with v1 demo deck & multiple elements per slide
- [-] normalize slide styles with v1
- [x] layouts
- [x] overview mode
- [x] Code (to be handled with theming)
- [x] keyboard shortcuts
- [x] print route
- [x] composable themes
- [x] URL params
- [x] localStorage
- [x] Emotion
- [x] Head
- [x] Image
- [x] Notes
- [x] Appear
- [x] history api fallback
- [x] mdx components
- [x] themes
- [x] swipeable

extras

- [ ] hooks
- [ ] docs for syntax highlighting
- [ ] PDF export?
- [ ] dots??

## v2

- Virtually no breaking changes to decks created with MDX Deck v1
- Uses Reach Router
- Composable themes
- Refactored internal MDX parsing for better interoperability
- Split functionality into separate npm packages
  - `mdx-deck`
  - `@mdx-deck/components`
  - `@mdx-deck/layouts`
  - `@mdx-deck/themes`
  - `@mdx-deck/loader`
  - `@mdx-deck/webpack-html-plugin`
  - `@mdx-deck/mdx-plugin`
- Simplified theming and base styles

### Breaking

- Removed PDF export from core
- Removed default Provider component with dot indicator
- Removes react-syntax-highlighter from the core
  - Syntax highlighting can now be completely controlled via themes
- Changes to print styles
- Removed Grid mode
- Removes static HTML export
- Refactored internal state and React context
  - If you've built a third-party component to work with MDX Deck, this will require a major version update
- `---` placed directly below a line of text is now recognized as a markdown heading and will not split into a new slide. To separate slides, ensure there is an empty line above and below the `---`
- `colors.pre`, `colors.preBackground`, `colors.code`
- The `notes` language attribute in fenced code blocks is no longer supported. Use the `<Notes />` component instead

### Create Issues

- Slide transitions
  - Work with Reach Router
  - Should be added via themes
  - Minimal changes to core components
- v3 roadmap
