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
      .should('contain', "URL Shortener").and('be.visible')
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
      .should('be.visible')
      .invoke('attr', 'placeholder').should('contain', 'Title...')
      cy
      .get('[data-cy="url-input"]')
      .should('be.visible')
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

