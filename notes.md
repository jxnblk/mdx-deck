# notes

mdx-deck v2 prototype

todo:

- [ ] BUG: import/export statements in code blocks
- [ ] test with v1 demo deck & multiple elements per slide
- [ ] normalize slide styles with v1
- [ ] layouts
- [ ] presenter mode
  - [ ] timer/clock
  - [ ] open new tab button
  - [ ] look at google slides behavior
- [ ] overview highlighted state bug - MDXDeck doesn't render on link navigation
- [ ] docs for customizing any component
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
  - mdx-deck
  - @mdx-deck/components
  - @mdx-deck/layouts
  - @mdx-deck/themes

### Breaking

- Removed PDF export from core
- Removed default Provider component with dot indicator
- Removes react-syntax-highlighter
  - Syntax highlighting can now be completely controlled via themes
- Changes to print styles
- Removed Grid mode
- Removes static HTML export
- Refactored internal state and React context
  - If you've built a third-party component to work with MDX Deck, this will require a major version update

### Create Issues

- Slide transitions
  - Work with Reach Router
  - Should be added via themes
  - Minimal changes to core components
- v3 roadmap
