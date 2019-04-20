import React from 'react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import { graphql } from 'gatsby'
import { MDXDeck, splitSlides } from '@mdx-deck/components'

const Wrapper = props => <MDXDeck {...splitSlides(props)} />

export default props => {
  const { mdx } = props.data
  const Component = props => <MDXRenderer {...props} children={mdx.code.body} />

  return (
    <Component
      basepath={props.pageContext.basepath}
      components={{
        wrapper: Wrapper,
      }}
    />
  )
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
