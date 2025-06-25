/// <reference types="Cypress" />

describe('Sector tests', () => {
  // CT001.001 - Adicionar setor com sucesso e voltar para tela de setores
  it('Test - Add sector and return to list', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('a').click()
    cy.get('#mat-input-3').type('101')
    cy.get('#mat-input-4').type('sector1')
    cy.get('#mat-input-5').type('description1')
    cy.get('.button-add > .mdc-button__label').click()
    cy.get('.mat-typography').should('contain', '101')
  })

  // CT001.002 - Adicionar setor com sucesso e continuar na tela
  it('Test - Add sector and stay on form (Save+)', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('a').click()

    cy.get('#mat-input-3').type('102')
    cy.get('#mat-input-4').type('sector2')
    cy.get('#mat-input-5').type('description2')
    cy.get('.button-submit > .mdc-button__label').click()
    cy.get('#mat-input-3').should('contain', '')

    cy.get('#mat-input-3').type('103')
    cy.get('#mat-input-4').type('sector3')
    cy.get('#mat-input-5').type('description3')
    cy.get('.button-submit > .mdc-button__label').click()
    cy.get('#mat-input-3').should('contain', '')

    cy.get('#mat-input-3').type('104')
    cy.get('#mat-input-4').type('sector4')
    cy.get('#mat-input-5').type('description4')
    cy.get('.button-submit > .mdc-button__label').click()
    cy.get('#mat-input-3').should('contain', '')

    cy.get('.button-cancel > .mdc-button__label').click()
    cy.get('.mat-typography').should('contain', '101')
    cy.get('.mat-typography').should('contain', '102')
    cy.get('.mat-typography').should('contain', '103')
    cy.get('.mat-typography').should('contain', '104')
  })

  // CT001.005 - Cancelar adição de setor com campos preenchidos
  it('Test - Cancel add sector with fields filled', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('a').click()
    cy.get('#mat-input-3').type('105')
    cy.get('#mat-input-4').type('sector5')
    cy.get('#mat-input-5').type('description5')
    cy.get('.button-cancel > .mdc-button__label')
  })

  // CT001.006 - Cancelar adição de setor com campos vazios
  it('Test - Cancel add sector with fields empty', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('a').click()
    cy.get('.button-cancel > .mdc-button__label')
  })

  // CT005.001 - Listagem de setores
  it('Test - Sector listing', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()

    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-code').should('contain', '101')
    cy.get(':nth-child(1) > .cdk-column-name').should('contain', 'sector1')
    cy.get(':nth-child(1) > .cdk-column-description').should('contain', 'description1')

    cy.get('.mdc-data-table__content > :nth-child(2) > .cdk-column-code').should('contain', '102')
    cy.get(':nth-child(2) > .cdk-column-name').should('contain', 'sector2')
    cy.get(':nth-child(2) > .cdk-column-description').should('contain', 'description2')

    cy.get('.mdc-data-table__content > :nth-child(3) > .cdk-column-code').should('contain', '103')
    cy.get(':nth-child(3) > .cdk-column-name').should('contain', 'sector3')
    cy.get(':nth-child(3) > .cdk-column-description').should('contain', 'description3')

    cy.get('.mdc-data-table__content > :nth-child(4) > .cdk-column-code').should('contain', '104')
    cy.get(':nth-child(4) > .cdk-column-name').should('contain', 'sector4')
    cy.get(':nth-child(4) > .cdk-column-description').should('contain', 'description4')
  })

  // CT003.001 - Atualizar setor com sucesso
  it('Test - Update sector', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()

    cy.get(':nth-child(1) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('#mat-input-3').type('1')
    cy.get('#mat-input-4').type(' Updated')
    cy.get('#mat-input-5').type(' Updated')
    cy.get('button.button-add').click()

    cy.get(':nth-child(2) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('#mat-input-6').type('2')
    cy.get('#mat-input-7').type(' Updated')
    cy.get('#mat-input-8').type(' Updated')
    cy.get('button.button-add').click()

    cy.get(':nth-child(3) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('#mat-input-9').type('3')
    cy.get('#mat-input-10').type(' Updated')
    cy.get('#mat-input-11').type(' Updated')
    cy.get('button.button-add').click()

    cy.get(':nth-child(4) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('#mat-input-12').type('4')
    cy.get('#mat-input-13').type(' Updated')
    cy.get('#mat-input-14').type(' Updated')
    cy.get('button.button-add').click()
  })

  // Verificação de atualização
  it('Test - Verify updated sectors', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()

    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-code').should('contain', '1011')
    cy.get(':nth-child(1) > .cdk-column-name').should('contain', 'sector1 Updated')
    cy.get(':nth-child(1) > .cdk-column-description').should('contain', 'description1 Updated')

    cy.get('.mdc-data-table__content > :nth-child(2) > .cdk-column-code').should('contain', '1022')
    cy.get(':nth-child(2) > .cdk-column-name').should('contain', 'sector2 Updated')
    cy.get(':nth-child(2) > .cdk-column-description').should('contain', 'description2 Updated')

    cy.get('.mdc-data-table__content > :nth-child(3) > .cdk-column-code').should('contain', '1033')
    cy.get(':nth-child(3) > .cdk-column-name').should('contain', 'sector3 Updated')
    cy.get(':nth-child(3) > .cdk-column-description').should('contain', 'description3 Updated')

    cy.get('.mdc-data-table__content > :nth-child(4) > .cdk-column-code').should('contain', '1044')
    cy.get(':nth-child(4) > .cdk-column-name').should('contain', 'sector4 Updated')
    cy.get(':nth-child(4) > .cdk-column-description').should('contain', 'description4 Updated')
  })

  // CT003.002 - Cancelar edição de setor
  it('Test - Cancel edit sector', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()

    cy.get(':nth-child(1) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('button.button-cancel').click()

    cy.get(':nth-child(2) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('button.button-cancel').click()

    cy.get(':nth-child(3) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('button.button-cancel').click()

    cy.get(':nth-child(4) > .cdk-column-action > button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
    cy.get('button.button-cancel').click()
  })

  // CT006.001 - Alterar status
  it('Test - Toggle sector status', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('#mat-mdc-slide-toggle-1-button > .mdc-switch__icons > .mdc-switch__icon--off').click()
    cy.get('#mat-mdc-slide-toggle-1-button > .mdc-switch__icons')
      .should('not.have.class', 'mdc-switch--checked')
  })

  // CT002.002 - Cancelar exclusão de setor
  it('Test - Cancel delete sector', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()

    for (let i = 1; i <= 4; i++) {
      cy.get(`:nth-child(${i}) > .cdk-column-action > button`).click()
      cy.get('.mat-mdc-menu-content > :nth-child(2)').click()
      cy.get('button.cancel-button').click()
    }
  })

  // CT007.001 - Filtros
  it('Test - Filter by code', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('#mat-input-0').type('101')
    cy.get('.mat-mdc-row > .cdk-column-code').should('contain', '101')
  })

  it('Test - Filter by name', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('#mat-input-1').type('sector')
    cy.get('.mat-mdc-row > .cdk-column-name').should('contain', 'sector')
  })

  it('Test - Filter by description', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    cy.get('#mat-input-2').type('desc')
    cy.get('.mat-mdc-row > .cdk-column-description').should('contain', 'desc')
  })

  // CT002.001 - Deletar setores
  it('Test - Delete sectors', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()

    for (let i = 0; i < 4; i++) {
      cy.get(':nth-child(1) > .cdk-column-action > button').click()
      cy.get('.mat-mdc-menu-content > :nth-child(2)').click()
      cy.get('button.delete-button').click()
    }
  })

  it('Test - Confirm sectors were deleted', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/sector"]').click()
    for (let i = 1; i <= 4; i++) {
      cy.get(`.mdc-data-table__content > :nth-child(${i}) > .cdk-column-position`).should('not.exist')
    }
  })
})
