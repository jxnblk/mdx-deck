import React from 'react'
import TestRenderer from 'react-test-renderer'
import Steps from '../Steps'

test('Steps renders', () => {
  const json = TestRenderer.create(<Steps render={() => 'hi'} />).toJSON()
  expect(json).toMatchSnapshot()
})
