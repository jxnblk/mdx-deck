import React from 'react'
import { MDXProvider } from '@mdx-js/tag'
import { Router } from '@reach/router'

const _createSlides = children => {
  const slides = React.Children.toArray(children).reduce(
    (acc, child) => {
      if (child.props.name === 'hr') {
        // create a new slide
        acc.push([])
        return acc
      } else {
        console.log(child, child.props)
        acc[acc.length - 1].push(child)
        return acc
      }
    },
    [[]]
  )
  console.log(slides)
  return slides
}

const DefaultLayout = props => {
  return <>{props.children}</>
}

// With layout components
const createSlides = children => {
  const slides = React.Children.toArray(children).reduce(
    (acc, child) => {
      if (child.props.name === 'hr') {
        // create a new slide
        acc.push(<DefaultLayout />)
        return acc
      } else {
        let el = acc[acc.length - 1]
        if (child.props.layout) {
          el = React.cloneElement(child, el.props)
        } else {
          el = React.cloneElement(el, {
            children: [...React.Children.toArray(el.props.children), child],
          })
          // acc[acc.length - 1].props.children.push(child)
        }
        acc[acc.length - 1] = el
        return acc
      }
    },
    [<DefaultLayout />]
  )
  console.log(slides)
  return slides
}

const Slide = props => (
  <div style={{ padding: 32, backgroundColor: 'tomato' }}>{props.content}</div>
)

const wrapper = props => {
  console.log('wrapper props', props)
  const slides = createSlides(props.children)
  return (
    <div style={{ padding: 16, margin: 16, outline: '2px solid cyan' }}>
      <Router>
        {slides.map(
          (slide, i) =>
            console.log(slide) || (
              <Slide key={i} path={'' + i + '/*'} content={slide} />
            )
        )}
      </Router>
    </div>
  )
  return props.children
}

const components = {
  wrapper,
}

export const MDXDeck = ({ Component, ...props }) => (
  <MDXProvider components={components}>
    <>
      MDXDeck
      <Component render={() => 'hi'} />
    </>
  </MDXProvider>
)

export default MDXDeck
