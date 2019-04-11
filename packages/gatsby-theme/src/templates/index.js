import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import get from 'lodash.get'
import Layout from '../layouts/index'

const getTitle = node => {
  const headings = node.headings.filter(h => h.depth === 1)
  return get(headings, `0.value`, node.slug)
}

export default props => {
  const decks = props.data.allMdx.edges
    .map(({ node }) => ({
      ...node,
      slug: node.fields.deck,
      title: getTitle(node),
      children: <MDXRenderer children={node.code.body} />,
    }))
    .filter(node => node.parent.sourceInstanceName === 'decks')
  return <Layout {...props} decks={decks} />
}

export const query = graphql`
  {
    allMdx {
      edges {
        node {
          id
          fields {
            deck
          }
          code {
            body
          }
          headings {
            depth
            value
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  }
`
