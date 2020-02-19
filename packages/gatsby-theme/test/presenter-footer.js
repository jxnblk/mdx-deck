import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import PresenterFooter, {
  getNextPresenterMode,
} from '../src/components/presenter-footer'
import { presenterModes } from '../src/constants'
import DeckContext from '../src/context'

describe('present-footer', () => {
  afterEach(cleanup)

  describe('getNextPresenterMode', () => {
    it.each`
      currentPresenterMode     | expectedPresenterMode
      ${presenterModes.normal} | ${presenterModes.tall}
      ${presenterModes.tall}   | ${presenterModes.wide}
      ${presenterModes.wide}   | ${presenterModes.notes}
      ${presenterModes.notes}  | ${presenterModes.normal}
    `(
      'should return $expectedPresenterMode when presenter mode is $currentPresenterMode',
      ({ currentPresenterMode, expectedPresenterMode }) => {
        const nextPresenterMode = getNextPresenterMode(currentPresenterMode)
        expect(nextPresenterMode).toBe(expectedPresenterMode)
      }
    )
  })

  describe('<PresenterFooter />', () => {
    const PresenterFooterWithContext = ({ context }) => (
      <DeckContext.Provider value={context}>
        <PresenterFooter />
      </DeckContext.Provider>
    )

    it('should update the presenter mode when user click on persenter mode icon', () => {
      const context = {
        index: 0,
        length: 2,
        presenterMode: presenterModes.normal,
        setState: jest.fn(),
      }
      const { getByTestId } = render(
        <PresenterFooterWithContext context={context} />
      )

      fireEvent.click(getByTestId('normalIcon'))

      expect(context.setState).toBeCalledTimes(1)
      expect(context.setState).toBeCalledWith({
        presenterMode: presenterModes.tall,
      })
    })
  })
})
