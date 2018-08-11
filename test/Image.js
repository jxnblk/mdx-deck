import React from 'react'
import { create as render } from 'react-test-renderer'
import 'jest-styled-components'
import Image from '../src/Image'

describe('Image', () => {
  test('renders', () => {
    const json = render(<Image />).toJSON()
    expect(json).toMatchSnapshot()
  })

  test('renders with image', () => {
    const json = render(<Image src="kitten.png" />).toJSON()
    expect(json).toHaveStyleRule('background-image', 'url(kitten.png)')
  })

  test('renders with custom css', () => {
    const json = render(<Image css={{ backgroundColor: 'tomato' }} />).toJSON()
    expect(json).toHaveStyleRule('background-color', 'tomato')
  })
})
