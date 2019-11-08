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

To export a deck as PDF, start the dev server, visit http://localhost:8000/print and use your browser's print dialog to "Print to PDF".

If your operating system doesn't support it, you can use [`website-pdf`](https://www.npmjs.com/package/website-pdf), for example:

```sh
npx website-pdf http://localhost:8000/print -o deck.pdf
```

Note that `npx website-pdf` downloads Chromium every time (over 100 MB) so consider installing `website-pdf` globally if you're running it repeatedly.

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
