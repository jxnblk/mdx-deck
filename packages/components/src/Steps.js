import useSteps from './useSteps'

export const Steps = props => {
  const step = useSteps(props.length)
  return props.render({ step })
}

export default Steps
