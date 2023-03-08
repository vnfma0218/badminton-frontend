/// <reference types="Cypress" />
describe('login form', () => {
  it('should validate the form', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy="login-button-submit"]').click();
    cy.get('form').contains('이메일을 입력해주세요');

    cy.get('[data-cy="login-input-email"]').type('test');
    cy.get('[data-cy="login-button-submit"]').click();
    cy.get('form').contains('이메일 형식이 아닙니다.');

    cy.get('[data-cy="login-input-email"]').type('test@gmail.com');
    cy.get('[data-cy="login-button-submit"]').click();
    cy.get('form').should('not.have.value', '이메일 형식이 아닙니다.');
  });
});
