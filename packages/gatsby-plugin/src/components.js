const createComponent = key => {
  const Component = () => false
  Component.__mdxDeck = true
  Component[`__mdxDeck_${key}`] = true
  return Component
}

export const Notes = createComponent('notes')
export const Head = createComponent('head')
export const Header = createComponent('header')
export const Footer = createComponent('footer')

