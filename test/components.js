import React from 'react'
import { create as render } from 'react-test-renderer'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import components from '../src/components'

const blacklist = {
  pre: true,
  img: true
}

test.each(
  Object.keys(components)
    .filter(key => !blacklist[key])
    .map(key => {
      const Component = components[key]
      return [ key, <ThemeProvider theme={{}}><Component /></ThemeProvider> ]
    })
)('renders %s', (name, el) => {
  const json = render(el).toJSON()
  expect(json).toMatchSnapshot()
})
