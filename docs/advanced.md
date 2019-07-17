# Advanced Usage

## Custom Provider component

A custom Provider component is useful for adding custom context providers in React or adding persistent UI elements to the entire deck.
To define a custom Provider component, you'll need to import it and add it as the `Provider` key in your theme.

```js
// example theme.js
import Provider from './Provider'

export default {
  fonts: {
    body: 'Georgia, serif',
  },
  Provider,
}
```

Use the `useDeck` hook to get the presentation state in your custom `Provider` component.

```js
// example Provider.js
import React from 'react'
import { useDeck } from 'mdx-deck'

export default props => {
  const state = useDeck()

  return (
    <div>
      {props.children}
    </div>
  )
}
```
