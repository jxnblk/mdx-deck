
# mdx-deck

![](https://s3.amazonaws.com/jxnblk/mdx-deck.gif)

[MDX][]-based presentation decks (**Beta**)

[![Build Status][badge]][travis]
[![Version][version-badge]][npm]
[![Downloads][downloads-badge]][npm]

[badge]: https://img.shields.io/travis/jxnblk/mdx-deck.svg?style=flat-square
[travis]: https://travis-ci.org/jxnblk/mdx-deck

[version-badge]: https://img.shields.io/npm/v/mdx-deck.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dw/mdx-deck.svg?style=flat-square
[npm]: https://npmjs.com/package/mdx-deck

```sh
npm i -D mdx-deck
```

- :memo: Write presentations in markdown
- :atom_symbol: Import and use React components
- :nail_care: Customizable themes and components
- :zero: Zero-config CLI
- :tipping_hand_woman: [Presenter mode](#presenter-mode)
- :notebook: [Speaker notes](#speaker-notes)

[View demo](https://jxnblk.com/mdx-deck)


## Getting Started

Create an [MDX][] file and separate each slide with `---`.

````mdx
# This is the title of my deck
---
# About Me
---
```jsx
<CodeSnippet />
```
---
import Demo from './components/Demo'

<Demo />
---
# The end
````

Add a run script to your `package.json` with the mdx-deck CLI
pointing to the `.mdx` file to start the dev server:

```json
"scripts": {
  "start": "mdx-deck deck.mdx"
}
```

Start the dev server:

```sh
npm start
```

### Video Tutorial

For a video introduction, see this [egghead tutorial][egghead] by [@andrewdelprete](https://github.com/andrewdelprete).

[egghead]: https://egghead.io/lessons/react-build-a-slide-deck-with-mdx-deck-using-markdown-react


## Usage

MDX can use Markdown syntax and render React components with JSX.

### Imports

To import components, use ES import syntax separated with empty lines from any markdown or JSX syntax.

```mdx
import { Box } from 'grid-styled'

<Box color='tomato'>
  Hello
</Box>
```

### Theming

mdx-deck uses [styled-components][] for styling.

### Built-in Themes

mdx-deck includes several built-in themes to change the look and feel of the presentation.
Export `theme` from your MDX file to enable a theme.

```mdx
export { dark as theme } from 'mdx-deck/themes'

# Dark Theme
```

The following themes are available from `mdx-deck/themes`:

- `theme`: default theme with white background
- `dark`: black background dark theme
- `future`: dark theme with Avenir Next
- `condensed`: dark theme with Roboto Condensed
- `yellow`: bright yellow theme with Roboto Condensed

### Custom Themes

A custom theme can be provided by exporting `theme` from the MDX file.

```mdx
export { default as theme } from './theme'

# Hello
```

The theme should be an object based on [styled-system][]'s theme schema.

```js
// example theme.js
export default {
  font: 'Georgia',
  monospace: 'Menlo, monospace',
  fontSizes: [
    '0.75em', '1em', '1.5em', '2em', '3em'
  ],
  colors: {
    text: '#000',
    background: 'transparent',
    link: '#07c',
    heading: '#000',
    quote: '#000',
    pre: '#f0f',
    preBackground: '#333',
    code: '#f0f',
    codeBackground: 'transparent',
  },
  css: {
    // apply any styles to the root element
  },
  // custom CSS can be provided to any of the default components:
  heading: {
    fontWeight: 400
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
}
```

The following keys are available for theming:

- `font`: base font family
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
- `css`: root CSS object
- `heading`: CSS for all headings
- `h1`: CSS for `<h1>`
- `h2`: CSS for `<h2>`
- `h3`: CSS for `<h3>`
- `paragraph`: CSS for `<p>`
- `link`: CSS for `<a>`
- `ul`: CSS for `<ul>`
- `ol`: CSS for `<ol>`
- `li`: CSS for `<li>`
- `img`: CSS for `<img>`

### Custom Components

mdx-deck includes default components for MDX, but to provide custom components to the [MDXProvider][], export a `components` object.

```mdx
export { default as components } from './components'

# Custom Components
```

### Components

mdx-deck includes some built-in components to help with creating presentations.

#### Image

Use the `<Image />` component to render a fullscreen image (using the CSS `background-image` property).

```mdx
import { Image } from 'mdx-deck'

<Image src='kitten.png' />
```

### Layouts

Each slide can include a custom layout around its content.
This can be used as a substitute for slide templates found in other presentation apps and libraries.

```js
// example Layout.js
import React from 'react'

export default ({ children }) =>
  <div
    style={{
      width: '100vw',
      height: '100vw',
      backgroundColor: 'tomato'
    }}>
    {children}
  </div>
```

```mdx
import Layout from './Layout'

# No Layout

---
export default Layout

# Custom Layout
```

The layout component will wrap the MDX elements within that slide,
which means you can use a nested ThemeProvider or target elements with CSS-in-JS.

### Custom Provider

A custom Provider component can be exported to wrap the entire application.
This is useful for adding custom context providers in React.

```mdx
export { default as Provider } from './Provider'

# Hello
```

## Presenter Mode

mdx-deck includes a built-in presenter mode, with a preview of the next slide and a timer.

To use presenter mode:

- Open two windows in the same browser, with the same URL on two different screens. (this should work in both development and exported presentations)
- In your window press the `p` key to enter presenter mode.
- Display the other window on the screen for the audience to see.
- Control the presentation from your window by using the left and right arrow keys; the other window should stay in sync

### Speaker Notes

Notes that only show in presenter mode can be added to any slide.
Speaker notes can be added in one of the following two ways:

**Markdown:** Use the `notes` language attribute in a fenced code block to add speaker notes.

````mdx
# Slide Content

```notes
These are only visible in presenter mode
```
````

**Notes Component:** Use the `Notes` component to create more complex speaker notes.

````mdx
import { Notes } from 'mdx-deck'

# Slide Content

<Notes>
  Only visible in presenter mode
</Notes>
````

## Exporting

Add a `build` script to your `package.json` to export a presentation as HTML with a JS bundle.

```json
"scripts": {
  "build": "mdx-deck build deck.mdx"
}
```

### PDF Export

Presentations can be exported as PDF using the CLI.
This works well as a backup option for any unforeseen technical difficulties.

```json
"script": {
  "pdf": "mdx-deck pdf deck.mdx"
}
```

## CLI Options

```
-p --port     Dev server port
--no-open     Prevent from opening in default browser
-d --out-dir  Output directory for exporting
--title       Title for the HTML document
```

## React API

mdx-deck components can also be used in any React application, such as [create-react-app][] or [next.js][].

### Webpack Loader

mdx-deck uses a custom webpack loader to split MDX files into an array of slides. Use this loader to import mdx files in a webpack application.

```js
// example webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.mdx$/,
        ignore: /node_modules/,
        use: [
          'babel-loader',
          'mdx-deck/loader'
        ]
      }
    ]
  }
}
```

### SlideDeck Component

```js
import React from 'react'
import { SlideDeck } from 'mdx-deck'
import slides from './deck.mdx'
import theme from './theme'
import components from './components'

export default () =>
  <SlideDeck
    slides={slides}
    theme={theme}
    components={components}
    width='100vw'
    height='100vh'
  />
```

View the source for other components available for use.

---

### Related

- [MDX][]
- [ok-mdx][]
- [ok-cli][]
- [Compositor x0][]
- [styled-components][]
- [styled-system][]
- [Spectacle][]

[MIT License](LICENSE.md)

[MDX]: https://github.com/mdx-js/mdx
[MDXProvider]: https://github.com/mdx-js/mdx#mdxprovider
[ok-mdx]: https://github.com/jxnblk/ok-mdx
[ok-cli]: https://github.com/jxnblk/ok-mdx/tree/master/packages/ok-cli
[Compositor x0]: https://github.com/c8r/x0
[styled-system]: https://github.com/jxnblk/styled-system
[styled-components]: https://github.com/styled-components/styled-components
[create-react-app]: https://github.com/facebook/create-react-app
[next.js]: https://github.com/zeit/next.js/
[Spectacle]: https://github.com/FormidableLabs/spectacle
