describe("Using home page", () => {
    it("Opens home page", () => {
      cy.visit("http://localhost:5173");
    });
    it("Closes pop up", () => {
        cy.wait(5000);
        cy.get('[data-cy=closeBut]').click();
    });
    it("Opens and closes Join Today", () => {
        cy.get('[data-cy=joinBut]').click();
        cy.get('[data-cy=joinClose]').click();
    });
  });
  