/// <reference types="Cypress" />

describe('Test - Equipment Module', () => {
  // Função auxiliar: obter nome de setor a partir do seletor
  it('Function - Get sector name', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').invoke('text').then((text) => {
      const selectedOptionText = text.trim();
      const parts = selectedOptionText.split('-');

      const sectorName = parts.length > 1
        ? parts[1].trim()
        : selectedOptionText;

      Cypress.env('selectedOptionText', sectorName);
    });
  });

  // CT008.001 - Cadastrar equipamento e voltar à listagem
  it('Test - Add equipment and return to list (Save button)', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="equipment-list-header"]').should('contain', 'Model');
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="input-name"]').type('equipment1');
    cy.get('[data-test="input-model"]').type('model1');
    cy.get('[data-test="input-brand"]').type('brand1');
    cy.get('[data-test="input-serial"]').type('001');
    cy.get('[data-test="input-identifier"]').type('E001');
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();
    cy.get('[data-test="btn-save"]').click();

    cy.get('[data-test="toast-message"]').should('contain', 'Item added successfully');
    cy.get('[data-test="toast-close"]').click();
    cy.get('.equipment-row > .col-name').should('contain', 'equipment1');
  });

  // CT008.002 - Cadastrar equipamentos em sequência (Save+)
  it('Test - Add multiple equipments using Save+ button', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="equipment-list-header"]').should('contain', 'Model');
    cy.get('[data-test="add-equipment"]').click();

    // Equipamento 1
    cy.get('[data-test="input-name"]').type('equipment2');
    cy.get('[data-test="input-model"]').type('model2');
    cy.get('[data-test="input-brand"]').type('brand2');
    cy.get('[data-test="input-serial"]').type('002');
    cy.get('[data-test="input-identifier"]').type('E002');
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();
    cy.get('[data-test="btn-save-plus"]').click();
    cy.get('[data-test="toast-message"]').should('contain', 'Item added successfully');
    cy.get('[data-test="toast-close"]').click();
    cy.get('[data-test="input-name"]').should('have.value', '');

    // Equipamento 2
    cy.get('[data-test="input-name"]').type('equipment3');
    cy.get('[data-test="input-model"]').type('model3');
    cy.get('[data-test="input-brand"]').type('brand3');
    cy.get('[data-test="input-serial"]').type('003');
    cy.get('[data-test="input-identifier"]').type('E003');
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();
    cy.get('[data-test="btn-save-plus"]').click();
    cy.get('[data-test="toast-message"]').should('contain', 'Item added successfully');
    cy.get('[data-test="toast-close"]').click();
    cy.get('[data-test="input-name"]').should('have.value', '');

    // Equipamento 3
    cy.get('[data-test="input-name"]').type('equipment4');
    cy.get('[data-test="input-model"]').type('model4');
    cy.get('[data-test="input-brand"]').type('brand4');
    cy.get('[data-test="input-serial"]').type('004');
    cy.get('[data-test="input-identifier"]').type('E004');
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();
    cy.get('[data-test="btn-save-plus"]').click();
    cy.get('[data-test="toast-message"]').should('contain', 'Item added successfully');
    cy.get('[data-test="toast-close"]').click();
    cy.get('[data-test="input-name"]').should('have.value', '');
  });

  // CT008.003 - Cancelar cadastro com campos vazios
  it('Test - Cancel adding equipment with empty fields', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="btn-cancel"]').click();
    cy.url().should('eq', '/app/equipment'); // ou a URL correspondente à listagem
  });
});


  // CT008.004 - Cancelar registro com alguns campos preenchidos
  it('Test - Cancel equipment registration with some fields filled', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="equipment-list-header"]').should('contain', 'Model');
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="input-name"]').type('equipmentPartial');
    cy.get('[data-test="input-model"]').type('modelPartial');
    cy.get('[data-test="input-brand"]').type('brandPartial');

    cy.get('[data-test="btn-cancel"]').click();
    cy.url().should('eq', '/app/equipment');
  });

  // CT008.005 - Verificar se o identificador é único
  it('Test - Add equipment with duplicate identifier (should fail)', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="equipment-list-header"]').should('contain', 'Model');
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="input-name"]').type('equipmentDup');
    cy.get('[data-test="input-model"]').type('modelDup');
    cy.get('[data-test="input-brand"]').type('brandDup');
    cy.get('[data-test="input-serial"]').type('1234');
    cy.get('[data-test="input-identifier"]').type('DUP001'); // ID já usado anteriormente
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();

    cy.get('[data-test="btn-save-plus"]').click();
    cy.get('[data-test="toast-message"]').should('contain', 'An error occurred while adding the item!');
    cy.get('[data-test="toast-close"]').click();
    cy.get('[data-test="input-name"]').should('have.value', 'equipmentDup');
  });

  // CT008.006 - Verificar que o identificador não aceita mais de 10 dígitos
  it('Test - Identifier should not accept more than 10 characters', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="equipment-list-header"]').should('contain', 'Model');
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="input-name"]').type('equipmentLongId');
    cy.get('[data-test="input-model"]').type('modelX');
    cy.get('[data-test="input-brand"]').type('brandX');
    cy.get('[data-test="input-serial"]').type('5678');
    cy.get('[data-test="input-identifier"]').type('123456789012'); // 12 dígitos
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();

    cy.get('[data-test="btn-save-plus"]').click();
    cy.get('[data-test="toast-message"]').should('contain', 'An error occurred while adding the item!');
    cy.get('[data-test="toast-close"]').click();
    cy.get('[data-test="input-name"]').should('have.value', 'equipmentLongId');
  });

  // CT008.007 - Verificar que o campo "model" não aceita mais de 40 caracteres
  it('Test - Model field should reject more than 40 characters', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="equipment-list-header"]').should('contain', 'Model');
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="input-name"]').type('equipmentLongModel');
    cy.get('[data-test="input-model"]').type('A'.repeat(45)); // Excede o limite
    cy.get('[data-test="input-brand"]').type('brandX');
    cy.get('[data-test="input-serial"]').type('6789');
    cy.get('[data-test="input-identifier"]').type('VALID001');
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();

    cy.get('[data-test="btn-save-plus"]').click();
    cy.get('[data-test="toast-message"]').should('contain', 'An error occurred while adding the item!');
    cy.get('[data-test="toast-close"]').click();
    cy.get('[data-test="input-name"]').should('have.value', 'equipmentLongModel');
  });

  // CT008.008 - Verificar que o campo "brand" não aceita mais de 40 caracteres
  it('Test - Brand field should reject more than 40 characters', () => {
    cy.visit("/app");
    cy.get('[data-test="nav-equipment"]').click();
    cy.get('[data-test="equipment-list-header"]').should('contain', 'Model');
    cy.get('[data-test="add-equipment"]').click();

    cy.get('[data-test="input-name"]').type('equipmentLongBrand');
    cy.get('[data-test="input-model"]').type('modelY');
    cy.get('[data-test="input-brand"]').type('B'.repeat(50)); // Excede o limite
    cy.get('[data-test="input-serial"]').type('9876');
    cy.get('[data-test="input-identifier"]').type('VALID002');
    cy.get('[data-test="select-sector"]').click();
    cy.get('[data-test="sector-option-1"]').click();

    cy.get('[data-test="btn-save-plus"]').click();
    cy.get('[data-test="toast-message"]').should('contain', 'An error occurred while adding the item!');
    cy.get('[data-test="toast-close"]').click();
    cy.get('[data-test="input-name"]').should('have.value', 'equipmentLongBrand');
    });


    // CT008.009 - Verificar se o número de série não permite mais de 24 dígitos
    it('Test - Add equipment, ensure serial number does not accept more than 24 digits', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('.mat-mdc-header-row > .cdk-column-model').should('contain', 'Model')
    cy.get('a').click()

    cy.get('#mat-input-6').type('equipTest')
    cy.get('#mat-input-7').type('modelTest')
    cy.get('#mat-input-8').type('brandTest')
    cy.get('#mat-input-9').type('1234567890123456789012345') // > 24
    cy.get('#mat-input-10').type('123')
    cy.get('.mat-mdc-select-trigger').click()
    cy.get('#mat-option-8').click()
    cy.get('#button-submit > .mdc-button__label').click()
    cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label')
        .should('contain', 'An error occurred while adding the item!')
    cy.get('.mat-mdc-snack-bar-actions').click()
    cy.get('#mat-input-6').should('have.value', 'equipTest')
    })

    // CT008.010 - Verificar se os botões estão desabilitados com campos vazios
    it('Test - Ensure save buttons are disabled when a field is empty', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('.mat-mdc-header-row > .cdk-column-model').should('contain', 'Model')
    cy.get('a').click()

    cy.get('#mat-input-6').type('equipTest')
    cy.get('#mat-input-7').type('modelTest')
    cy.get('#mat-input-8').type('brandTest')
    cy.get('#mat-input-9').type('123')
    cy.get('.mat-mdc-select-trigger').click()
    cy.get('#mat-option-8').click()

    cy.get('#button-add').should('have.attr', 'disabled', 'disabled')
    cy.get('#button-submit').should('have.attr', 'disabled', 'disabled')
    })

    // CT009.001 - Listagem de equipamentos
    it('Test - Equipment list displays correctly', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()

    const items = [
        { name: 'equip1', model: 'model1', brand: 'brand1', serial: '111', id: '001' },
        { name: 'equip2', model: 'model2', brand: 'brand2', serial: '222', id: '002' },
        { name: 'equip3', model: 'model3', brand: 'brand3', serial: '333', id: '003' },
        { name: 'equip4', model: 'model4', brand: 'brand4', serial: '444', id: '004' },
    ]

    items.forEach((item, index) => {
        const row = `.mdc-data-table__content > :nth-child(${index + 1})`
        cy.get(`${row} > .cdk-column-name`).should('contain', item.name)
        cy.get(`${row} > .cdk-column-model`).should('contain', item.model)
        cy.get(`${row} > .cdk-column-brand`).should('contain', item.brand)
        cy.get(`${row} > .cdk-column-serial_number`).should('contain', item.serial)
        cy.get(`${row} > .cdk-column-identifier`).should('contain', item.id)
        cy.get(`${row} > .cdk-column-sector`).should('contain', Cypress.env('selectedOptionText'))
        cy.get(`${row} > .cdk-column-status`).should('contain', 'active')
    })
    })

    // CT011.001 - Filtros por campo existente
    it('Test - Filter by name', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('#mat-input-0').type('equip3')
    cy.get('.mat-mdc-row > .cdk-column-name').should('contain', 'equip3')
    })

    it('Test - Filter by model', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('#mat-input-1').type('model4')
    cy.get('.cdk-column-model').should('contain', 'model4')
    })

    it('Test - Filter by brand', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('#mat-input-2').type('brand3')
    cy.get('.mat-mdc-row > .cdk-column-brand').should('contain', 'brand3')
    })

    it('Test - Filter by serial number', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('#mat-input-3').type('11')
    cy.get('.cdk-column-serial_number').should('contain', '111')
    })

    it('Test - Filter by identifier', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('#mat-input-4').type('002')
    cy.get('.cdk-column-identifier').should('contain', '002')
    })

    it('Test - Filter by sector', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('#mat-input-5').type(Cypress.env('selectedOptionText'))
    cy.get('.cdk-column-sector').should('contain', Cypress.env('selectedOptionText'))
    })

    it('Test - Filter by status', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()
    cy.get('.mat-mdc-select-placeholder').click()
    cy.get('#mat-option-0').click()
    cy.get('.cdk-column-status').should('contain', 'active')
    })

    // CT012.001 - Atualização de equipamentos
    it('Test - Edit equipment details', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()

    cy.get(':nth-child(1) > .cdk-column-action button').click()
    cy.get('.mat-mdc-menu-content > :nth-child(1)').click()

    cy.get('#mat-input-6').type(' Updated')
    cy.get('#mat-input-7').type(' Updated')
    cy.get('#mat-input-8').type(' Updated')
    cy.get('#mat-input-9').type('4321')
    cy.get('#mat-input-10').type('100')
    cy.get('#mat-select-value-5').click()
    cy.get('#mat-option-11').click()
    cy.get('#mat-select-value-7').click()
    cy.get('#mat-option-9').click()
    cy.get('#button-edit > .mdc-button__label').click()
    })

    // CT012.001 - Verificação final após atualização
    it('Test - Confirm updated equipment data', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()

    cy.get('.cdk-column-name').first().should('contain', 'equip1 Updated')
    cy.get('.cdk-column-model').first().should('contain', 'model1 Updated')
    cy.get('.cdk-column-brand').first().should('contain', 'brand1 Updated')
    cy.get('.cdk-column-serial_number').first().should('contain', '1114321')
    cy.get('.cdk-column-identifier').first().should('contain', '001100')
    cy.get('.cdk-column-status').first().should('contain', 'blocked')
    })

    // CT012.002 - Cancelar Atualizar equipamento
    it('Test - Cancel edit asset', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()

    for (let i = 1; i <= 4; i++) {
        cy.get(`:nth-child(${i}) > .cdk-column-action > button`).click()
        cy.get('.mat-mdc-menu-content > :nth-child(1)').click()
        cy.get('#button-cancel > .mdc-button__label').click()
    }
    })

    // CT010.002 - Cancelar deletar setor
    it('Test - Cancel delete asset', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()

    for (let i = 1; i <= 4; i++) {
        cy.get(`:nth-child(${i}) > .cdk-column-action > button`).click()
        cy.get('.mat-mdc-menu-content > :nth-child(2)').click()
        cy.get('button.cancel-button').click()
    }
    })

    // CT010.001 - Deletar setor com sucesso 
    it('Test - Delete asset', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()

    for (let i = 0; i < 4; i++) {
        cy.get(':nth-child(1) > .cdk-column-action > button').click()
        cy.get('.mat-mdc-menu-content > :nth-child(2)').click()
        cy.get('button.delete-button').click()
        cy.wait(1000)
    }
    })

    // Verificação após deleção
    it('Test - Check if deleted assets are gone', () => {
    cy.visit("http://localhost:4200")
    cy.get('[routerlink="/asset"] > .mdc-list-item__content .mdc-button__label').click()

    cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-position').should('not.exist')
    cy.get(':nth-child(2) > .cdk-column-position').should('not.exist')
    cy.get(':nth-child(3) > .cdk-column-position').should('not.exist')
    cy.get(':nth-child(4) > .cdk-column-position').should('not.exist')
    })

