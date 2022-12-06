describe("Using partners page", () => {
    it("Opens and closes join today", () => {
        cy.visit("http://localhost:5173/partners");
        cy.scrollTo(0, 900);
        cy.get('[data-cy=joinBut]').click();
        cy.get('[data-cy=joinClose]').click();
    });
  });