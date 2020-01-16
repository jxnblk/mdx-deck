/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Context, useDeck } from './context'
import modes from './modes'
import Header from './header'
import Footer from './footer'
import Slide from './slide'

const Main = ({
  width = '100vw',
  height = '100vh',
  preview = false,
  ...props
}) => {
  const outer = useDeck()
  const context = {
    ...outer,
    isMain: !preview,
  }

  return (
    <Context.Provider value={context}>
      <div
        sx={{
          width,
          height,
          position: 'relative',
          overflow: 'hidden',
        }}>
        {props.header && (
          <Header>
            {props.header}
          </Header>
        )}
        {props.children}
        {props.footer && (
          <Footer>
            {props.footer}
          </Footer>
        )}
      </div>
    </Context.Provider>
  )
}

const Presenter = props => {
  const next = props.slides[props.index + 1]

  return (
    <div
      sx={{
        display: 'flex',
        height: '100vh',
      }}>
      <div
        sx={{
          width: '60%',
          height: '100vh',
        }}>
        <Main
          {...props}
          width='100%'
          height='100vh'>
          <Slide>
            {props.slide}
          </Slide>
        </Main>
      </div>
      <div
        sx={{
          width: '40%',
          height: '100vh',
          padding: 3,
          overflowY: 'auto',
          outline: '1px solid cyan',
        }}>
        <Slide
          width='100%'
          height='100vh'
          zoom={1/2}
          sx={{
            outline: '1px solid tomato',
          }}>
          {next}
        </Slide>
        <div>
          {props.notes}
        </div>
      </div>
    </div>
  )
}

const Overview = props => {
  return (
    <div
      sx={{
        display: 'flex',
        height: '100vh',
      }}>
      <div
        sx={{
          width: '25%',
          height: '100vh',
          overflowY: 'auto',
          paddingRight: 3,
          outline: '2px solid red',
        }}>
        {props.slides.map((slide, i) => (
          <Slide key={i}
            sx={{
              outline: '2px solid cyan',
            }}
            width='100%'
            height='25%'
            zoom={1/4}>
            {slide}
          </Slide>
        ))}
      </div>
      <div
        sx={{
          width: '75%',
        }}>
        <Main
          {...props}
          width='75vw'
          height='100vh'>
          <Slide zoom={3/4}>
            {props.slide}
          </Slide>
        </Main>
      </div>
    </div>
  )
}

const Print = props => {
  return (
    <React.Fragment>
      {props.slides.map((slide, i) => (
        <Main key={i} {...props} preview>
          <Slide>
            {slide}
          </Slide>
        </Main>
      ))}
    </React.Fragment>
  )
}

export default props => {
  const context = useDeck()

  switch (context.mode) {
    case modes.presenter:
      return <Presenter {...props} {...context} />
    case modes.overview:
      return <Overview {...props} {...context} />
    case modes.print:
      return <Print {...props} {...context} />
    case modes.default:
    default:
      return <Main {...props} {...context} />
  }
}
