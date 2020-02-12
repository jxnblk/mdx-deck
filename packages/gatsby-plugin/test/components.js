import React from 'react'
import renderer from 'react-test-renderer'
import {
  Notes,
  Head,
  Header,
  Footer,
  Color,
  Invert,
  Steps,
  Image,
  Horizontal,
  Split,
  SplitRight,
  FullScreenCode,
} from '../src/components'

const render = el => renderer.create(el).toJSON()

test('Color renders', () => {
  const json = render(
    <Color bg='tomato' />
  )
  expect(json).toMatchSnapshot()
})

test('Invert renders', () => {
  const json = render(
    <Invert />
  )
  expect(json).toMatchSnapshot()
})

test('Steps renders', () => {
  const json = render(
    <Steps>
      <div>One</div>
      <div>Two</div>
    </Steps>
  )
  expect(json).toMatchSnapshot()
})

test('Steps renders with list', () => {
  const json = render(
    <Steps>
      <ul originalType='ul'>
        <li>One</li>
        <li>Two</li>
      </ul>
    </Steps>
  )
  expect(json).toMatchSnapshot()
})

test('Image renders', () => {
  const json = render(
    <Image src='kittens.png' />
  )
  expect(json).toMatchSnapshot()
})

test('Horizontal renders', () => {
  const json = render(
    <Horizontal>
      <div>A</div>
      <div>B</div>
    </Horizontal>
  )
  expect(json).toMatchSnapshot()
})

test('Split renders', () => {
  const json = render(
    <Split>
      <div>A</div>
      <div>B</div>
    </Split>
  )
  expect(json).toMatchSnapshot()
})

test('SplitRight renders', () => {
  const json = render(
    <SplitRight>
      <div>A</div>
      <div>B</div>
    </SplitRight>
  )
  expect(json).toMatchSnapshot()
})

test('FullScreenCode renders', () => {
  const json = render(
    <FullScreenCode>
      Hi
    </FullScreenCode>
  )
  expect(json).toMatchSnapshot()
})

