import React from 'react'
import { useDeck } from './context'
import useSteps from './useSteps'
import { Step } from './useStep'

export const Steps = ({ items, render, ...props }) => {
  const step = useSteps(items ? items.length : props.length)
  return items ? (
    <div>
      {items.map((item, i) => {
        const visible = props.split ? step === i : step >= i
        return (
          visible && (
            <Step key={i} index={i}>
              {render
                ? render(item, i)
                : typeof item === 'function'
                ? item(i)
                : item}
            </Step>
          )
        )
      })}
    </div>
  ) : (
    render({ step })
  )
}

export default Steps
