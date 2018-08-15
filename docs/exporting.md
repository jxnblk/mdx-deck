
# Exporting

## Static Bundle

To export your deck as a static HTML page with JS bundle,
add a `build` script to your `package.json` file.

```json
"scripts": {
  "build": "mdx-deck build deck.mdx"
}
```

## PDF Export

Presentations can be exported as PDF using the CLI.
This works well as a backup option for any unforeseen technical difficulties.

```json
"script": {
  "pdf": "mdx-deck pdf deck.mdx"
}
```

## Screenshots

A PNG image of the first slide can be exported with the `screenshot` command.
This is useful for creating open graph images for Twitter, Facebook, or Slack.

```json
"script": {
  "screenshot": "mdx-deck screenshot deck.mdx"
}
```

### OG Image

To use the image as an open graph image, use the [Head](components.md#Head) component to add a meta tag.
Note that the meta tag should point to a full URL, including schema and domain name.

```mdx
import { Head } from 'mdx-deck'

<Head>
  <meta name='og:image' content='https://example.com/card.png' />
</Head>
```

