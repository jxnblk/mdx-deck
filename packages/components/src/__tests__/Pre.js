import React from 'react'
import TestRenderer from 'react-test-renderer'
import Pre from '../Pre'

test('Pre renders', () => {
  const json = TestRenderer.create(<Pre children="hi" />).toJSON()
  expect(json).toMatchSnapshot()
})
