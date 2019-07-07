import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export const pageQuery = graphql`
  query($id: String!) {
    deck: deck(id: { eq: $id }) {
      id
      body
    }
  }
`

export default ({
  data: {
    deck: { id, body },
  },
  ...props
}) => {
  const Component = props => <MDXRenderer {...props} children={body} />
  return <Component />
}
