import React from "react"
import SlideDeck from "./index"

const mod = require(DOC_FILENAME)
const slides = mod.default
const { theme, components, Provider } = mod

const Root = Provider || React.Fragment

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <SlideDeck slides={slides} theme={theme} components={components} />
      </Root>
    )
  }
}
