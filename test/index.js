import 'jest-styled-components'
import React from 'react'
import { create as render } from 'react-test-renderer'
import { MDXDeck } from '../src'

const renderJSON = el => render(el).toJSON()

describe('MDXDeck', () => {
  test('renders', () => {
    const json = renderJSON(<MDXDeck slides={[() => <h1>hi</h1>]} />)
    expect(json).toMatchSnapshot(``)
  })

  test.todo('handles keydown events')
})
