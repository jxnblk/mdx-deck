import React from 'react'
import { create as render } from 'react-test-renderer'
import { renderIntoDocument, Simulate } from 'react-dom/test-utils'
import 'jest-styled-components'
import Carousel from '../src/Carousel'
import Slide from '../src/Slide'
import Dots from '../src/Dots'
import Root from '../src/Root'
import GoogleFonts from '../src/GoogleFonts'
import { SlideDeck } from '../src'

const renderJSON = el => render(el).toJSON()

describe('components', () => {
  describe('Carousel', () => {
    test('renders', () => {
      const json = renderJSON(<Carousel index={1}>Hi</Carousel>)
      expect(json).toMatchSnapshot()
    })
  })

  describe('Slide', () => {
    test('renders', () => {
      const json = renderJSON(<Slide index={1}>Hi</Slide>)
      expect(json).toMatchSnapshot()
    })
  })

  describe('Dots', () => {
    test('renders', () => {
      const json = renderJSON(<Dots index={0} length={1} />)
      expect(json).toMatchSnapshot()
    })

    test('renders with index', () => {
      const json = renderJSON(<Dots index={3} length={8} />)
      expect(json).toMatchSnapshot()
    })
  })

  describe('Root', () => {
    test('renders', () => {
      const json = renderJSON(<Root>Hi</Root>)
      expect(json).toMatchSnapshot()
    })

    test('renders with font', () => {
      const json = renderJSON(
        <Root
          theme={{
            font: 'Roboto'
          }}
        />
      )
      expect(json).toHaveStyleRule('font-family', 'Roboto')
    })

    test('renders with colors', () => {
      const json = renderJSON(
        <Root
          theme={{
            colors: {
              text: 'tomato',
              background: 'black'
            }
          }}
        />
      )
      expect(json).toHaveStyleRule('color', 'tomato')
      expect(json).toHaveStyleRule('background-color', 'black')
    })
  })

  describe('GoogleFonts', () => {
    test('renders with link tag', () => {
      const json = renderJSON(
        <GoogleFonts
          theme={{
            font: '"Roboto Mono"'
          }}
        />
      )
      expect(json.type).toBe('link')
    })

    test('renders with two link tags', () => {
      const json = renderJSON(
        <GoogleFonts
          theme={{
            font: '"Roboto"',
            monospace: '"Roboto Mono"'
          }}
        />
      )
      expect(json.length).toBe(2)
    })
  })

  describe('SlideDeck', () => {
    test('renders', () => {
      const json = renderJSON(<SlideDeck slides={[]} />)
      expect(json).toMatchSnapshot(``)
    })

    test('renders with slides', () => {
      const Hello = () => <h1>Hello</h1>
      const root = render(<SlideDeck slides={[Hello]} />).root
      const hello = root.findByType(Hello)
      expect(hello)
    })

    test('initializes state from window.location.hash', () => {
      window.history.pushState(null, null, '/#2')
      const root = renderIntoDocument(<SlideDeck />)
      expect(root.state.index).toBe(2)
    })

    test('handles keydown events', () => {
      window.history.pushState(null, null, '/')
      const root = renderIntoDocument(
        <SlideDeck slides={[() => false, () => false]} />
      )
      const e = new KeyboardEvent('keydown', {
        keyCode: 39
      })
      expect(root.state.index).toBe(0)
      document.body.dispatchEvent(e)
      expect(root.state.index).toBe(1)
    })

    test('handles left arrow keydown', () => {
      window.history.pushState(null, null, '/#1')
      const root = renderIntoDocument(
        <SlideDeck slides={[() => false, () => false]} />
      )
      const e = new KeyboardEvent('keydown', {
        keyCode: 37
      })
      expect(root.state.index).toBe(1)
      document.body.dispatchEvent(e)
      expect(root.state.index).toBe(0)
    })

    test('ignoreKeyEvents does not fire handle events when set to true', () => {
      window.history.pushState(null, null, '/#1')
      const root = renderIntoDocument(
        <SlideDeck ignoreKeyEvents={true} slides={[() => false, () => false]} />
      )
      const e = new KeyboardEvent('keydown', {
        keyCode: 37
      })
      expect(root.state.index).toBe(1)
      document.body.dispatchEvent(e)
      expect(root.state.index).toBe(1)
    })

    test.skip('handles hashchange events', () => {
      window.history.pushState(null, null, '/')
      const root = renderIntoDocument(
        <SlideDeck slides={[() => false, () => false]} />
      )
      expect(root.state.index).toBe(0)
      window.location.hash = '#1'
      expect(root.state.index).toBe(1)
    })
  })
})

