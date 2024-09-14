// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const compareSnapshotCommand = require('cypress-image-diff-js/command');
compareSnapshotCommand();








Cypress.Commands.add('Search',()=>{
    cy.visit('https://myshop.org.in/index.php?route=product/category&path=237_255')
})

Cypress.Commands.add('login',(Email,Pass)=>{
    cy.contains('Login').click()
    cy.frameLoaded()
    cy.iframe().find('input#input-email').click().type(Email)
    cy.iframe().find('input#input-password').click().type(Pass)
    cy.iframe().find('button.btn.btn-primary').click()
})

Cypress.Commands.add('GoToCart',()=>{
    cy.visit('/index.php?route=product/category&path=237_255')
    cy.get('div.cart-group').eq(6).click()
    cy.get('div.cart-group').eq(7).click()
    cy.get('div.cart-group').eq(8).click()
    cy.get('i.fa.fa-shopping-cart').click()
    cy.get('div.cart-buttons').children('a.btn-cart.btn').click({force:true})
})

Cypress.Commands.add('AddToCart',()=>{
    cy.get('div.cart-group').eq(6).click()
    cy.get('div.cart-group').eq(7).click()
    cy.get('div.cart-group').eq(8).click()
})

Cypress.Commands.add('Checkout',()=>{
    cy.login(Cypress.env('Email'),Cypress.env('Pass'))
    cy.get('div.buttons.clearfix').children('div.pull-right').find('a.btn.btn-primary').click()
})