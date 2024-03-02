import { circleSelector } from "../../src/constants/e2e";
const expectedArray = [1, 1, 2, 3, 5, 8]
describe("StringComponent", () => {
    beforeEach(() => {
        cy.visit('fibonacci');
    });
    it("should be disable button when input is empty", () => {
        cy.get("input").should("have.value", 0);
        cy.contains('Рассчитать').should("be.disabled");
    });
    it("should make correct array", async () => {
        cy.get("input").type("5");

        cy.contains("Рассчитать").click();
        cy.get(circleSelector).should("have.length", expectedArray.length).then((elements) => {
            elements.each((index, element) => {
                const expectedNumber = expectedArray[index];
                cy.wrap(element).should("contain", expectedNumber.toString());
            });
        })
    })
})