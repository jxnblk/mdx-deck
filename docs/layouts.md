# Layouts

Each slide can include a custom layout around its content.
This can be used as a substitute for slide templates found in other presentation apps and libraries.

```js
// example Layout.js
import React from 'react'

export default ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vw',
      backgroundColor: 'tomato',
    }}
  >
    {children}
  </div>
)
```

```mdx
import Layout from './Layout'

# No Layout

---

<Layout>

# Custom Layout

</Layout>
```

The layout component will wrap the MDX elements within that slide,
which means you can use a nested ThemeProvider or target elements with CSS-in-JS.

**NOTE:** The newlines around child content in the layout component is **required** to use markdown syntax in a layout. Otherwise the content will be parsed as raw text.

## Built-in Layouts

mdx-deck includes a few built-in layouts for common slide variations.

See the [Components docs](components.md#layouts) for more.
