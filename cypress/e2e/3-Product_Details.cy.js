describe('test',()=>{
    it('Validate that product detail pages display accurate information',()=>{
        cy.visit('/')
        cy.get('span.twitter-typeahead [name="search"]').as('search')
        cy.fixture('product').then((product) => {
            cy.get('@search').clear().type('TWS-Ultrapods{enter}')
            cy.get('div.product-thumb').eq(6).children().eq(1).children('.name').children().as('description')
            cy.get('div.product-thumb').eq(6).children().eq(1).children('.stats').children('.stat-2').as('title') 
            cy.get('div.product-thumb').eq(6).children().eq(1).children('.price').children().children('.price-new').as('price')
            cy.get('div>img.img-responsive.img-first').eq(6).as('image')

            //Product description
            cy.get('@description').scrollIntoView().should('contain', product.description)
            cy.get('@description').screenshot('description')
            //Product title
            cy.get('@title').scrollIntoView().should('contain', product.title)
            cy.get('@title').screenshot('title')
            //Product price
            cy.get('@price').should('contain', product.price)
            cy.get('@price').screenshot('price')
            // Product images
            cy.get('@image').scrollIntoView().should('have.attr','src',product.image)
            cy.get('@image').screenshot('image')
        })
    })
    it('Test the functionality of the "Add to Cart" button',()=>{
        cy.fixture('url').then((url) => {
            cy.visit(url.url)//serach the product
            cy.get('.main-products.product-grid').scrollIntoView().children().as('product-list')
            cy.get('@product-list').first().trigger('mouseover')
            cy.get('@product-list').first().find('.cart-group').click()     
            cy.get('@product-list').eq(2).find('.cart-group').click()
            cy.get('#cart.dropdown').trigger('mouseover').should('be.visible')
            cy.screenshot('cart-search')
            cy.visit(url.cart)//navigate to cart
            cy.get('tbody>tr>td.text-left.td-name').as('cart-product')
            cy.get('tbody>tr>td.text-center.td-total').as('product-price')
            cy.get('@cart-product').first().find('a').should('contain',url.product1)
            cy.get('@cart-product').last().find('a').should('contain',url.product2)
            cy.get('@product-price').first().should('contain',url.price1)
            cy.get('@product-price').last().should('contain',url.price2)
            cy.screenshot('cart')
            //Chart count Increse if same item added multiple times
            cy.visit(url.url)//serach the product
            cy.get('.main-products.product-grid').scrollIntoView().children().as('product-list')
            cy.get('@product-list').first().find('.cart-group>a.btn.btn-cart').dblclick()
            cy.visit(url.cart).reload()   //navigate to cart
            cy.get('tbody>tr>td.text-center.td-qty').find('.stepper>input').first().should('have.value',3)
            cy.screenshot('cart-amount')
        })   
    })
})
