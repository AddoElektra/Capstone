describe('test',()=>{
    beforeEach(()=>{
        cy.visit('/')
    })
    it('Verify that the homepage loads correctly',()=>{
         cy.get('#logo img').should('have.attr','title','myShop').and('be.visible')
         cy.get('#logo img').screenshot('logo')
         //verify that the homepage Img is being vesible 
    })
    it('Check that product categories are displayed',()=>{
        cy.get('#column-right ').xpath('//div/h3').should('contain','Top Categories')
        cy.get('#column-right ').xpath('//div/h3')
        cy.screenshot('Top-Categories')
        //check weather if page contain category
        cy.get('#column-right').xpath('//div[@class="icons-menu icons-menu-209"]/ul').as('product-cat')
        //aliasing the complex path for categories
        cy.get('@product-cat').children().should('have.length',6) 
        // checks that the product categories contains 6 element or not
        cy.get('@product-cat').should('be.visible')    
        //check if all the categories are visible  
        cy.screenshot('List')
    })
})