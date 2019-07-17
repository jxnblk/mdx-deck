
# Usage with Gatsby

The core MDX Deck application is built as a Gatsby theme.
This means you can install MDX Deck as a theme within an existing Gatsby site to include presentations along with other content, such as a landing page or blog.
The theme also supports adding multiple presentations to a single site.

Install the theme in your Gatsby site.

```sh
npm i gatsby-theme-mdx-deck
```

Add the theme to the `plugins` array in your configuration.

```js
// gatsby-config.js
module.exports = {
  plugins: [
    'gatsby-theme-mdx-deck',
  ]
}
```

Create a directory to store your presentations.

```sh
mkdir decks
```

Add MDX Deck presentations to this directory.
Each deck will create a new page using the filename as its route.

```mdx
<!-- decks/hello.mdx -->

# Hello

---

This is my presentation
```

After running `gatsby develop`, this presentation should be viewable at `http://localhost:8000/hello` .

See the [gatsby-theme-mdx-deck](../packages/gatsby-theme) docs for more documentation and options.
