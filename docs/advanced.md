
# Advanced Usage

## Custom MDX components

mdx-deck includes default components for MDX, but to provide custom components to the [MDXProvider][], add a `components` object to the `theme`.

```js
// example theme
import { theme } from 'mdx-deck/themes'
import Heading from './Heading'

export default {
  ...theme,
  components: {
    h1: Heading
  }
}
```

See the [MDX][] docs for more or take a look
at the [default set of components](../src/components.js) as a reference.

## Custom Provider component

A custom Provider component can be added to the theme to wrap the entire application.
This is useful for adding custom context providers in React.

```js
// example theme.js
import { theme } from 'mdx-deck/themes'
import Provider from './Provider'

export default {
  ...theme,
  font: 'Georgia, serif',
  Provider
}
```

A custom Provider component will receive the application's state as props,
which can be used to show custom page numbers or add other elements to the UI.

#### Props

- `index`: (number) the current slide index
- `length`: (number) the length of the slides array
- `mode`: (string) the current mode (one of `'NORMAL'`, `'PRESENTER'`, or `'OVERVIEW'`)
- `notes`: (object) custom [speaker notes](#speaker-notes) for all slides
- `step`: (number) the current visible step in an Appear component


## Combining multiple mdx files

Unlike the official `@mdx-js/loader`,
the `mdx-deck/loader` exports an array of components instead of just one.
Multiple MDX files can be combined into a single presentation if the filesize is getting difficult to manage.

First create a couple `.mdx` files like any other mdx-deck file, with `---` to separate the different slides.

```mdx
# one.mdx

---

This is the first file
```

```mdx
# two.mdx

---

This is the second file
```

Next, create a `.js` file to import and combine the two `.mdx` files.

```js
// deck.js
import one from './one.mdx'
import two from './two.mdx'

export default [
  ...one,
  ...two
]
```

Then, point the mdx-deck CLI comment in your `package.json` to the `deck.js` file.

```json
"scripts": {
  "start": "mdx-deck deck.js"
}
```

## Custom webpack config

Webpack configuration files named `webpack.config.js` will automatically be merged with the built-in configuration, using [webpack-merge](https://github.com/survivejs/webpack-merge). To use a custom filename, pass the file path to the `--webpack` flag.

```js
// webpack.config.js example
module.exports = {
  module: {
    rules: [
      { 
        test: /\.svg$/, 
        use: [
          { loader: 'babel-loader' },
          { loader: 'react-svg-loader' }
        ]
      }
    ]
  }
}
```

**Careful**: When overwriting the loader for `mdx` files, make sure to include the default loader from `mdx-deck/loader`.

## Custom build setups

The core mdx-deck components can also be used in any React application,
such as [create-react-app][] or [next.js][].

See the [React API](react.md) docs for more.

[MDX]: https://github.com/mdx-js/mdx
[MDXProvider]: https://github.com/mdx-js/mdx#mdxprovider
[create-react-app]: https://github.com/facebook/create-react-app
[next.js]: https://github.com/zeit/next.js/
