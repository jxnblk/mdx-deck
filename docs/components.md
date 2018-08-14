
# Components

mdx-deck includes a few built-in components to help with creating presentations.

## Head

TK

```mdx
import { Head } from 'mdx-deck'

<Head>
  <title>My Presentation</title>
</Head>
```

## Image

Use the `<Image />` component to render a fullscreen image (using the CSS `background-image` property).

```mdx
import { Image } from 'mdx-deck'

<Image src='kitten.png' />
```

### Props
- `src` (string) image URL
- `size` (string) CSS background-size

## Appear

Use the `<Appear />` component to make its children appear one at a time within a single slide.
Use the up and down arrow keys to step through each element.

```mdx
import { Appear } from 'mdx-deck'

<ul>
  <Appear>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </Appear>
</ul>
```

## Speaker Notes

Speaker notes that only show in presenter mode can be added to any slide with either markdown syntax or with the Notes component.

````mdx
# Markdown speaker notes

```notes
These are only visible in presenter mode
```
````

```mdx
import { Notes } from 'mdx-deck'

# Slide Content

<Notes>
  Only visible in presenter mode
</Notes>
```

## Layouts

mdx-deck includes a few built-in layouts for common slide variations.
Export a layout as the `default` within a slide to wrap the contents.

### Invert

Inverts the foreground and background colors from the theme.

```mdx
import { Invert } from 'mdx-deck/layouts'

# Normal

---

export default Invert

# Inverted
```

### Split

Creates a horizontal layout with the first child on the left and all other children on the right.

```mdx
import { Split } from 'mdx-deck/layouts'

export default Split

![](kitten.png)

## Meow
```

### SplitRight

Same as the Split component, but renders the first child on the right.

```mdx
import { SplitRight } from 'mdx-deck/layouts'

export default SplitRight

![](kitten.png)

## Meow
```

### FullScreenCode

Render fenced code blocks fullscreen.

````mdx
import { FullScreenCode } from 'mdx-deck/layouts'

export default FullScreenCode

```jsx
<Button>Beep</Button>
```
````

