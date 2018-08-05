
# React API

The core mdx-deck components can also be used in any React application, such as [create-react-app][] or [next.js][].

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

export default () =>
  <SlideDeck
    slides={slides}
    theme={theme}
    width='100vw'
    height='100vh'
  />
```

View the source for other components available for use.

[create-react-app]: https://github.com/facebook/create-react-app
[next.js]: https://github.com/zeit/next.js/
