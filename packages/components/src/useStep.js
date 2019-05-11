import { useContext, createContext } from 'react'

const StepContext = createContext(0)

export const useStep = () => useContext(StepContext)

export const Step = props => (
  <StepContext.Provider value={props.index}>
    {props.children}
  </StepContext.Provider>
)
