import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { graphql } from 'gatsby'
import Layout from './layout'

export default props => {
  const { mdx } = props.data
  const children = <MDXRenderer children={mdx.code.body} />
  return <Layout {...props} children={children} />
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
    }
  }
`
