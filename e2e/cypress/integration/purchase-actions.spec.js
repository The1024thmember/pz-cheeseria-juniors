/// <reference types="cypress" />

context('Purchase Button Action', () => {

    //When there is previous purchase history 
    it('Have previous purchase history', () => {
      cy.visit('/');
      cy.get('[data-cy=open-history]').click();
    //Get the the number of previous purchase history
    cy.get('[data-cy=purchase-history-container]').then(($prevHistory)=>{
        //Get previous length of history
        const preLength = $prevHistory.children().length;
        cy.visit('/');
        //Add new purchase
        cy.get('[data-cy=add-to-cart-2]').click();
        cy.get('[data-cy=add-to-cart-3]').click();
        cy.get('[data-cy=open-cart]').click();
        cy.get('[data-cy=purchase-button]').click();    
        cy.visit('/');
        //After new purchase the history container should have preLength+1 children
        cy.get('[data-cy=open-history]').click();
        cy.get('[data-cy=purchase-history-container]').children().should('have.length',preLength+1);
        //Check if the detailed purchase info have two children by clicking preLength+1 th view detail button
        cy.get(`[data-cy=view-detail-history-${preLength+1}]`).click();
        cy.get('[data-cy=purchase-items-container]').children().should('have.length', 2);   
        })
    })
    
    //When there is no previous purchase history 
    it('No previous purchase history', () => {
        cy.visit('/');
        //Add new purchase
        cy.get('[data-cy=add-to-cart-2]').click();
        cy.get('[data-cy=add-to-cart-3]').click();
        cy.get('[data-cy=open-cart]').click();
        cy.get('[data-cy=purchase-button]').click();    
        cy.visit('/');
        //After new purchase the history container should have preLength+1 children
        cy.get('[data-cy=open-history]').click();
        cy.get('[data-cy=purchase-history-container]').children().should('have.length',1);
        //Check if the detailed purchase info have two children by clicking preLength+1 th view detail button
        cy.get(`[data-cy=view-detail-history-1]`).click();
        cy.get('[data-cy=purchase-items-container]').children().should('have.length', 2);   
      })
  
  })
  