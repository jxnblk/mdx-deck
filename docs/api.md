# API

The core `mdx-deck` package is a wrapper around the Gatsby CLI with the `gatsby-theme-mdx-deck` package.

## Components

- `Head`: Adds elements to the document `<head>`
- `Notes`: Adds speaker notes to a slide
- `Appear`: Steps through child elements one-by-one
- `Embed`: Embed MDX Deck slides in other React applications

See [Components](components.md) for more info.

## Layouts

- `Image`: A fullscreen background image layout component
- `Invert`: Inverts the foreground and background colors of the slide
- `Split`: Renders the first element on the left and other elements to the right
- `SplitRight`: Renders the first element on the right and other elements to the left
- `Horizontal`: Renders all child elements side-by-side
- `FullScreenCode`: Renders a single child code block fullscreen

See [Layouts](layouts.md) for more info.

## Hooks

### `useSteps`

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

The `useDeck` hook returns the MDX Deck state, including:

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
import { useDeck } from 'mdx-deck'

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

```jsx
// detailed example for automatic slide transitions 
import React, { useEffect, useState } from "react";
import { useDeck } from "mdx-deck";
import { navigate } from "@reach/router";

const nextSlide = ({ slug, length, index, setState }) => {
  const n = index + 1;
  if (n >= length) return;
  navigate([slug, n].join("/"));
  setState({ step: 0 });
};


export default props => {
  const state = useDeck();

  const [inProp, setInProp] = useState(true);

  const slide_duration = 20000; // ms

  const fade_duration = 220; // ms

  const fade_out_duration = 400; // ms

  const defaultStyle = {
    transition: `opacity ${fade_duration}ms ease-in-out`,
    opacity: inProp ? 1 : 0
  };

  useEffect(() => {
    // setInProp(true);

    // Don't start timer on title slide
    if (state.index == 0) {
      return;
    }

    const fader = setTimeout(() => {
      // Stop fader at the end
      if (state.index < state.length - 1) {
        setInProp(false);
      }
    }, (slide_duration - fade_duration - fade_out_duration));

    const timer = setTimeout(() => {
      // Stop timer at the end
      if (state.index < state.length - 1) {
        nextSlide(state);
        setInProp(false);
      }
    }, slide_duration);
  }, []);

  return (
    <div
      style={{
        ...defaultStyle
      }}
    >
      {props.children}
    </div>
  );
};
```


## CLI Options

```
-p --port     Dev server port
-h --host     Host the dev server listens to
--no-open     Prevent from opening in default browser
```
