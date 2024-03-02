import { circleWrapperSelector, circleChangingStyle, circleModifiedStyle, circleDefaultStyle } from './../../src/constants/e2e';
import { DELAY_IN_MS } from './../../src/constants/delays';
const array = [1, 2, 3, 4, 5]
describe("Linked list", () => {
  beforeEach(() => {
    cy.visit('list');
  });
  it("should buttons be disable with empty input", () => {
    cy.get("input").should("be.empty");
    cy.contains('Добавить в head').should("be.disabled");
    cy.contains('Добавить в tail').should("be.disabled");
    cy.contains('Добавить по индексу').should("be.disabled");
    cy.contains('Удалить по индексу').should("be.disabled");
  });
  it("should render default list correctly", () => {
    const circles = cy.get(circleWrapperSelector).as('circleWrapper').should("have.length", 5);

    array.forEach((elem, index) => {
      circles.each((el, ind) => {
        ind === index && expect(el).contain(elem);
      });
    });

    cy.get('@circleWrapper')
      .should("have.length", 5)
      .eq(0)
      .should("contain", "head");

    cy.get('@circleWrapper')
      .should("have.length", 5)
      .eq(4)
      .should("contain", "tail");
  });
  it("should add element to head correctly", () => {
    cy.get("input").first().type("10");
    cy.contains("Добавить в head").click();
    cy.get(circleModifiedStyle).contains("10");
    cy.wait(DELAY_IN_MS);
    cy.get(circleWrapperSelector)
      .should("have.length", 6)
      .each((el, index) => {
        index === 0 && expect(el).contain('10');
        index === 0 && expect(el).contain("head");
        index === 5 && expect(el).contain("tail");
      });
    cy.get(circleDefaultStyle).contains("10");
  });
  it("should add element to tail correctly", () => {
    cy.get("input").first().type("11");
    cy.contains("button", "Добавить в tail").click();
    cy.get(circleModifiedStyle).contains("11");
    cy.wait(DELAY_IN_MS);
    cy.get(circleWrapperSelector)
      .should("have.length", 6)
      .each((el, index) => {
        index === 6 && expect(el).contain("11");
        index === 6 && expect(el).contain("tail");
      });
    cy.get(circleDefaultStyle).contains("11");
  });
  it("should delete from head correctly", () => {
    cy.contains("button", "Удалить из head").click();
    cy.get(circleChangingStyle).contains(array[0]);
    cy.wait(DELAY_IN_MS);
    cy.get(circleWrapperSelector).first().contains("head");
    cy.get(circleWrapperSelector).should("have.length", 4);
  });

  it("should delete from tail correctly", () => {
    cy.contains("button", "Удалить из tail").click();
    cy.get(circleChangingStyle).contains(array[array.length - 1]);
    cy.wait(DELAY_IN_MS);
    cy.get(circleWrapperSelector).last().contains("tail");
    cy.get(circleWrapperSelector).last().contains(array[array.length - 2]);
    cy.get(circleWrapperSelector).should("have.length", 4);
  });

  it("should remove by index correctly", () => {
    cy.get("input").last().type(array[0].toString());
    cy.contains("button", "Удалить по индексу").click();
    cy.get(circleWrapperSelector).eq(0).find(circleChangingStyle);
    cy.get(circleChangingStyle).contains(array[0]);
    cy.get(circleWrapperSelector).should("have.length", 4);
  });
})