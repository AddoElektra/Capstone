describe('test',{retries:2},()=>{
    it('Test the checkout process with valid payment information',()=>{
        cy.visit('/')
        cy.login(Cypress.env('Email'), Cypress.env('Pass'))
        cy.contains('Mobile Repairing Spare').click({ force: true })
        cy.contains('CHARGING BORD').click({ force: true })
        cy.AddToCart()
        cy.get('div#cart.dropdown').click({ force: true })
        cy.get('a.btn-checkout.btn').click({ force: true })
        // Check if "Out of Stock" element is present
        cy.get('span.text-danger').then(($outOfStock) => {
            if ($outOfStock.length > 0) {
                // If "Out of Stock" element is present, stop the test
                cy.log('Product is out of stock, stopping test')
                cy.screenshot('out-of-stock')
                cy.end()
            } else {
                // If "Out of Stock" element is not present, proceed with checkout
                cy.visit('/index.php?route=checkout/cart')
                cy.Checkout()
                cy.get('div.radio>label>input[value="new"]').click()
                cy.fixture("checkout").then((co) => {
                    cy.get('input#input-payment-firstname').clear().type(co.First)
                    cy.get('input#input-payment-lastname').clear().type(co.Last)
                    cy.get('input#input-payment-company').clear().type(co.Company)
                    cy.get('input#input-payment-address-1').clear().type(co.Add)
                    cy.get('input#input-payment-city').clear().type(co.City)
                    cy.get('input#input-payment-postcode').clear().type(co.Pin)
                })
                cy.get('div.radio>label>input[value="cod"]').check()
                cy.get('div.section-comments').click().type('I Confirm Order')
                cy.get('div.section-body').children('.checkbox').find('input').check()
                cy.screenshot('check-conf')
                cy.get('div.pull-right button').click()
                cy.get('h1.title.page-title').should('be.visible')
                cy.screenshot('confirm-order')
            }
        })
    })
    it('Verify order confirmation and summary',{retries:2},()=>{
        cy.visit('/')
        cy.login(Cypress.env("Email"),Cypress.env('Pass'))
        cy.get('div.top-menu.top-menu-13 > ul').children('li').first().click()
        cy.get('ul.list-unstyled.account-list').eq(1).children('li').first().click()
        cy.get('i.fa.fa-eye').first().click()
        cy.contains('Order Information').should('be.visible')
        cy.screenshot('summury')
    })
})
