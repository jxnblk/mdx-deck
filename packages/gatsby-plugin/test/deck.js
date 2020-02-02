import React from 'react'
import {
  render,
  fireEvent,
  cleanup
} from '@testing-library/react'
import Deck from '../src/deck'
import {
  Steps,
  Header,
  Footer,
} from '../src'

afterEach(cleanup)

let __key = 0
const Comp = ({
  originalType,
  mdxType,
  ...props
}) => React.createElement(originalType, props)

const x = (tag, props, children) =>
  React.createElement(Comp, {
    key: __key++,
    tag,
    originalType: tag,
    mdxType: tag,
    ...props
  }, children)

const mdx = [
  x('div', null, 'One'),
  x('hr', null),
  x('div', null, 'Two'),
]

const deckProps = {
  children: mdx,
  location: {
    hash: '',
    pathname: '/',
  },
  navigate: jest.fn()
}

test('renders', () => {
  const tree = render(
    <Deck {...deckProps} />
  )
  const text = tree.getByText('One')
  expect(text).toBeTruthy()
})

test('advances one slide with right arrow key', () => {
  const tree =render (
    <Deck {...deckProps} />
  )
  fireEvent.keyDown(document.body, {
    keyCode: 39,
  })
  const text = tree.getByText('Two')
  expect(text).toBeTruthy()
})

test('advances one slide with down arrow key', () => {
  const tree =render (
    <Deck {...deckProps} />
  )
  fireEvent.keyDown(document.body, {
    keyCode: 40,
  })
  const text = tree.getByText('Two')
  expect(text).toBeTruthy()
})

test('advances one slide with spacebar key', () => {
  const tree =render (
    <Deck {...deckProps} />
  )
  fireEvent.keyDown(document.body, {
    keyCode: 32,
  })
  const text = tree.getByText('Two')
  expect(text).toBeTruthy()
})

test('advances one slide with page down key', () => {
  const tree =render (
    <Deck {...deckProps} />
  )
  fireEvent.keyDown(document.body, {
    keyCode: 34,
  })
  const text = tree.getByText('Two')
  expect(text).toBeTruthy()
})

test('goes back one slide with left arrow key', () => {
  const tree =render (
    <Deck
      {...deckProps}
      location={{
        hash: '#2',
      }}
    />
  )
  fireEvent.keyDown(document.body, {
    keyCode: 37,
  })
  const text = tree.getByText('One')
  expect(text).toBeTruthy()
})

test('goes back one slide with up arrow key', () => {
  const tree =render (
    <Deck
      {...deckProps}
      location={{
        hash: '#2',
      }}
    />
  )
  fireEvent.keyDown(document.body, {
    keyCode: 38,
  })
  const text = tree.getByText('One')
  expect(text).toBeTruthy()
})

test('goes back one slide with page up key', () => {
  const tree =render (
    <Deck
      {...deckProps}
      location={{
        hash: '#2',
      }}
    />
  )
  fireEvent.keyDown(document.body, {
    keyCode: 33,
  })
  const text = tree.getByText('One')
  expect(text).toBeTruthy()
})

test('goes back one slide with shift + space bar', () => {
  const tree =render (
    <Deck
      {...deckProps}
      location={{
        hash: '#2',
      }}
    />
  )
  fireEvent.keyDown(document.body, {
    shiftKey: true,
    keyCode: 32,
  })
  const text = tree.getByText('One')
  expect(text).toBeTruthy()
})

test('ignores meta keys', () => {
  const tree =render (
    <Deck {...deckProps} />
  )
  fireEvent.keyDown(document.body, {
    metaKey: true,
    keyCode: 39,
  })
  const text = tree.getByText('One')
  expect(text).toBeTruthy()
})

test('ignores ctrl keys', () => {
  const tree =render (
    <Deck {...deckProps} />
  )
  fireEvent.keyDown(document.body, {
    ctrlKey: true,
    keyCode: 39,
  })
  const text = tree.getByText('One')
  expect(text).toBeTruthy()
})

test('initializes print mode', () => {
  const tree =render (
    <Deck
      {...deckProps}
      location={{
        hash: '',
        pathname: '/print'
      }}
    />
  )
  const one = tree.getByText('One')
  const two = tree.getByText('Two')
  expect(one).toBeTruthy()
  expect(two).toBeTruthy()
})

describe('steps', () => {
  const children = [
    x('div', null,
      <Steps>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Steps>
    ),
    x('hr', null),
    x('div', null, 'Two'),
  ]

  test('increments step', () => {
    const tree =render (
      <Deck
        {...deckProps}
        children={children}
      />
    )
    fireEvent.keyDown(document.body, {
      keyCode: 39,
    })
    const a = tree.getByText('A')
    const b = tree.getByText('B')
    expect(a.style.visibility).toBe('visible')
    expect(b.style.visibility).toBe('hidden')
  })

  test('decrements step', () => {
    const tree =render (
      <Deck
        {...deckProps}
        children={children}
      />
    )
    fireEvent.keyDown(document.body, { keyCode: 39 })
    fireEvent.keyDown(document.body, { keyCode: 39 })
    fireEvent.keyDown(document.body, { keyCode: 37 })
    const a = tree.getByText('A')
    const b = tree.getByText('B')
    expect(a.style.visibility).toBe('visible')
    expect(b.style.visibility).toBe('hidden')
  })
})

test('renders with Header and Footer', () => {
  const children = [
    x(Header, null, 'Header'),
    x(Footer, null, 'Footer'),
    x('div', null, 'Beep'),
    x('hr', null),
    x('div', null, 'Two'),
  ]
  const tree =render (
    <Deck
      {...deckProps}
      children={children}
    />
  )
  const header = tree.getByText('Header')
  const footer = tree.getByText('Footer')
  expect(header).toBeTruthy()
  expect(footer).toBeTruthy()
})

test('option + p toggles presenter mode', () => {
  let context
})
