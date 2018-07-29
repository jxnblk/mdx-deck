import React from 'react'
import { create as render } from 'react-test-renderer'
import 'jest-styled-components'
import Image from '../src/Image'

describe('Image', () => {
  test('renders', () => {
    const json = render(<Image />).toJSON()
    expect(json).toMatchInlineSnapshot(`
.c0 {
  background-size: cover;
  background-position: center;
  background-image: url(undefined);
  width: 100vw;
  height: 100vh;
}

<div
  className="c0"
  height="100vh"
  width="100vw"
/>
`)
  })

  test('renders with image', () => {
    const json = render(<Image src='kitten.png' />).toJSON()
    expect(json).toHaveStyleRule('background-image', 'url(kitten.png)')
  })

  test('renders with custom css', () => {
    const json = render(<Image css={{ backgroundColor: 'tomato' }} />).toJSON()
    expect(json).toHaveStyleRule('background-color', 'tomato')
  })
})
