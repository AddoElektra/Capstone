describe('test',{retries:2},()=>{
    it('Test login functionality with valid ',{retries:1},()=>{
        cy.visit('/')
        cy.login(Cypress.env('Email'),Cypress.env('Pass'))  //Custum Command fot login 
        cy.contains('Logout').should('be.visible')
        cy.screenshot('login')
    })
    it('Test login functionality with invalid credentials',()=>{
        cy.visit('/')
        cy.contains('Login').click()
        cy.frameLoaded()
        cy.iframe().find('input#input-email').click().type(Cypress.env('Wr-Email'))
        cy.iframe().find('input#input-password').click().type(Cypress.env('Wr-Pass'))
        cy.iframe().find('button.btn.btn-primary')
        cy.screenshot('inval-login')
        // .click()
        // cy.on('window:alert', (str) => {
        //     expect(str).to.equal('Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.')
        //     return true
        //   })
    })
    it('Test logout functionality',{retries:2},()=>{
        cy.visit('/')
        cy.login(Cypress.env('Email'),Cypress.env('Pass'))
        cy.contains('Logout').click()
        cy.get('h1.title.page-title').should('contain','Account Logout')
        cy.screenshot('logout')
        cy.get('div.pull-right > a').click()
    })
})
