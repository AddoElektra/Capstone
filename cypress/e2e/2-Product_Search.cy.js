describe('test',{retries:1},()=>{
    it('Test the search functionality for various product queries',()=>{
        cy.visit('/')
        cy.get('span.twitter-typeahead [name="search"]').as('search')

        //search for existing products
        cy.get('@search').type('MCB{enter}')    //type MCB in the sarch bar
        cy.get('h1.title.page-title').should('contain','Search - MCB').and('be.visible')
        cy.screenshot('search1')

        cy.get('@search').clear().type('Mobile Charger{enter}') //type Mobile Charger in the sarch bar
        cy.get('h1.title.page-title').should('contain','Search - Mobile Charger').and('be.visible')
        cy.screenshot('search2')

        //serach for non existing products
        cy.get('@search').clear().type('diary{enter}')  //type dairy in the sarch bar
        cy.get('div>p').should('contain','There is no product that matches the search criteria.').and('be.visible')
        cy.screenshot('serach3')

        //search for multiple words
        cy.get('@search').clear().type('led bulb watt 9{enter}')  //type led bulb watt 9 in the sarch bar
        cy.get('h1.title.page-title').should('contain','Search - led bulb watt 9').and('be.visible')
        cy.screenshot("search4")

        //search for partial words
        cy.get('@search').clear().type('power ba{enter}')  //type power ba in the sarch bar
        cy.get('h1.title.page-title').should('contain','Search - power ba').and('be.visible')
        cy.screenshot('search5')

        //search for special characters
        cy.get('@search').clear().type('laptop!{enter}')  //type laptop! in the sarch bar
        cy.get('div>p').should('contain','There is no product that matches the search criteria.').and('be.visible')
        cy.screenshot('search5')
    })

    it('Verify search results',()=>{
        cy.visit('/')
        cy.get('span.twitter-typeahead [name="search"]').type('Tata{enter}') //type+enter

       //Verify search results contain the expected product
        cy.get('h1.title.page-title').should('contain','Search - Tata').and('be.visible')
        cy.get('div.main-products.product-grid').children().as('search-result')
        cy.get('@search-result').should('contain','TATA SKY HD Digital Set Top Box')
        cy.screenshot('search-result')

        //verify search results count
        cy.get('@search-result').should('have.length.at.least',1)
        .and('be.visible')

        // Verify search results do not contain unexpected products
        cy.get('@search-result').should('not.contain', 'Mobile Charger')

        //Verify search results product details
        cy.xpath('//div[@class="product-layout  has-extra-button"]//div').filter('div.description')
        .should('not.be.visible')
    })
})
