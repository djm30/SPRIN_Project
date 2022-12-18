describe("Using partners page", () => {
    it("Opens Partner links", () => {
        cy.visit("http://localhost:5173/partners");
        cy.get('[data-cy=partLink]').first().click();
    });
    it("Opens and closes join today", () => {
        cy.once('uncaught:exception', () => false);
        cy.visit("http://localhost:5173/partners");
        cy.scrollTo(0, 900);
        cy.get('[data-cy=joinBut]').click();
        cy.get('[data-cy=joinClose]').click();
    });
    it("Opens prevention resources", () => {
        cy.get('[data-cy=prevLink]').click();
    });
  });