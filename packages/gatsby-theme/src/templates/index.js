import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from '../layouts/index'

export default props => {
  const decks = props.data.allMdx.edges.map(({ node }) => ({
    ...node,
    slug: node.fields.slug,
    children: <MDXRenderer children={node.code.body} />,
  }))
  return <Layout {...props} decks={decks} />
}

// todo: filter??
export const query = graphql`
  {
    allMdx {
      edges {
        node {
          id
          fields {
            slug
          }
          code {
            body
          }
        }
      }
    }
  }
`
