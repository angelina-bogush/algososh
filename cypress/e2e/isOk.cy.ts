
describe("App", () => {
  it("should be up and running", () => {
    const baseUrl = Cypress.config('baseUrl');
    if (baseUrl) cy.visit(baseUrl);
  });
});