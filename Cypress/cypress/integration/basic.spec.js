describe('Prueba local', () => {

    it('Test', () => {
        cy.visit('http://192.168.1.133:8010/')
        cy.get('#mat-input-1').type('admin')
        cy.get('.mat-card-actions > .mat-focus-indicator').click()
        cy.get('h1').should('contain', 'Inicio')
    });

});