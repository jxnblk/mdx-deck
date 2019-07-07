import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { graphql } from 'gatsby'
import Layout from '../layouts/deck'

export default props => {
  const { mdx } = props.data
  const Component = props => <MDXRenderer {...props} children={mdx.body} />

  return <Layout Component={Component} basepath={props.pageContext.basepath} />
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`
