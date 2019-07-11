# @mdx-deck/gatsby-theme

**WIP** A Gatsby theme for adding MDX Decks to your Gatsby site

```sh
npm i @mdx-deck/gatsby-theme
```

_Note:_ This theme **requires MDX v1** and will not work with previous versions of MDX

```js
// gatsby-config.js
module.exports = {
  plugins: ['@mdx-deck/gatsby-theme'],
}
```

Add MDX Decks to the `src/decks/` directory. The filename will be used for the route of that deck.

**/src/decks/hello.mdx**

```mdx
# Hello!

---

## Beep
```

## Using Layouts

Slide layout components must be rendered inline, _not_ using the default export syntax.

**/src/decks/hello.mdx**

```mdx
import Layout from './my-layout'

<Layout>

# Hello Layout

</Layout>
```

## Theme Config

The following options can be passed to the gatsby theme.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: '@mdx-deck/gatsby-theme',
      options: {
        // disable gatsby-mdx plugin – use this when your site already uses gatsby-mdx
        mdx: false,
        // source directory for decks
        path: 'src/presentations',
        // name routes' basepath
        name: 'presentations',
      },
    },
  ],
}
```

MIT License
