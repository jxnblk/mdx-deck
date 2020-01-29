/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import React from 'react'
import { Context, useDeck } from './context'
import modes from './modes'
import Header from './header'
import Footer from './footer'
import Slide from './slide'
import Clock from './clock'
import Timer from './timer'

const Main = ({
  width = '100vw',
  height = '100vh',
  preview = false,
  ...props
}) => {
  const outer = useDeck()
  const context = {
    ...outer,
    main: !preview,
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
        color: 'white',
        bg: 'backdrop',
      }}>
      <div
        sx={{
          width: '60%',
          height: '100vh',
          padding: 3,
        }}>
        <Main
          {...props}
          width='100%'
          height='100%'>
          <Slide>
            {props.slide}
          </Slide>
        </Main>
      </div>
      <Flex
        sx={{
          flexDirection: 'column',
          width: '40%',
          height: '100vh',
          py: 3,
          pr: 3,
          overflowY: 'auto',
        }}>
        <Slide
          width='100%'
          height='100vh'
          zoom={1/2}
          sx={{
          }}>
          {next}
        </Slide>
        <div
          sx={{
            py: 3,
            flex: '1 1 auto',
          }}>
          {props.notes}
        </div>
        <Flex
          sx={{
            alignItems: 'baseline',
            fontFamily: '"Roboto Mono", Menlo, monospace',
          }}>
          <Box>
            {props.index} / {props.slides.length - 1}
          </Box>
          <a
            href='/'
            target='_blank'
            title='Open in new window'
            sx={{
              ml: 3,
              fontWeight: 'bold',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            ⬈
          </a>
          <Box mx='auto' />
          <Box>
            <Timer />
            {' '}
            <Clock />
          </Box>
        </Flex>
      </Flex>
    </div>
  )
}

const Overview = props => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!ref.current) return
    if (typeof ref.current.scrollIntoViewIfNeeded !== 'function') return
    ref.current.scrollIntoViewIfNeeded()
  }, [ref.current])

  return (
    <div
      sx={{
        display: 'flex',
        height: '100vh',
        color: 'white',
        bg: 'backdrop',
      }}>
      <div
        sx={{
          width: '25%',
          height: '100vh',
          overflowY: 'auto',
          p: 2,
        }}>
        {props.slides.map((slide, i) => (
          <div
            key={i}
            ref={i === props.index ? ref : null}
            role='button'
            title={`Go to slide ${i}`}
            onClick={e => {
              props.setIndex(i)
              props.setStep(0)
              props.setSteps(0)
            }}
            sx={{
              p: 2,
              height: '30%'
            }}>
            <Slide
              sx={{
                outline: props.index === i ? '2px solid cyan' : null,
              }}
              zoom={1/4}>
              {slide}
            </Slide>
          </div>
        ))}
      </div>
      <div
        sx={{
          width: '75%',
          py: 3,
          pr: 3,
          pl: 2,
        }}>
        <Main
          {...props}
          width='100%'
          height='100%'>
          <Slide zoom={3/4}>
            {props.slide}
          </Slide>
        </Main>
      </div>
    </div>
  )
}

const Grid = props => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (!ref.current) return
    if (typeof ref.current.scrollIntoViewIfNeeded !== 'function') return
    ref.current.scrollIntoViewIfNeeded()
  }, [ref.current])

  return (
    <div
      sx={{
        minHeight: '100vh',
        color: 'white',
        bg: 'backdrop',
      }}>
      <div
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
        {props.slides.map((slide, i) => (
          <div
            key={i}
            ref={i === props.index ? ref : null}
            role='button'
            title={`Go to slide ${i}`}
            onClick={e => {
              props.setIndex(i)
              props.setStep(0)
              props.setSteps(0)
              props.setMode(modes.default)
            }}
            sx={{
              p: 2,
              width: '25%',
              height: '23vh',
            }}>
            <Slide
              sx={{
                outline: props.index === i ? '2px solid cyan' : null,
              }}
              zoom={1/4}>
              {slide}
            </Slide>
          </div>
        ))}
      </div>
    </div>
  )
}

const Print = props => {
  return (
    <React.Fragment>
      {props.slides.map((slide, i) => (
        <Main key={i} preview>
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
    case modes.grid:
      return <Grid {...props} {...context} />
    case modes.print:
      return <Print {...props} {...context} />
    case modes.default:
    default:
      return <Main {...props} {...context} />
  }
}
