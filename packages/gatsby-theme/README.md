
# gatsby-theme-mdx-deck

Add MDX Deck presentations to any Gatsby site

```sh
npm i gatsby-theme-mdx-deck
```

```js
// gatsby-config.js
module.exports = {
  plugins: [
    'gatsby-theme-mdx-deck',
  ]
}
```

Add one or more MDX presentation files to the `decks/` directory.
The filenames will be used for creating routes to each deck.

Example `decks/hello.mdx`

```mdx
# Hello!

---

## Beep boop
```

## Layouts

Individual slides can be wrapped with layout components,
which work similarly to slide templates found in other presentation software.

Example `decks/hello.mdx`

```mdx
import Layout from './my-layout'

<Layout>

# Hello

</Layout>

---

## Beep boop
```

## Configuration Options

The Gatsby theme accepts the following options.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-mdx-deck',
      options: {
        // enable or disable gatsby-plugin-mdx
        mdx: false,
        // source directory
        contentPath: 'decks',
        // base path for routes generate by this theme
        basePath: ''
      }
    }
  ]
}
```

MIT License
