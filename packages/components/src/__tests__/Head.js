import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Head, HeadProvider } from '../Head'

test.skip('Head populates HeadProvider‘s tag prop', () => {
  const tags = []
  TestRenderer.create(
    <HeadProvider tags={tags}>
      <Head>
        <title>Hello</title>
      </Head>
    </HeadProvider>
  )
  expect(tags.length).toBe(1)
})
