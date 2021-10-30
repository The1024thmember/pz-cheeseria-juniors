/// <reference types="cypress" />

context('Item Dialog Action', () => {

    it('Open dialog', () => {
      cy.visit('/');
      cy.get('[data-cy=open-dialog-1]').click();
      cy.get('[data-cy=cheese-dialog-1]');
    })

    it('test add/remove button', () => {
      cy.visit('/');
      cy.get('[data-cy=open-dialog-1]').click();
      cy.get('[data-cy=cheese-amount-1]').then(($cheese)=>{
        const cheeseAmount = parseInt($cheese.text());
        cy.get('[data-cy=add-cheese-1]').click();
        cy.get('[data-cy=cheese-amount-1]').should('have.text',cheeseAmount+1);
        cy.get('[data-cy=remove-cheese-1]').click();
        cy.get('[data-cy=cheese-amount-1]').should('have.text',cheeseAmount);
      });
    })
  
    it('add into cart', () => {
      cy.visit('/');
      cy.get('[data-cy=badge-count]').then(($badge)=>{
        cy.get('[data-cy=open-dialog-1]').click();
        const cartItemNumber = parseInt($badge.text());
        cy.get('[data-cy=add-cheese-1]').click();
        cy.get('[data-cy=update-cart-1]').click();
        cy.get('[data-cy=badge-count]').should('have.text',(cartItemNumber+1).toString());
      });
    })

  })
  