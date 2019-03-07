import React from 'react'
import { graphql } from 'gatsby'
import { MDXDeck } from '@mdx-deck/components'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

export default ({ data }) => {
  console.log('data', data)
  // console.log(data.mdx.code.body)
  // return <pre>hi</pre>
  // may need to implement custom renderer to import from `slides` array
  return <pre children={data.mdx.code.body} />

  return <MDXRenderer children={data.mdx.code.body} />
}

export const pageQuery = graphql`
  query MDXDeckQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      rawBody
      code {
        body
      }
    }
  }
`
