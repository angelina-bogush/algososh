

describe('app works correctly with routes', function() {
    before(function() {
      cy.visit('http://localhost:3000');
    });
  
    it('should open main page with list of algorithms', function() {
      cy.contains('МБОУ АЛГОСОШ');
    });
  
    it('should open string page', function() {
      cy.visit('http://localhost:3000/recursion');
      cy.contains('Строка');
      cy.get('button').contains('К оглавлению').click();
    });
    it('should open fibonacci page', function() {
        cy.visit('http://localhost:3000/fibonacci');
        cy.contains('Последовательность Фибоначчи');
        cy.get('button').contains('К оглавлению').click();
      });
      it('should open sorting page', function() {
        cy.visit('http://localhost:3000/sorting');
        cy.contains('Сортировка массива');
        cy.get('button').contains('К оглавлению').click();
      });
      it('should open stack page', function() {
        cy.visit('http://localhost:3000/stack');
        cy.contains('Стек');
        cy.get('button').contains('К оглавлению').click();
      });
      it('should open queue page', function() {
        cy.visit('http://localhost:3000/queue');
        cy.contains('Очередь');
        cy.get('button').contains('К оглавлению').click();
      });
      it('should open list page', function() {
        cy.visit('http://localhost:3000/list');
        cy.contains('Связный список');
        cy.get('button').contains('К оглавлению').click();
      });
  
   
  });