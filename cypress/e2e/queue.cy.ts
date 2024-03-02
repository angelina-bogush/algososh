import { circleWrapperSelector} from "../../src/constants/e2e";
const inputValues = ['1', '2', '3']

describe("Queue", () => {
    beforeEach(() => {
        cy.visit('queue');
    });
    it("should button be disable with empty input", () => {
        cy.get("input").should("be.empty");
        cy.contains('Добавить').should("be.disabled");
    });
    it("should correctly add value to queue", () => {
        inputValues.forEach(((val, index) => {
            cy.get("input").type(val);
            cy.contains('Добавить').click();
            cy.get(circleWrapperSelector).as('circleWrapper').contains(val);
            cy.get('@circleWrapper').eq(index).should("contain", inputValues[index])
            if (index === 0) {
                cy.get('@circleWrapper').should('contain', 'tail').and('contain', 'head')
            }
            cy.get('@circleWrapper').should('contain', 'tail')
        }))
    });

    it("should correctly delete value to queue", () => {
        cy.get("input").type('0');
        cy.contains('Добавить').click();
        cy.get("input").type('1');
        cy.contains('Добавить').click();
        cy.get(circleWrapperSelector).as('circleComponent');
        cy.contains('Удалить').click();

        cy.get("@circleComponent").each((el, ind) => {
            ind === 0 && expect(el).to.contain('0');
            if (ind === 1) {
                expect(el).to.contain('1');
                expect(el).to.contain("tail");
            }
        });
        cy.get("@circleComponent").eq(1).should("contain", "head");
    })
    it("should correctly clear queue", () => {
        inputValues.forEach(((val) => {
            cy.get("input").type(val);
            cy.contains('Добавить').click();
        }))
        cy.contains('Очистить').click();
        cy.get(circleWrapperSelector).should("contain", '')
    }
    )
})