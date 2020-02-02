# Components

MDX Deck includes components to help with creating presentations.
These components are provided with MDX's *shortcodes* functionality, so they do not need to be imported.

## Head

Use the `Head` component to set content in the document head.

```mdx
// example for twitter cards

<Head>
  <title>My Presentation</title>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@jxnblk" />
  <meta name="twitter:title" content="My Presentation" />
  <meta name="twitter:description" content="A really great presentation" />
  <meta name="twitter:image" content="https://example.com/card.png" />
</Head>
```

## Notes

Speaker notes that only show in presenter mode can be added to any slide with the `Notes` component.

```mdx
# Slide Content

<Notes>

- Only visible in presenter mode
- Markdown syntax can be used with empty lines around the content

</Notes>
```

## Header

Use the `Header` component to render a persistent header (at the top of the screen) across the entire presentation.

```mdx
<Header>

Put a logo, handle, or something else here...

</Header>

# My Presentation

```

## Footer

The `Footer` component renders a persistent footer (at the bottom of the screen) across the entire presentation.

```mdx
<Footer>

Put a logo, handle, or something else here...

</Footer>

# My Presentation

```

## Steps

Use the `Steps` (formerly `Appear`) component to make child elements appear one at a time within a single slide.
Use the left and right arrow keys to step through each element.

```mdx

<Steps>

- One
- Two
- Three
- Four

</Steps>
```

Internally, the `Steps` component uses the `useSteps` hook, which can be used to build custom components with similar behavior.


<!--
## Image

Use the `Image` component to render a fullscreen image with the CSS `background-image` property.

```mdx
import { Image } from 'mdx-deck'

<Image src="kitten.png" />
```

```mdx
import { Image } from 'mdx-deck'

<Image src='kittens.png'>

# Kittens

</Image>
```

**Props**

- `src` (string) image URL
- `size` (string) CSS background-size

## Embed

**Experimental**

The `Embed` component is intended for use **outside** of an MDX Deck to render a preview of a particular slide.
This can be used to embed slide previews in other places, like a blog post write-up of a presentation.

```jsx
import React from 'react'
import { Embed } from 'mdx-deck'
import deck from './my-deck.mdx'

export default props => (
  <>
    <h2>Second Slide</h2>
    <Embed src={deck} slide={2} />
  </>
)
```
-->
