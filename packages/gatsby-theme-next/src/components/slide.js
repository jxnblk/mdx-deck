/** @jsx jsx */
import { jsx } from 'theme-ui'
import Context from '../context'
import useDeck from '../hooks/use-deck'

export const Slide = ({ slide, index, ...props }) => {
  const outer = useDeck()
  const context = {
    ...outer,
    index,
  }
  return (
    <Context.Provider value={context}>
      <div
        sx={{
          width: '100%',
          height: '100%',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          variant: 'styles.Slide',
        }}>
        {slide}
      </div>
    </Context.Provider>
  )
}

export default Slide
