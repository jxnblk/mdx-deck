
# mdx-deck

[MDX][]-based presention decks

**Beta**

```sh
npm i mdx-deck
```

````mdx
# This is the title of my deck
---
# About Me
---
```jsx
<CodeSnippet />
```
---
import Demo from './components/Demo'

<Demo />
---
# The end
````

```sh
mdx-deck deck.mdx
```

## Usage

Create an [MDX][] file and separate each slide with `---`.
MDX can use Markdown syntax and render React components with JSX.

### Imports

To import components, use ES import syntax separated with empty lines from any markdown or JSX syntax.

```mdx
import { Box } from 'grid-styled'

<Box color='tomato'>
  Hello
</Box>
```

### Theming

A custom theme can be provided by exporting `theme` from the MDX file.

```mdx
export { default as theme } from './theme'

# Hello
```

The theme should be an object based on [styled-system][]'s theme schema.

```js
// example theme.js
export default {
  font: 'Menlo, monospace',
  fontSizes: [
    16, 24, 32, 48, 64, 96, 128
  ],
  colors: {
    text: '#f0f',
    background: '#000',
    link: '#0ff'
  },
  css: {
    // apply any styles to the root element
  }
}
```

### Custom Components

mdx-deck includes default components for MDX, but to provide custom components to the [MDXProvider][], export a `components` object from your MDX file.

```mdx
export { default as components } from './components'

# Custom Components
```

### Layouts

Each slide can include a custom layout around its content.

```mdx
import Layout from './Layout'

# No Layout

---
export default Layout

# Custom Layout
```

## Exporting

TK

---

- [ ] add default themes
- [ ] theme docs
- [ ] exporting docs
- [ ] components docs
- [ ] Provider docs
- [x] Full Image component
- [x] Root provider
- [x] default styles
- [x] export build
- [x] URL hash

[MDX]: https://github.com/mdx-js/mdx
[MDXProvider]: https://github.com/mdx-js/mdx#mdxprovider
[styled-system]: https://github.com/jxnblk/styled-system
[styled-components]: https://github.com/styled-components/styled-components
