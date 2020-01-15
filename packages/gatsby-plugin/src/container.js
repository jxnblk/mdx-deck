/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Context, useDeck } from './context'
import modes from './modes'
import Header from './header'
import Footer from './footer'
import Slide from './slide'

const Main = ({
  width = '100vw',
  height = '100vh',
  ...props
}) => {
  const outer = useDeck()
  const context = {
    ...outer,
    isMain: true,
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
    <div>
      <Main
        {...props}
        width='50vw'
        height='50vh'>
        <Slide>
          {props.slide}
        </Slide>
      </Main>
      <div>
        <Slide>
          {next}
        </Slide>
      </div>
      <div>
        {props.notes}
      </div>
    </div>
  )
}

const Overview = props => {
  return <pre>Overview</pre>
}

const Print = props => {
  return <pre>Print</pre>
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
