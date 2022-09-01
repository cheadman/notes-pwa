describe('checking page load', () => {
  it('loads as expected', () => {
    cy.visit('http://localhost:8085')
    cy.get('h1').contains('Notes')
    cy.get('[for="title"]').contains('Title')
    cy.get('[for="note-text-area"]').contains('Content')
    cy.get('#save').contains('Save').should('have.css', 'background-color', 'rgb(34, 136, 51)')
    cy.get('body').should('have.css', 'background-color', 'rgb(223, 223, 170)')
  })
})
