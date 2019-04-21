# API

MDX Deck consists of several different packages. The core `mdx-deck` package includes the CLI, `@mdx-deck/components`,
`@mdx-deck/themes`, and `@mdx-deck/layouts`.

## Components

See the [components docs](components.md) for details.

- `MDXDeck`
- `MDXDeckState`
- `Head`
- `Image`
- `Notes`
- `Steps`
- `Appear`
- `Slide`
- `Zoom`
- `Embed`

## Layouts

See the [layouts docs](layouts.md) for details.

- `Invert`
- `Split`
- `SplitRight`
- `FullScreenCode`
- `Horizontal`

## Themes

See the [themes](themes.md) & [theming](theming.md) docs for details.

## Context

MDX Deck uses a stateful React context for each slide.
Use the context APIs with caution as they are less stable than the end-user MDX Deck API.

- `metadata` (object) object for storing slide metadata such as speaker notes and step count
- `step` (number) the current step index
- `mode` (string) the current application mode
- `modes` (object) object of application modes
- `update` (function) updates application state
- `register` (function) registers slide metadata
- `index` (number) the current slide index
- `goto` (function) function to navigate to a specific slide
- `previous` (function) navigate to the previous slide or step
- `next` (function) navigate to the next slide or step

## `useSteps` Hook

The `useSteps` hook can be used to register custom components that rely on steps, similar to the Appear component.
It takes one argument for the total length of steps and returns the current step state.

```jsx
// example
import React from 'react'
import { useSteps } from '@mdx-deck/components'

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

## `useDeck` Hook

The `useDeck` component can be used to hook into MDX Deck state.
It returns the [app context](#context) and can be used in a custom [Provider component][] or other custom components.

```jsx
// example custom Provider
import React from 'react'
import { useDeck } from '@mdx-deck/components'

export default props => {
  const state = useDeck()

  return (
    <div>
      {props.children}
      <div
        css={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          margin: 16,
        }}
      >
        Slide {state.index + 1}/{state.length}
      </div>
    </div>
  )
}
```

[provider component]: advanced.md#custom-provider-component
