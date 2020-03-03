![](https://s3.amazonaws.com/jxnblk/mdx-deck-2.gif)

# MDX Deck <img src='docs/ace.png' width='24' height='24' />

Award-winning React [MDX][]-based presentation decks

[![Build Status][badge]][circleci]
[![Version][]][npm]
[![Downloads][]][npm]

[badge]: https://flat.badgen.net/github/status/jxnblk/mdx-deck/master/ci/circleci
[circleci]: https://circleci.com/gh/jxnblk/mdx-deck
[version]: https://flat.badgen.net/npm/v/mdx-deck
[downloads]: https://flat.badgen.net/npm/dm/mdx-deck
[npm]: https://npmjs.com/package/mdx-deck

- :memo: Write presentations in markdown
- :atom_symbol: Import and use [React components](#imports)
- :nail_care: Customizable [themes](#theming) and components
- :zero: Zero-config CLI
- :tipping_hand_woman: [Presenter mode](#presenter-mode)
- :notebook: [Speaker notes](#speaker-notes)

[View demo](https://mdx-deck.jxnblk.com)

- [Getting Started](#getting-started)
- [Using MDX](#using-mdx)
- [Theming](#theming)
- [Components](#components)
- [Layouts](#layouts)
- [Presenter Mode](#presenter-mode)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [CLI Options](#cli-options)
- [Videos & Articles](#videos-articles)
- [Examples](#examples)

## Getting Started

```sh
npm i -D mdx-deck
```

Create an [MDX][] file and separate each slide with `---`.

````mdx

# Hello

---

## This is my deck

---

## The End

````

Add a run script to your `package.json` with the MDX Deck CLI
pointing to the `.mdx` file to start the development server:

```json
"scripts": {
  "start": "mdx-deck deck.mdx"
}
```

Start the development server:

```sh
npm start
```

Use the left and right arrow keys to navigate through the presentation.

## Using MDX

MDX uses Markdown syntax and can render React components inline with JSX.

### Imports

To import components, use ES import syntax separated with empty lines between any markdown or JSX syntax.

```mdx
import { Box } from 'theme-ui'

<Box color="tomato">Hello</Box>
```

Read more about MDX syntax in the [MDX Docs][mdx].

## Theming

<div>
  <img src='docs/images/future.png' width='256' />
  <img src='docs/images/comic.png' width='256' />
  <img src='docs/images/yellow.png' width='256' />
</div>

MDX Deck uses [Theme UI][] and [Emotion][] for styling, making practically any part of the presentation themeable.
It also includes several built-in themes to change the look and feel of the presentation.

- See the list of available [Themes](docs/themes.md)
- Read more about theming in the [Theming docs](docs/theming.md).

## Components

MDX Deck includes built-in components to help with creating presentations,
a `Notes` component for adding speaker notes,
a `Head` component for the document head,
`Header` and `Footer` components for persistent header and footer content,
and a `Steps` component for adding multiple intermediate steps in a single slide.

Read more in the [Components](docs/components.md) docs.

### Third-Party Components

These optional libraries are intended for use with MDX Deck.

- [CodeSurfer][]: React component for scrolling, zooming and highlighting code.
- [mdx-code][]: Runnable code playgrounds for MDX Deck.
- [mdx-deck-live-code][]: Live React and JS coding in slides.

_Note: please check with version compatibility when using these libraries._

[codesurfer]: https://github.com/pomber/code-surfer
[mdx-code]: https://github.com/pranaygp/mdx-code
[mdx-deck-live-code]: https://github.com/JReinhold/mdx-deck-live-code

## Layouts

Each slide can include a custom layout around its content,
which can be used as a *template* for visually differentiating slides.

```js
// example Layout.js
import React from 'react'

export default ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'tomato',
    }}>
    {children}
  </div>
)
```

```mdx
import Layout from './Layout'

# No Layout

---

<Layout>

# Custom Layout

</Layout>
```

The layout component will wrap the MDX elements within that slide,
which means you can add custom layout styles
or style child elements with CSS-in-JS.

## Presenter Mode

Press `Option + P` to toggle *Presenter Mode*,
which will show a preview of the next slide, a timer, and speaker notes.

![presenter mode screenshot](docs/images/presenter-mode.png)

The presentation can be opened in two separate windows at the same time,
and it will stay in sync with the other window.

## Keyboard Shortcuts

| Key         | Description                                  |
| ----------- | -------------------------------------------- |
| Left Arrow, Page Up, Shift + Space  | Go to previous slide (or step in [Steps][]) |
| Right Arrow, Page Down, Space | Go to next slide (or step in [Steps][])     |
| Option + P  | Toggle [Presenter Mode](#presenter-mode)     |
| Option + O  | Toggle Overview Mode
| Option + G  | Toggle Grid Mode

[steps]: docs/components.md#steps

## CLI Options

```
-p --port     Dev server port
-h --host     Host the dev server listens to
--no-open     Prevent from opening in default browser
```

## Videos & Articles

- [Egghead Tutorial][egghead] by [Andrew Del Prete](https://github.com/andrewdelprete).
- [mdx-deck: slide decks powered by markdown and react][kcd-medium] by [Kent C. Dodds][]
- [Make Fast & Beautiful Presentations with MDX-Deck][hw-video] by [Harry Wolff][] ([Demo][hw-demo])
- [What is MDX][kcd-video] by [Kent C. Dodds][]
- [Build a Custom Provider Component for MDX-Deck][ks-egghead] by [Kyle Shevlin][]

[egghead]: https://egghead.io/lessons/react-build-a-slide-deck-with-mdx-deck-using-markdown-react
[kent c. dodds]: https://mobile.twitter.com/kentcdodds
[kcd-video]: http://youtu.be/d2sQiI5NFAM?a
[kcd-medium]: https://blog.kentcdodds.com/mdx-deck-slide-decks-powered-by-markdown-and-react-bfc6d6af20da
[hw-video]: https://www.youtube.com/watch?v=LvP2EqCiQMg&feature=youtu.be
[hw-demo]: https://github.com/hswolff/mdx-deck-demo
[harry wolff]: https://mobile.twitter.com/hswolff
[ks-egghead]: https://egghead.io/lessons/javascript-build-a-custom-provider-component-for-mdx-deck
[kyle shevlin]: https://twitter.com/kyleshevlin


## Examples

See how others have used MDX Deck for their presentations.

- [Design Systems & React][design-systems-react] by [Diana Mounter](https://mobile.twitter.com/broccolini)
- [Bringing Brazil to the Cloud, Now][brazil-now] by [Guillermo Rauch](https://mobile.twitter.com/rauchg/)
- [Simplify React][simplify-react] by [Kent C. Dodds](https://mobile.twitter.com/kentcdodds)
- [I Got 99 Problems but GraphQL Ain't One][99-problems] by [Sara Vieira](https://mobile.twitter.com/NikkitaFTW)
- [Stop de #divFest][stop-div-fest] by [Sara Vieira](https://mobile.twitter.com/NikkitaFTW)
- [MDX, authors and richer JAMstack content][mdx-talk] by [Josh Dzielak](https://mobile.twitter.com/dzello)
- [Components as Data: A Cross Platform GraphQL Powered Component API][components-as-data] by [Luke Herrington](https://mobile.twitter.com/lukeherrington)
- [A short history of webdevs future 🔮][webdev-intro] by [Hendrik Wallbaum](https://github.com/hoverbaum)

### Usage Examples

The following examples will open in CodeSandbox.

- [Basic Example](https://codesandbox.io/s/github/jxnblk/mdx-deck/tree/master/examples/basic)
- [Syntax Highlighting](https://codesandbox.io/s/github/jxnblk/mdx-deck/tree/master/examples/syntax-highlighting)
- [Steps](https://codesandbox.io/s/github/jxnblk/mdx-deck/tree/master/examples/steps)
- [Head](https://codesandbox.io/s/github/jxnblk/mdx-deck/tree/master/examples/head)
- [Header & Footer](https://codesandbox.io/s/github/jxnblk/mdx-deck/tree/master/examples/header-footer)

---

### Related

- [MDX][]
- [Gatsby][]
- [Theme UI][]
- [Emotion][]
- [Spectacle][]

[MIT License](LICENSE.md)

[mdx]: https://mdxjs.com/
[gatsby]: https://gatsbyjs.org
[spectacle]: https://github.com/FormidableLabs/spectacle
[emotion]: https://emotion.sh
[theme ui]: https://theme-ui.com

<!-- examples -->
[design-systems-react]: https://github-ds.now.sh/#0
[brazil-now]: https://braziljs.now.sh
[simplify-react]: https://simply-react.netlify.com/#0
[99-problems]: https://99-problems-graphql-aint-one.now.sh/#0
[stop-div-fest]: https://stop-div-fest.now.sh/
[mdx-talk]: https://mdx-talk.developermode.com/
[components-as-data]: https://componentsasdata.lukeherrington.com
[webdev-intro]: https://webdev-intro.talks.hoverbaum.net/
