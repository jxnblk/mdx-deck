import React from 'react'
import TestRenderer from 'react-test-renderer'
import Appear from '../Appear'

test('Appear renders', () => {
  const json = TestRenderer.create(
    <Appear>
      <h1>Hello</h1>
    </Appear>
  ).toJSON()
  expect(json).toMatchSnapshot()
})
