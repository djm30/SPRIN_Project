describe("Using resources page", () => {
    it("accesses video resources", () => {
        cy.visit("http://127.0.0.1:5173/resources");
        cy.get('[data-cy=resourceLink]').first().click();
        cy.get('[data-cy=video]').first().click();
    });
    it("accesses research paper resources", () => {
        cy.visit("http://127.0.0.1:5173/resources");
        cy.get('[data-cy=resourceLink]').last().click();
    });
    it("accesses website resources", () => {
        cy.visit("http://127.0.0.1:5173/resources");
        cy.get('[data-cy=website]').contains('Website').click();
    });
  });