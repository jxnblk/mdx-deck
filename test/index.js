import React from 'react'
import { create as render } from 'react-test-renderer'
import { renderIntoDocument, Simulate } from 'react-dom/test-utils'
import 'jest-styled-components'
import {
  inc,
  dec,
  SlideDeck,
  Carousel,
  Slide,
  Dots,
  Root,
  GoogleFonts
} from '../src'

const renderJSON = el => render(el).toJSON()

describe('components', () => {
  describe('Carousel', () => {
    test('renders', () => {
      const json = renderJSON(<Carousel>Hi</Carousel>)
      expect(json).toMatchInlineSnapshot(`
.c0 {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

.c1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  -webkit-transition-duration: .3s;
  transition-duration: .3s;
  -webkit-transform: translateX(NaN%);
  -ms-transform: translateX(NaN%);
  transform: translateX(NaN%);
}

<div
  className="c0"
>
  <div
    className="c1"
  >
    Hi
  </div>
</div>
`)
    })
  })

  describe('Slide', () => {
    test('renders', () => {
      const json = renderJSON(<Slide>Hi</Slide>)
      expect(json).toMatchInlineSnapshot(`
.c0 {
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding-left: 32px;
  padding-right: 32px;
}

@media screen and (min-width:40em) {
  .c0 {
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media screen and (min-width:52em) {
  .c0 {
    padding-left: 128px;
    padding-right: 128px;
  }
}

<div
  className="c0"
>
  Hi
</div>
`)
    })
  })

  describe('Dots', () => {
    test('renders', () => {
      const json = renderJSON(<Dots index={0} length={1} />)
      expect(json).toMatchInlineSnapshot(`
.c1 {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  color: inherit;
  outline: none;
  opacity: 0.5;
  box-shadow: 0 0 0 1px;
  margin: 0px;
  padding: 4px;
  background-color: currentcolor;
}

.c0 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

<div
  className="c0"
>
  <button
    className="c1"
    onClick={[Function]}
    title="go to: 0"
  />
</div>
`)
    })

    test('renders with index', () => {
      const json = renderJSON(<Dots index={3} length={8} />)
      expect(json).toMatchInlineSnapshot(`
.c2 {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  color: inherit;
  outline: none;
  opacity: 0.5;
  box-shadow: 0 0 0 1px;
  margin: 0px;
  padding: 4px;
  background-color: currentcolor;
}

.c1 {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  color: inherit;
  outline: none;
  opacity: 0.5;
  box-shadow: 0px;
  margin: 0px;
  padding: 4px;
  background-color: currentcolor;
}

.c3 {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
  width: 8px;
  height: 8px;
  color: inherit;
  outline: none;
  opacity: 0.125;
  box-shadow: 0px;
  margin: 0px;
  padding: 4px;
  background-color: currentcolor;
}

.c0 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

<div
  className="c0"
>
  <button
    className="c1"
    onClick={[Function]}
    title="go to: 0"
  />
  <button
    className="c1"
    onClick={[Function]}
    title="go to: 1"
  />
  <button
    className="c1"
    onClick={[Function]}
    title="go to: 2"
  />
  <button
    className="c2"
    onClick={[Function]}
    title="go to: 3"
  />
  <button
    className="c3"
    onClick={[Function]}
    title="go to: 4"
  />
  <button
    className="c3"
    onClick={[Function]}
    title="go to: 5"
  />
  <button
    className="c3"
    onClick={[Function]}
    title="go to: 6"
  />
  <button
    className="c3"
    onClick={[Function]}
    title="go to: 7"
  />
</div>
`)
    })
  })

  describe('Root', () => {
    test('renders', () => {
      const json = renderJSON(<Root>Hi</Root>)
      expect(json).toMatchInlineSnapshot(`
.c0 {
  color: text;
  background-color: background;
}

<div
  className="c0"
  color="text"
>
  Hi
</div>
`)
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
      expect(json).toMatchInlineSnapshot(`
.c1 {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
}

.c2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  -webkit-transition-duration: .3s;
  transition-duration: .3s;
  -webkit-transform: translateX(0%);
  -ms-transform: translateX(0%);
  transform: translateX(0%);
}

.c3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-top: -32px;
  margin-left: auto;
  margin-right: auto;
}

.c0 {
  font-family: system-ui,sans-serif;
  font-size: 16px;
  text-align: center;
  width: 100vw;
  height: 100vh;
  color: #000;
  background-color: transparent;
}

@media screen and (min-width:64em) {
  .c0 {
    font-size: 32px;
  }
}

<div
  className="c0"
  color="text"
  height="100vh"
  width="100vw"
>
  <div
    className="c1"
  >
    <div
      className="c2"
    />
  </div>
  <div
    className="c3"
  />
</div>
`)
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
        key: 'ArrowRight'
      })
      expect(root.state.index).toBe(0)
      document.body.dispatchEvent(e)
      expect(root.state.index).toBe(1)
    })

    test('handles ArrowLeft keydown', () => {
      window.history.pushState(null, null, '/#1')
      const root = renderIntoDocument(
        <SlideDeck slides={[() => false, () => false]} />
      )
      const e = new KeyboardEvent('keydown', {
        key: 'ArrowLeft'
      })
      expect(root.state.index).toBe(1)
      document.body.dispatchEvent(e)
      expect(root.state.index).toBe(0)
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

describe('updaters', () => {
  test('inc', () => {
    const next = inc({ index: 0, length: 8 })
    expect(next.index).toBe(1)
  })
  test('dec', () => {
    const next = dec({ index: 1, length: 8 })
    expect(next.index).toBe(0)
  })
  test('dec 0', () => {
    const next = dec({ index: 0, length: 8 })
    expect(next).toBe(null)
  })
})
