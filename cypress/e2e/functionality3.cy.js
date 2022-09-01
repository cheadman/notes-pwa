const getNotes = () => {
    const notes = JSON.parse(localStorage.getItem("notes"))
    return notes
}
describe('functionality', () => {
    it('can add a note', () => {
        const title = 'sdfkjghk'
        const text = 'ahsd flkjahsdf jklahsfljk hasljkf haqljkdhf lqewhuio ahfjkgahsjkfhkasgfkdh ashldjkf akhjsdfas'
        cy.visit('http://localhost:8085')
        cy.get('#title').type(title)
        cy.get('#note-text-area').type(text)
        cy.get('#save').click().then(() => {
            expect(getNotes()[0].id).to.eq(1)
            expect(getNotes()[0].title).to.eq(title)
            expect(getNotes()[0].text).to.eq(text)
        })
        cy.get('#1').contains(title)
        cy.get('#1').contains(text)
        cy.get('#1').contains('Delete')
        cy.get('#1').contains('edit')
    })

    it('can edit a note', () => {
        cy.get('#1').contains('edit').click()
        const title = 'hello'
        const text = 'world'
        cy.get('.modal-content')
        cy.get('.modal-content > .title').clear().type(title)
        cy.get('.modal-content > .text').clear().type(text)
        cy.get('.ok').click().then(() => {
            expect(getNotes()[0].title).to.eq(title)
            expect(getNotes()[0].text).to.eq(text)
        })
    })
    
    it('can cancel an edit', () => {
        cy.get('#1').contains('edit').click()
        const title = "shouldn't"
        const text = 'change'
        cy.get('.modal-content')
        cy.get('.modal-content > .title').clear().type(title)
        cy.get('.modal-content > .text').clear().type(text)
        cy.get('.cancel').click().then(() => {
            cy.get('#1').contains('hello')
            cy.get('#1').contains('world')
        })
    })

    it('can delete a note', () => {
        cy.get('#1').contains('Delete').click()
        cy.get('#1').should('not.exist');
    })

})

