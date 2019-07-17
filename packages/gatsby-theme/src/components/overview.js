/** @jsx jsx */
import { jsx } from 'theme-ui'
import { navigate } from '@reach/router'
import useDeck from '../hooks/use-deck'
import Zoom from './zoom'
import SlideList from './slide-list'

export default ({ slides, children }) => {
  const { slug, index, length } = useDeck()

  return (
    <div
      sx={{
        display: 'flex',
        height: '100vh',
        fontFamily: 'ui',
        color: 'white',
        bg: 'black',
      }}>
      <div
        sx={{
          width: 100 / 6 + '%',
          minWidth: 0,
          flex: 'none',
          height: '100vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          p: 2,
        }}>
        <SlideList
          slides={slides}
          zoom={1 / 6}
          onClick={i => {
            navigate([slug, i].join('/'))
          }}
        />
      </div>
      <div
        sx={{
          width: 500 / 6 + '%',
          py: 3,
          pr: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}>
        <div
          sx={{
            flex: '1 1 auto',
          }}>
          <Zoom zoom={5 / 6}>{children}</Zoom>
        </div>
        <div
          sx={{
            py: 3,
          }}>
          {index} / {length - 1}
        </div>
      </div>
    </div>
  )
}
