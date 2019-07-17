/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Zoom from './zoom'
import Slide from './slide'
import useDeck from '../hooks/use-deck'
import Footer from './presenter-footer'

export const Presenter = ({ slides, children }) => {
  const context = useDeck()
  const next = slides[context.index + 1]
  const notes = context.notes ? React.Children.toArray(context.notes) : false

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
    </div>
  )
}

export default Presenter
