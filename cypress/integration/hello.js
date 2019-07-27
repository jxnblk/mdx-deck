context('MDX Deck', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000')
  })

  it('opens', () => {
    cy.visit('http://localhost:8000')
  })

  it('contains the title', () => {
    cy.contains('MDX Deck')
  })

  /* doesn't work
  it('goes to the next slide', () => {
    cy.get('body')
      .type('{rightarrow}')
      .contains('Presentation')
  })
  */
})
