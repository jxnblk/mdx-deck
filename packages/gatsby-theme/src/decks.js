import React from 'react'
import { graphql, Link } from 'gatsby'

const Index = props => {
  return (
    <>
      <h1>MDX Decks</h1>
      <ul>
        {props.decks.map(deck => (
          <li key={deck.id}>
            <Link to={deck.slug}>{deck.slug}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default props => {
  const decks = props.data.allMdx.edges.map(({ node }) => ({
    ...node,
    slug: node.fields.slug,
  }))
  return <Index {...props} decks={decks} />
}

export const query = graphql`
  {
    allMdx {
      edges {
        node {
          id
          fields {
            slug
          }
        }
      }
    }
  }
`
