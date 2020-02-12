# API

## Components

- `Head`: Adds elements to the document `<head>`
- `Notes`: Adds speaker notes to a slide
- `Steps`: Steps through child elements one-by-one


## `useSteps`

The `useSteps` hook can be used to register custom components that rely on multiple "steps" within a single slide,
similar to the Appear component.
The hook takes one argument for the total `length` of steps and returns the current `step` state.

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

The `useDeck` hook returns the MDX Deck state.

