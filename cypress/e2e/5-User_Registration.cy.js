describe('test',{retries:2}, () => {
    it('Test user registration with valid inputs', () => {
        cy.visit('/')
        cy.get('.top-menu.top-menu-13>ul.j-menu').children().eq(1).click()
        cy.get('.popup-body').should('be.visible')
        cy.frameLoaded()    //Registrstion with Valid Inputs
          cy.iframe().find('div.col-sm-10>input#input-firstname').click().type(Cypress.env('FName'))
          cy.iframe().find('input#input-lastname').click().type(Cypress.env("LName"))
          cy.iframe().find('input#input-email').click().type(Cypress.env('REmail'))
          cy.iframe().find('input#input-telephone').click().type(Cypress.env('Tel-No'))
          cy.iframe().find('input#input-password').click().type(Cypress.env('Pass'))
          cy.iframe().find('input#input-confirm').click().type(Cypress.env('Pass'))
          cy.iframe().find('input[type="checkbox"]').check()
          cy.screenshot('registration')
          cy.iframe().find('button[type="submit"]').click()
        cy.get('div.top-menu.top-menu-13>ul.j-menu').children().first().should('contain','Account').click()
        cy.get('h1.title.page-title').should('contain','My Account')
    })

    it ('Test user registration with invalid inputs',{retries:2},()=>{
        cy.visit('/')
        cy.get('.top-menu.top-menu-13>ul.j-menu').children().eq(1).click()
        cy.get('.popup-body').should('be.visible')
        cy.frameLoaded()    //Registrstion with InValid Inputs
          cy.iframe().find('div.col-sm-10>input#input-firstname').click().type(Cypress.env('FName'))
          cy.iframe().find('input#input-lastname').click().type(Cypress.env("LName"))
          cy.iframe().find('input#input-email').click().type(Cypress.env('Wr-Email'))
          cy.iframe().find('input#input-telephone').click().type(Cypress.env('Wr-Tel'))
          cy.iframe().find('input#input-password').click().type(Cypress.env('Wr-Pass'))
          cy.iframe().find('input#input-confirm').click().type(Cypress.env('Wr-Pass'))
          cy.iframe().find('input[type="checkbox"]').check()
          cy.iframe().find('button[type="submit"]').click({force:true}).wait(500)
          cy.iframe().find('div.text-danger').first().should('contain','E-Mail Address does not appear to be valid!')
          .and('be.visible')
          cy.iframe().find('div.text-danger').eq(1).should('contain','Telephone must be between 3 and 32 characters!')
          .and('be.visible')
          cy.iframe().find('div.text-danger').eq(2).should('contain','Password must be between 4 and 20 characters!')
          .and('be.visible')
          cy.screenshot('inval-reg')
    })
    it('Verify successful registration and email confirmation',{retries:2},()=>{
       cy.visit('/')
       cy.login(Cypress.env('Email'),Cypress.env('Pass')) //Custom Command LogIn
       cy.get('div.top-menu.top-menu-13>ul.j-menu').children().first().should('contain','Account').click()
       cy.get('h1.title.page-title').should('contain','My Account') //Succesful Registration
       cy.contains('Edit your account information').click()
       //Email Confirmation
       cy.get('input#input-email').invoke('val')
       .then((Inputvalue)=>{
        expect(Inputvalue).to.eq(Cypress.env('Email'))
        cy.screenshot('email')
       })
    })
})
