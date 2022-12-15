describe("Using events page", () => {
    it("registers for event", () => {
        cy.visit("http://127.0.0.1:5173/events");
        cy.get('[data-cy=register]').first().click();
    });
    it("views event location", () => {
        cy.visit("http://127.0.0.1:5173/events");
        cy.get('[data-cy=view]').first().click();
    });
  });