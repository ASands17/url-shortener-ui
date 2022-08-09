
// Iteration 3
// Write Cypress tests for the following user flows (don't forget to stub your network requests):

// When a user visits the page, they can view the page title and the existing shortened URLs
// When a user visits the page, they can view the Form with the proper inputs
// When a user fills out the form, the information is reflected in the input fields


  beforeEach(()=> {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: "fakeUrls.json",
      statusCode: 200,
    })

    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        "long_url" : "test.com/blahblahblahblahblahblahblahblahblahblah",
        "title" : "Test Again: Return of the Test",
        "id": 17,
        "short_url": "http://localhost:3001/useshorturl/17"
      }
    })

    cy.visit('http://localhost:3000/')
  })

it("should be able to view the page title and the existing shortened URLs", () => {
  cy
  .get('[data-cy="title"]')
  .should('contain', "URL Shortener")
  cy.get('[data-cy="url"]').eq(0)
  .should('contain', 'http://localhost:3001/useshorturl/1')
  cy.get('[data-cy="url"]').eq(1)
  .should('contain', 'http://localhost:3001/useshorturl/2')
  cy.get('[data-cy="url"]').eq(2)
  .should('contain', 'http://localhost:3001/useshorturl/3')
})

it("should be able to see the correct inputs", () => {
  cy
  .get('[data-cy="title-input"]')
  .invoke('attr', 'placeholder').should('contain', 'Title...')
  cy
  .get('[data-cy="url-input"]')
  .invoke('attr', 'placeholder').should('contain', 'URL to Shorten...')
})

it("should be able to fill out forms", () => {
  cy
  .get('[data-cy="title-input"]')
  .type('test')
  .should('have.value', 'test')
  cy
  .get('[data-cy="url-input"]')
  .type('testurl.com')
  .should('have.value', 'testurl.com')
})

// Write Cypress tests for the following user flows (don't forget to stub your network requests):

// When a user fills out and submits the form, the new shortened URL is rendered

it("should be able to submit a new URL to be shortened", () => {
  cy
  .get('[data-cy="title-input"]')
  .type('Test Again: Return of the Test')
  cy
  .get('[data-cy="url-input"]')
  .type('test.com/blahblahblahblahblahblahblahblahblahblah')
  cy
  .get('[data-cy="submit-button"]')
  .click()
  cy.get('[data-cy="url"]')
  .should('have.length', 4)
  cy.get('[data-cy="url"]').eq(3)
  .should('contain', 'Test Again: Return of the Test')
  .and('contain', 'test.com/blahblahblahblahblahblahblahblahblahblah')
  .and('contain', 'http://localhost:3001/useshorturl/17')
})

