
# Theming

mdx-deck uses [styled-components][] for styling, making practically any part of the presentation themeable.

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
It's recommended that all custom themes extend the default theme as a base.

<small>Note: you need to include [all keys](#reference) in the `colors` object for the theming to work correctly. You may want to use a deep [merge](https://www.npmjs.com/search?q=merge) strategy for extending existing themes more easily.</small>

```js
// Example theme.js
import theme from 'mdx-deck/themes'

export default {
  // extends the default theme
  ...theme,
  // add a custom font
  font: 'Roboto, sans-serif',
  // custom colors
  colors: {
    ...theme.colors, // include existing theme colors
    text: '#f0f',
    background: 'black',
    link: '#0ff',
  }
}
```

### Google Fonts

To use webfonts, mdx-deck will attempt to add `<link>` tags for any font from Google Fonts.
To load webfonts from other sources, use a custom [Provider component](advanced.md#custom-provider-component) to add custom `<link>` tags.

### Syntax Highlighting

By default fenced code blocks do not include any syntax highlighting.
Syntax highlighting in fenced code blocks can be enabled by providing a `prism` style object in a theme.
The syntax highlighting is built with [react-syntax-highlighter][] and [PrismJS][].
Create a `theme.js` file and export it via the `MDX` file.

```js
export { default as theme } from './theme'
//...
```

```js
// example theme.js
import { future } from 'mdx-deck/themes'
import okaidia from 'react-syntax-highlighter/styles/prism/okaidia'

export default {
  ...future,
  prism: {
    style: okaidia
  }
}
```

By default, only JavaScript and JSX are enabled for syntax highlighting to keep bundle sizes to a minimum.
To enable other languages, add a `languages` object to the `prism` object in the theme.

```js
// example theme.js
import { future } from 'mdx-deck/themes'
import okaidia from 'react-syntax-highlighter/styles/prism/okaidia'
import prismRuby from 'react-syntax-highlighter/languages/prism/ruby'

export default {
  ...future,
  prism: {
    style: okaidia,
    languages: {
      ruby: prismRuby
    }
  }
}
```

For lists of available syntax styles and languages, see:

- [Prism languages](https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD)
- [Prism styles](https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD)

[PrismJS]: https://github.com/PrismJS/prism
[react-syntax-highlighter]: https://github.com/conorhastings/react-syntax-highlighter

### Slide Transitions

The slide transition timing function and duration can be customized with a custom theme.

```js
// example theme
import theme from 'mdx-deck/themes'

export default {
  ...theme,
  transitionTimingFunction: 'linear',
  transitionDuration: '.1s'
}
```

### Styling Elements

Each element can be styled with a theme. Add a style object (or string) to the theme to target specific elements.

```js
// example theme
import theme from 'mdx-deck/themes'

export default {
  ...theme,
  h1: {
    textTransform: 'uppercase',
    letterSpacing: '0.1em'
  },
  blockquote: {
    fontStyle: 'italic'
  }
}
```

See the [reference](#reference) below for a full list of element keys.


## Reference

The following keys are available for theming:

- `font`: base font family
- `weights`: array of font weights for the main font
- `monospace`: font family for `<pre>` and `<code>`
- `fontSizes`: array of font sizes from smallest to largest
- `colors`: object of colors used for MDX components
  - `text`: root foreground color
  - `background`: root background color
  - `link`
  - `heading`
  - `blockquote`
  - `pre`
  - `preBackground`
  - `code`
  - `codeBackground`
- `transitionTimingFunction`: timing function value for slide transitions
- `transitionDuration`: duration value for slide transitions. set to `0` to disable transitions
- `css`: root CSS object
- `heading`: CSS for all headings
- `h1`: CSS for `<h1>`
- `h2`: CSS for `<h2>`
- `h3`: CSS for `<h3>`
- `h4`: CSS for `<h4>`
- `h5`: CSS for `<h5>`
- `h6`: CSS for `<h6>`
- `paragraph`: CSS for `<p>`
- `link`: CSS for `<a>`
- `ul`: CSS for `<ul>`
- `ol`: CSS for `<ol>`
- `li`: CSS for `<li>`
- `img`: CSS for `<img>`
- `blockquote`: CSS for `<blockquote>`
- `table`: CSS for `<table>`
- `components`: object of MDX components to render markdown
- `Provider`: component for wrapping the entire app

## Advanced Usage

For more advanced customizations see the [Advanced Usage](advanced.md) docs.

[styled-components]: https://github.com/styled-components/styled-components
[MDX]: https://github.com/mdx-js/mdx
