
describe('app works correctly with routes', function () {
  it('should open main page with list of algorithms', function () {
    const baseUrl = Cypress.config('baseUrl');
    if (baseUrl) {
      cy.visit(baseUrl);
      cy.contains('МБОУ АЛГОСОШ');
    } 
  });

  it('should open string page', function () {
    cy.visit('recursion');
    cy.contains('Строка');
    cy.get('button').contains('К оглавлению').click();
  });
  it('should open fibonacci page', function () {
    cy.visit('fibonacci');
    cy.contains('Последовательность Фибоначчи');
    cy.get('button').contains('К оглавлению').click();
  });
  it('should open sorting page', function () {
    cy.visit('sorting');
    cy.contains('Сортировка массива');
    cy.get('button').contains('К оглавлению').click();
  });
  it('should open stack page', function () {
    cy.visit('stack');
    cy.contains('Стек');
    cy.get('button').contains('К оглавлению').click();
  });
  it('should open queue page', function () {
    cy.visit('queue');
    cy.contains('Очередь');
    cy.get('button').contains('К оглавлению').click();
  });
  it('should open list page', function () {
    cy.visit('list');
    cy.contains('Связный список');
    cy.get('button').contains('К оглавлению').click();
  });

});