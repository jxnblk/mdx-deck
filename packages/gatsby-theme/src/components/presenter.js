/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Zoom from './zoom'
import Slide from './slide'
import useDeck from '../hooks/use-deck'
import Footer from './presenter-footer'
import { presenterModes } from '../constants'

const NormalLayout = ({ next, notes, children }) => (
  <React.Fragment>
    <div
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        height: '60vh',
      }}>
      <div
        sx={{
          width: '75%',
          p: 3,
        }}>
        <Zoom zoom={3 / 4}>{children}</Zoom>
      </div>
      <div
        sx={{
          width: '25%',
          p: 3,
        }}>
        <Zoom ratio={4 / 3} zoom={1 / 4}>
          <Slide slide={next} preview />
        </Zoom>
        {notes && (
          <div
            sx={{
              my: 3,
            }}>
            {notes}
          </div>
        )}
      </div>
    </div>
    <div
      sx={{
        height: 96,
        p: 3,
        display: 'flex',
        alignItems: 'center',
        fontSize: 1,
        fontWeight: 'bold',
        fontVariantNumeric: 'tabular-nums',
      }}>
      <Footer />
    </div>
  </React.Fragment>
)

const TallLayout = ({ next, notes, children }) => (
  <div
    sx={{
      display: 'flex',
      height: '100%',
    }}>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        p: 3,
      }}>
      <div
        sx={{
          height: '50%',
          paddingBottom: 3,
        }}>
        <Zoom zoom={1 / 2}>{children}</Zoom>
      </div>
      <div
        sx={{
          height: '50%',
        }}>
        <Zoom zoom={1 / 2}>
          <Slide slide={next} preview />
        </Zoom>
      </div>
    </div>
    <div
      sx={{
        width: '55%',
        p: 3,
      }}>
      {notes && (
        <div
          sx={{
            my: 3,
          }}>
          {notes}
        </div>
      )}
      <div
        sx={{
          position: 'absolute',
          bottom: 0,
          height: 96,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          fontSize: 1,
          fontWeight: 'bold',
          fontVariantNumeric: 'tabular-nums',
        }}>
        <Footer />
      </div>
    </div>
  </div>
)

const NotesLayout = ({ notes }) => (
  <div
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      height: '60vh',
    }}>
    <div
      sx={{
        height: 96,
        p: 3,
        display: 'flex',
        alignItems: 'center',
        fontSize: 1,
        fontWeight: 'bold',
        fontVariantNumeric: 'tabular-nums',
      }}>
      <Footer />
    </div>
    <div
      sx={{
        p: 3,
      }}>
      {notes && (
        <div
          sx={{
            my: 3,
          }}>
          {notes}
        </div>
      )}
    </div>
  </div>
)

const WideLayout = ({ next, notes, children }) => (
  <div
    sx={{
      height: '60vh',
    }}>
    <div
      sx={{
        display: 'flex',
        flexDirection: 'row',
        p: 3,
      }}>
      <div sx={{ width: '50%', marginRight: 3 }}>
        <Zoom ratio={18 / 6} zoom={1 / 4}>
          {children}
        </Zoom>
      </div>
      <div sx={{ width: '50%' }}>
        <Zoom ratio={18 / 6} zoom={1 / 4}>
          <Slide slide={next} preview />
        </Zoom>
      </div>
    </div>
    <div
      sx={{
        p: 3,
      }}>
      {notes && (
        <div
          sx={{
            my: 3,
          }}>
          {notes}
        </div>
      )}
      <div
        sx={{
          position: 'absolute',
          bottom: 0,
          height: 96,
          p: 3,
          display: 'flex',
          alignItems: 'center',
          fontSize: 1,
          fontWeight: 'bold',
          fontVariantNumeric: 'tabular-nums',
        }}>
        <Footer />
      </div>
    </div>
  </div>
)

const layouts = {
  [presenterModes.normal]: NormalLayout,
  [presenterModes.tall]: TallLayout,
  [presenterModes.notes]: NotesLayout,
  [presenterModes.wide]: WideLayout,
}

export const Presenter = ({ slides, children }) => {
  const context = useDeck()
  const next = slides[context.index + 1]
  const notes = context.notes ? React.Children.toArray(context.notes) : false

  const Layout = layouts[context.presenterMode]

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        fontFamily: 'ui',
        color: 'white',
        bg: 'black',
      }}>
      <Layout next={next} notes={notes} children={children} />
    </div>
  )
}

export default Presenter
