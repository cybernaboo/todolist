const dateUtil=require('../../src/taches_utils')

it('visits base url', () => {
    cy.visit('/') 
    cy.get('#tache').type('Faire test Cypress')
    cy.get('#echeance').type(dateUtil.dateDay())
    cy.get('#submit').click()
    cy.get('#table').contains('Faire test Cypress')
  })