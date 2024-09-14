// describe('My Shop Test', () => {
//     // it('intercepts requests to myshop.org.in', () => {
//     //   cy.intercept('/*', (req) => {
//     //     req.reply({
//     //       statusCode: 200,
//     //       body: '<html><body>Mocked HTML content</body></html>',
//     //     });
//     //   });
  
//     //   // Visit the webpage
//     //   cy.visit('/');
  
//     //   // Add any additional commands or assertions here
//     // });


//     it('Verify that the homepage loads correctly', () => {
//         cy.intercept('https://myshop.org.in/wp-content/uploads/2022/07/myshop-logo.png', (req) => {
//           req.reply({
//             statusCode: 200,
//             body: Cypress.Buffer.from('Mocked logo image content', 'utf8'),
//             headers: {
//               'Content-Type': 'image/png',
//             },
//           });
//         });
      
//         cy.visit('https://myshop.org.in/');
      
//         cy.get('#logo img').should('have.attr', 'title', 'myShop').and('be.visible');
//         cy.get('#logo img').screenshot('logo');
//         // Verify that the homepage Img is being visible
//       });
// //   });

describe('My Shop Test', () => {
    it('intercepts requests to myshop.org.in and verifies homepage loads correctly', () => {
      // Visit the webpage
      cy.visit('/');
  
      // Get the real logo image URL from the webpage HTML
      cy.get('#logo img')
        .should('be.visible')
        .invoke('attr', 'src')
        .then((logoImageUrl) => {
          // Intercept the logo image request
          cy.intercept(logoImageUrl, (req) => {
            req.reply({
              statusCode: 200,
              body: req.alias('/wp-content/uploads/2022/07/myshop-logo.png'),
              headers: {
                'Content-Type': 'image/png',
              },
            });
          });
        });
  
      // Verify that the homepage loads correctly
      cy.get('#logo img').should('have.attr', 'title', 'myShop').and('be.visible');
      cy.get('#logo img').screenshot('logo');
    });
  });





