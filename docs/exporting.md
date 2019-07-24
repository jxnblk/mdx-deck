# Exporting

## Static Build

To export your deck as a static HTML page with JS bundle,
add a `build` script to your `package.json` file.

```json
"scripts": {
  "build": "mdx-deck build deck.mdx"
}
```

## PDF

The MDX server must be running during PDF export, add a `start` script to your `package.json` file.

```json
  "scripts": {
    "start": "mdx-deck deck.mdx"
  }
```

To export a deck as PDF, use the [`website-pdf`](https://www.npmjs.com/package/website-pdf) CLI.

Run the following command to create a PDF:

```sh
npx website-pdf http://localhost:<PORT>/print -o deck.pdf
```

Note: `<PORT>` is the same port your MDX server is running on.

## PNG

To export a PNG image, use the [`capture-website-cli`](https://github.com/sindresorhus/capture-website-cli) CLI.
Start the dev server, then run the following:

```sh
npx capture-website-cli http://localhost:8000 deck.png
```

## Open Graph Image

To add an open graph image, use the [Head](components.md#Head) component to add a meta tag.
Note that the meta tag should point to a full URL, including schema and domain name.

```mdx
import { Head } from 'mdx-deck'

<Head>
  <meta name="og:image" content="https://example.com/card.png" />
</Head>
```
