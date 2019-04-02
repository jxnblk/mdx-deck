# Theming

mdx-deck uses [emotion][] for styling, making practically any part of the presentation themeable.

## Built-in Themes

mdx-deck includes several built-in themes to change the look and feel of the presentation.
Export `theme` from your MDX file to enable a theme.

```mdx
export { dark as theme } from 'mdx-deck/themes'

# Dark Theme
```

View the [List of Themes](themes.md).

## Custom Themes

A custom theme can be provided by exporting `theme` from the MDX file.

```mdx
export { default as theme } from './theme'

# Hello
```

The theme should be an object with fields for fonts, colors, and CSS for individual components.

```js
// Example theme.js
export default {
  // add a custom font
  font: 'Roboto, sans-serif',
  // custom colors
  colors: {
    text: '#f0f',
    background: 'black',
  },
}
```

## Composing Themes

Multiple themes can be used together.
For example, this allows the use of a syntax highlighting theme,
along with a color theme, and a separate typography theme.

To compose themes together export a `themes` array instead of a single theme.

```mdx
import { syntaxHighlighter } from 'mdx-deck/themes'
import customTheme from './theme'

export const themes = [syntaxHighlighter, customTheme]

# Cool. :sunglasses:
```

Please note that themes are deep merged together and the last theme specified will override fields from themes before it.

### Google Fonts

Themes can specify a `googleFont` field to automatically add a `<link>` tag to the document head.
Alternatively, use the `<Head />` component to add a custom `<link>` tag.

### Syntax Highlighting

By default fenced code blocks do not include any syntax highlighting.
Themes can provide a set of custom MDX components, including a replacement for the default `code` component that can add syntax highlighting with libraries like [react-syntax-highlighter][].

MDX Deck includes two themes for adding syntax highlighting with [react-syntax-highlighter][]: `syntaxHighlighter` and `syntaxHighlighterPrism`.

```js
import { future } from "mdx-deck/themes";
import { syntaxHighlighterPrism } from "mdx-deck/themes";

export default syntaxHighlighterPrism({
  ...future
});
```

Since MDX supports using React components inline, you can also import a syntax highlighting component directly, if you prefer.

### Styling Elements

Each element can be styled with a theme.
Add a style object (or string) to the theme to target specific elements.

```js
// example theme
export default {
  h1: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  blockquote: {
    fontStyle: 'italic',
  },
}
```

See the [reference](#reference) below for a full list of element keys.

## Reference

The following keys are available for theming:

- `font`: base font family
- `monospace`: font family for `<pre>` and `<code>`
- `colors`: object of colors used for MDX components
  - `text`: root foreground color
  - `background`: root background color
  - `code`: text color for `<pre>` and `<code>`
  - `codeBackground`: background color for `<pre>` and `<code>`
- `css`: root CSS object
- `heading`: CSS for all headings
- `h1`: CSS for `<h1>`
- `h2`: CSS for `<h2>`
- `h3`: CSS for `<h3>`
- `h4`: CSS for `<h4>`
- `h5`: CSS for `<h5>`
- `h6`: CSS for `<h6>`
- `p`: CSS for `<p>`
- `a`: CSS for `<a>`
- `ul`: CSS for `<ul>`
- `ol`: CSS for `<ol>`
- `li`: CSS for `<li>`
- `img`: CSS for `<img>`
- `blockquote`: CSS for `<blockquote>`
- `table`: CSS for `<table>`
- `pre`: CSS for `<pre>`
- `code`: CSS for `<code>`
- `Slide`: CSS to apply to the wrapping Slide component
- `components`: object of MDX components to render markdown
- `Provider`: component for wrapping the entire app
- `googleFont`: CSS HREF for adding a Google Font `<link>` tag

## Advanced Usage

For more advanced customizations see the [Advanced Usage](advanced.md) docs.

[emotion]: https://emotion.sh
[mdx]: https://github.com/mdx-js/mdx
[react-syntax-highlighter]: https://github.com/conorhastings/react-syntax-highlighter
