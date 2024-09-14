describe('Visual Testing', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('should match the login page design', () => {
      cy.url().should('include', 'myshop.org.in')
      cy.title().should('contain','myShop')
      cy.get('body').compareSnapshot('sayani',0.2)
    })
})