# Advanced Usage

## Custom MDX components

MDX Deck includes default components for MDX, but to provide custom components to the [MDXProvider][], add a `components` object to the `theme`.

```js
// example theme
import Heading from './Heading'

export default {
  components: {
    h1: Heading,
  },
}
```

See the [MDX][] docs for more or take a look
at the [default set of components](../packages/components/src/mdx-components.js) as a reference.

## Custom Provider component

A custom Provider component is useful for adding custom context providers in React or adding persistent UI elements to the entire deck.

To define a custom Provider component, you'll need to import it into your custom theme and set it using the key `Provider` like shown below:

```js
// example theme.js
import Provider from './Provider'

export default {
  font: 'Georgia, serif',
  Provider,
}
```

A custom Provider component will receive the application's state as props,
which can be used to show custom page numbers or add other elements to the UI.

#### Props

- `slides`: (array) the components for each slide
- `index`: (number) the current slide index
- `mode`: (string) the current mode (one of `'normal'`, `'presenter'`, or `'overview'`)
- `step`: (number) the current visible step in an Appear or Step component
- Each slide includes a `meta` object with a `notes` field when the Notes component is used within a slide

#### Example

The example below will display the current slide out of the total amount of slides.

```js
// Example Provider.js
import React from 'react'

function AtTheBottomCenter ({ children }) {
  const css = {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    color: #ffffff;
    textAlign: 'center',
  }

  return <div css={css}>
    {children}
  </div>
}

export function Provider ({ children, ...props }) {
  return <>
    {children}
    <AtTheBottomCenter>{props.index}/{props.slides.length}</AtTheBottomCenter>
  </>
}
```

## Combining multiple mdx files

Unlike the official `@mdx-js/loader`,
the `@mdx-deck/loader` exports an additional `slides` array of components instead of just the entire document.
Multiple MDX files can be combined into a single presentation if the filesize is getting difficult to manage.

First create a couple `.mdx` files like any other MDX Deck file, with `---` to separate the different slides.

```mdx
# one.mdx

---

This is the first file
```

```mdx
# two.mdx

---

This is the second file
```

Next, create a `.js` file to import and combine the two `.mdx` files.

```js
// deck.js
// if you want to include a theme, you would export here:
// export { dark as theme } from 'mdx-deck/themes';

import { slides as one } from './one.mdx'
import { slides as two } from './two.mdx'

export const slides = [...one, ...two]
```

Then, point the MDX Deck CLI comment in your `package.json` to the `deck.js` file.

```json
"scripts": {
  "start": "mdx-deck deck.js"
}
```

## Custom Components

To build custom components that hook into internal MDX Deck state, you might want to use the following APIs:

- [useSteps](api.md#usesteps-hook)
- [useDeck](api.md#usedeck-hook)

[mdx]: https://mdxjs.com
[mdxprovider]: https://github.com/mdx-js/mdx/blob/master/docs/getting-started/index.md#mdxprovider
