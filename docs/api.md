# API

The core `mdx-deck` package is a wrapper around the Gatsby CLI with the `gatsby-theme-mdx-deck` package.

## Components

- `Head`: Adds elements to the document `<head>`
- `Image`: A fullscreen background image layout component
- `Notes`: Adds speaker notes to a slide
- `Appear`: Steps through child elements one-by-one
- `Embed`: Embed MDX Deck slides in other React applications

See the [components docs](components.md) for more info.

## Layouts

- `Invert`: Inverts the foreground and background colors of the slide
- `Split`: Renders the first element on the left and other elements to the right
- `SplitRight`: Renders the first element on the right and other elements to the left
- `Horizontal`: Renders all child elements side-by-side
- `FullScreenCode`: Renders a single child code block fullscreen

See the [layouts docs](layouts.md) for more info.

## Hooks

### `useSteps`

The `useSteps` hook can be used to register custom components that rely on steps, similar to the Appear component.
It takes one argument for the total length of steps and returns the current step state.

```jsx
// example
import React from 'react'
import { useSteps } from 'mdx-deck'

export default props => {
  const length = 4
  const step = useSteps(length)

  return (
    <h2>
      The current step is {step}/{length}
    </h2>
  )
}
```

## `useDeck`

The `useDeck` returns the MDX Deck state.
This includes the following:

- `setState`
- `mode`
- `index`
- `length`
- `step`
- `metadata`
- `steps`
- `notes`
- `slug`

```jsx
// example
import React from 'react'
import { useDeck } from '@mdx-deck/components'

export default props => {
  const state = useDeck()

  return (
    <div>
      {props.children}
      <div>
        Slide {state.index + 1}/{state.length}
      </div>
    </div>
  )
}
```

