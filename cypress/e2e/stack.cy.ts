import { DELAY_IN_MS } from "../../src/constants/delays";
const inputValues = ['1', '2', '3']
describe("Stack", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000/stack`);
  });
  it("should button be disable with empty input", () => {
    cy.get("input").should("be.empty");
    cy.contains('Добавить').should("be.disabled");
  });
  it("should correctly add value to stack", () => {
    inputValues.forEach(((val, index) => {
      cy.get("input").type(val);
      cy.contains('Добавить').click();
      cy.get('[data-cy="circle"]').contains(val);
      cy.wait(DELAY_IN_MS)
      cy.get('[data-cy="circle"]').as("circleComponent");
      cy.get('@circleComponent').should('have.length', index + 1).should('have.css', 'border', '4px solid rgb(0, 50, 255)');
    }))
  });

  it("should correctly delete value from stack", () => {
    inputValues.forEach(((val) => {
      cy.get("input").type(val);
      cy.contains('Добавить').click();
    }))
    cy.contains('Удалить').click();
    cy.get('[data-cy="circle"]').as("circleComponent").contains(inputValues[inputValues.length - 1]);
    cy.get('@circleComponent').each((element, index) => {
      if (index === length - 1) {
        expect(element).to.contain(inputValues[inputValues.length - 1]);
      }
    });
    cy.get('[data-cy="circleWrapper"]').as('circleWrapper')
    cy.get("@circleWrapper").should("have.length", 2).each((element, ind) => {
      ind === 0 && expect(element).to.contain(inputValues[0]);
      if (ind === 1) {
        expect(element).to.contain(inputValues[1]);
        expect(element).to.contain('top')
      }
    });
  })
  it("should correctly clear stack", () => {
    inputValues.forEach(((val) => {
      cy.get("input").type(val);
      cy.contains('Добавить').click();
    }))
    cy.contains('Очистить').click();
    cy.get('[data-cy="circle"]').should("have.length", 0)
  }
  )
});