# Theming

MDX Deck uses [Theme UI][] and [Emotion][] for styling, making practically any part of the presentation themeable.

## Built-in Themes

MDX Deck includes several built-in themes to change the look and feel of the presentation.
Export `theme` from your MDX file to enable a theme.

```mdx
import { themes } from 'mdx-deck'

export const theme = themes.dark

# Dark Theme
```

View the [Themes](themes.md) docs to see all available themes.

## Custom Themes

A custom theme can be provided by exporting `theme` from the MDX file.

```mdx
import myTheme from './theme'

export const theme = myTheme

# Hello
```

Themes are based on [Theme UI][] and support customizing typography, color, layout, and other element styles.

```js
// Example theme.js
export default {
  fonts: {
    body: 'Roboto, sans-serif',
    monospace: '"Roboto Mono", monospace',
  },
  colors: {
    text: 'white',
    background: 'black',
    primary: 'blue',
  },
}
```

## Composing Themes

To compose multiple themes together, merge the objects together into a single theme and export that theme from your deck.

## Google Fonts

Themes can specify a `googleFont` field to automatically add a `<link>` tag to the document head.
Alternatively, use the `<Head />` component to add a custom `<link>` tag.

## Syntax Highlighting

By default fenced code blocks do not include any syntax highlighting.
Themes can provide a set of custom MDX components, including a replacement for the default `code` component that can add syntax highlighting with libraries like [react-syntax-highlighter][].

MDX Deck includes two themes for adding syntax highlighting with [react-syntax-highlighter][]: `highlight` and `prism`.

```mdx
import { themes } from 'mdx-deck'

export const theme = {
  ...themes.prism
}
```

Since MDX supports using React components inline, you can also import a syntax highlighting component directly, if you prefer.

```mdx
import Highlighter from 'react-syntax-highlighter'

<Highlighter language='javascript'>
{`export const hello = 'hi'`}
</Highlighter>
```

## Styling Elements

Add a `theme.styles` object to style specific markdown elements.

```js
// example theme
export default {
  styles: {
    h1: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    blockquote: {
      fontStyle: 'italic',
    },
  }
}
```

## Reference

- `colors`: object of colors used for MDX components
  - `text`: root foreground color
  - `background`: root background color
  - `primary`: primary color
- `fonts.body`: base font family
- `fonts.heading`: heading font family
- `fonts.monospace`: font family for `<pre>` and `<code>`
- `text.heading`: styles for all headings
- `styles`: Theme UI styles for MDX elements
- `styles.Slide`: styles for the wrapping Slide component
- `styles.Header`: styles for the Header component
- `styles.Footer`: styles for the Footer component
- `components`: object of MDX components
- `googleFont`: Stylesheet URL for adding a Google Font

[emotion]: https://emotion.sh
[theme ui]: https://theme-ui.com
[mdx]: https://github.com/mdx-js/mdx
[react-syntax-highlighter]: https://github.com/conorhastings/react-syntax-highlighter
