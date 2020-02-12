import React from 'react'
import renderer from 'react-test-renderer'
import Clock from '../src/clock'

const render = el => renderer.create(el).toJSON()

test('renders time', () => {
  const tree = render(<Clock />)
  expect(tree).toMatch(/\d\d:\d\d/)
})
