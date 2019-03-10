# Exporting

## Static Bundle

To export your deck as a static HTML page with JS bundle,
add a `build` script to your `package.json` file.

```json
"scripts": {
  "build": "mdx-deck build deck.mdx"
}
```

### PDF & Screenshots

To export a deck as PDF or create a PNG screenshot, install the export CLI package:

```sh
npm i @mdx-deck/export
```

Then run the following command to create a PDF:

```sh
mdx-deck-export pdf deck.mdx
```

Or export the first slide as a PNG:

```sh
mdx-deck-export png deck.mdx
```

### OG Image

To use the image as an open graph image, use the [Head](components.md#Head) component to add a meta tag.
Note that the meta tag should point to a full URL, including schema and domain name.

```mdx
import { Head } from 'mdx-deck'

<Head>
  <meta name="og:image" content="https://example.com/card.png" />
</Head>
```
