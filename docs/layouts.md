# Layouts

Each slide can include a custom layout around its content.
This is a way to provide *templates* for certain slides.

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

MDX Deck includes a few built-in layouts for common slide variations.

### Invert

Inverts the foreground and background colors from the theme.

```mdx
import { Invert } from 'mdx-deck'

# Normal

---

<Invert>

# Inverted

</Invert>
```

### Split

Creates a horizontal layout with the first child on the left and all other children on the right.

```mdx
import { Split } from 'mdx-deck'

<Split>

![](kitten.png)

## Meow

</Split>
```

### SplitRight

Same as the Split component, but renders the first child on the right.

```mdx
import { SplitRight } from 'mdx-deck'

<SplitRight>

![](kitten.png)

## Meow

</SplitRight>
```

### Horizontal

Similar to the Split components, but renders all children side-by-side

### FullScreenCode

Renders code blocks fullscreen.

````mdx
import { FullScreenCode } from 'mdx-deck'

<FullScreenCode>

```jsx
<Button>Beep</Button>
```

</FullScreenCode>
````

