
# mdx-deck

Create presentation decks with [MDX][]

```sh
npm i mdx-deck
```

````md
---
imports:
  - import Demo from './components/Demo'
---

# This is the title of my deck

---

# About Me

---

```jsx
<CodeSnippet />
```

---


<Demo />

---

# The end

````

```sh
mdx-deck deck.mdx
```

[MDX]: https://github.com/mdx-js/mdx
