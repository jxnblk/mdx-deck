import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Deck from '../components/deck'
import splitSlides from '../split-slides'

export const pageQuery = graphql`
  query($id: String!) {
    deck: deck(id: { eq: $id }) {
      id
      body
    }
  }
`

const wrapper = props => {
  const slides = splitSlides(props)
  return <Deck {...props} slides={slides} />
}

const components = {
  wrapper,
}

export default ({
  data: {
    deck: { id, body },
  },
  ...props
}) => {
  const Component = props => <MDXRenderer {...props} children={body} />

  return <Component {...props} components={components} />
}
