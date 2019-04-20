import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { graphql } from 'gatsby'
import Layout from '../layouts/deck'

export default props => {
  const { mdx } = props.data
  const Component = props => <MDXRenderer {...props} children={mdx.code.body} />

  return <Layout Component={Component} basepath={props.pageContext.basepath} />
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
