describe('test',()=>{
    it('Add items to the cart',()=>{
        cy.Search()
        cy.AddToCart()
        cy.get('div#cart').click()
        cy.contains('View Cart').click({force:true})
        cy.get('div.table-responsive table').children().last().as('cart-size')
        cy.get('@cart-size').should('have.length.at.least',1)
        cy.screenshot('cart-size')
    })
    it('Remove items from the cart',()=>{
        cy.GoToCart()
        cy.get('button.btn.btn-remove').as('button')
        cy.get('@button').click({multiple:true , force:true })
        cy.reload()
        cy.get('div#content.col-sm-12').should('contain','Your shopping cart is empty!')
        cy.screenshot()
    })
    it('Verify cart total calculations',()=>{
        cy.GoToCart()
        cy.get('div.cart-total').should('contain',"1,047.00")
        cy.get('td.text-center.td-total').should('contain','349')
        const price1=349
        const price2=349
        const price3=349
        const t=price1+price2+price3
        const total=t.toLocaleString()
        cy.get('div.cart-total').should('contain',total)
        cy.screenshot()
    })
})
