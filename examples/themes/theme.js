import React, { useState, useContext } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/react'
import * as themes from '@mdx-deck/themes'

const names = Object.keys(themes)

const DefaultProvider = props => <>{props.children}</>

const Context = React.createContext()

const Provider = props => {
  const [name, setTheme] = useState(names[0])
  const cycle = e => {
    const i = (names.indexOf(name) + 1) % names.length
    setTheme(names[i])
  }

  const baseTheme = themes[name]
  const theme = typeof baseTheme === 'function' ? baseTheme({}) : baseTheme
  const Root = theme.Provider || DefaultProvider

  return (
    <div>
      <Context.Provider value={name}>
        <ThemeProvider theme={theme}>
          <MDXProvider components={theme.components}>
            <Root>{props.children}</Root>
          </MDXProvider>
        </ThemeProvider>
      </Context.Provider>
      <div
        css={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          margin: 16,
        }}
      >
        <label>
          Theme
          <select
            value={name}
            onChange={e => {
              setTheme(e.target.value)
            }}
          >
            {names.map(name => (
              <option key={name}>{name}</option>
            ))}
          </select>
          <button onClick={cycle}>Next</button>
        </label>
      </div>
    </div>
  )
}

export const ThemeName = props => {
  const context = useContext(Context)

  return <>{context}</>
}

export const theme = {
  Provider,
}
