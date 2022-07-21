describe('Frontpage', () => {
  it('can visit frontpage', () => {
    cy.visit('http://localhost:3001');
  });

  it('frontpage is rendered correctly', () => {
    cy.visit('http://localhost:3001');
    cy.contains('add a new');
    cy.contains('Phonebook');
    cy.contains('Numbers');
  });
});
