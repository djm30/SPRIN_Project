describe("Visiting webpages", () => {
  it("Home Page", () => {
    cy.visit("http://localhost:5173");
  });
  it("Partners Page", () => {
    cy.visit("http://localhost:5173/partners");
  });
  it("Resources Page", () => {
    cy.visit("http://localhost:5173/resources");
  });
  it("Events Page", () => {
    cy.visit("http://localhost:5173/events");
  });
});
