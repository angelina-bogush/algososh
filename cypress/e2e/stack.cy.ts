
describe("Stack", () => {
    beforeEach(() => {
        cy.visit(`http://localhost:3000/stack`);
      });
    it("should button be disable with empty input", () => {
        cy.get("input").should("be.empty");
        cy.contains('Добавить').should("be.disabled");
    });
  });