/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useDeck } from './context'
import modes from './modes'
import Header from './header'
import Footer from './footer'

const Main = props =>
  <div
    sx={{
      width: '100vw',
      height: '100vh',
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


const Presenter = props => {
  return <pre>Presenter</pre>
}

const Overview = props => {
  return <pre>Overview</pre>
}

const Print = props => {
  return <pre>Print</pre>
}


export default props => {
  const context = useDeck()
  console.log(context)

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
