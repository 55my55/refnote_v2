describe('Top Page', () => {
  it('ルートパスに訪問できる', () => {
    cy.visit('/')
  })

  it('ヘッダーから「ホーム」をクリックして遷移できる', () => {
    cy.visit('/')
    cy.get('[data-test-id="home-header-link"]').click()
    cy.url().should('include', '/')
  })

  it('ヘッダーから「プロフィール」をクリックして遷移できる', () => {
    cy.visit('/')
    cy.get('[data-test-id="profile-header-link"]').click()
    cy.url().should('include', '/profile')
  })
})
