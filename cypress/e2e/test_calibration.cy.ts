/// <reference types="cypress" />

describe.only('Calibration Module - Test Suite', () => {
  // CT012.001 - Add calibration and return to list screen
  it('Should add a calibration and return to calibration list', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="add-calibration"]').click()

    cy.get('[data-test="select-equipment"]').click()
    cy.get('[data-test="equipment-option-1"]').click()

    cy.get('[data-test="select-frequency"]').click()
    cy.get('[data-test="frequency-option-1"]').click()

    cy.get('[data-test="calendar-toggle"]').click()
    cy.get('[data-test="calendar-day-1"]').click()

    cy.get('[data-test="click-outside"]').click()
    cy.get('[data-test="btn-save"]').click()
  })

  // CT012.002 - Add multiple calibrations with Save+ button
  it('Should add multiple calibrations with Save+ button', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="add-calibration"]').click()

    // Calibration 1
    cy.get('[data-test="select-equipment"]').click()
    cy.get('[data-test="equipment-option-1"]').click()
    cy.get('[data-test="select-frequency"]').click()
    cy.get('[data-test="frequency-option-1"]').click()
    cy.get('[data-test="calendar-toggle"]').click()
    cy.get('[data-test="calendar-next"]').click()
    cy.get('[data-test="calendar-day-2"]').click()
    cy.get('[data-test="click-outside"]').click()
    cy.get('[data-test="btn-save-plus"]').click()

    // Calibration 2
    cy.get('[data-test="select-equipment"]').click()
    cy.get('[data-test="equipment-option-1"]').click()
    cy.get('[data-test="select-frequency"]').click()
    cy.get('[data-test="frequency-option-2"]').click()
    cy.get('[data-test="calendar-toggle"]').click()
    cy.get('[data-test="calendar-day-3"]').click()
    cy.get('[data-test="click-outside"]').click()
    cy.get('[data-test="btn-save-plus"]').click()

    // Calibration 3
    cy.get('[data-test="select-equipment"]').click()
    cy.get('[data-test="equipment-option-1"]').click()
    cy.get('[data-test="select-frequency"]').click()
    cy.get('[data-test="frequency-option-3"]').click()
    cy.get('[data-test="calendar-toggle"]').click()
    cy.get('[data-test="calendar-day-4"]').click()
    cy.get('[data-test="click-outside"]').click()
    cy.get('[data-test="btn-save"]').click()
  })

  // CT012.003 - Frequency options validation
  it('Should validate frequency options', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="add-calibration"]').click()

    cy.get('[data-test="select-frequency"]').click()
    cy.contains('Semiannual')
    cy.contains('Annual')
    cy.contains('Biennial')
  })

  // CT012.004 - Cancel calibration addition
  it('Should cancel calibration addition', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="add-calibration"]').click()

    cy.get('[data-test="select-equipment"]').click()
    cy.get('[data-test="equipment-option-1"]').click()
    cy.get('[data-test="select-frequency"]').click()
    cy.get('[data-test="frequency-option-2"]').click()
    cy.get('[data-test="calendar-toggle"]').click()
    cy.get('[data-test="calendar-day-5"]').click()
    cy.get('[data-test="click-outside"]').click()
    cy.get('[data-test="btn-cancel"]').click()
  })

  // CT012.005 - Save buttons should be disabled if fields are not filled
  it('Should disable Save buttons if required fields are empty', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="add-calibration"]').click()

    cy.get('[data-test="btn-save"]').should('be.disabled')
    cy.get('[data-test="btn-save-plus"]').should('be.disabled')
  })

  // CT015.001 - List calibrations
  it('Should list calibrations correctly', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()

    cy.contains('.calibration-row', 'Semiannual').should('exist')
    cy.contains('.calibration-row', 'Annual').should('exist')
    cy.contains('.calibration-row', 'Biennial').should('exist')

    cy.get('.calibration-row .col-id').should('exist')
  })

  // CT013.002 - Cancel deletion
  it('Should cancel calibration deletion', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()

    cy.get('[data-test="delete-btn-1"]').click()
    cy.get('[data-test="confirm-cancel"]').click()

    cy.get('[data-test="delete-btn-2"]').click()
    cy.get('[data-test="confirm-cancel"]').click()

    cy.get('[data-test="delete-btn-3"]').click()
    cy.get('[data-test="confirm-cancel"]').click()

    cy.get('[data-test="delete-btn-4"]').click()
    cy.get('[data-test="confirm-cancel"]').click()
  })

  // CT014.001 - Filter calibrations
  it('Should filter calibrations by equipment, identifier, frequency and status', () => {
    // Equipment
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="filter-equipment"]').click()
    cy.get('[data-test="equipment-option-X"]').invoke('text').then(text => {
      cy.get('[data-test="equipment-option-X"]').click()
      cy.get('.calibration-row .col-equipment').invoke('text').should('eq', text.trim())
    })

    // Identifier
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('.calibration-row .col-identifier').eq(1).invoke('text').then(text => {
      cy.get('[data-test="filter-identifier"]').type(text.trim())
      cy.get('.calibration-row .col-identifier').should('contain', text.trim())
    })

    // Frequency
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="filter-frequency"]').click()
    cy.get('[data-test="frequency-option-X"]').invoke('text').then(text => {
      cy.get('[data-test="frequency-option-X"]').click()
      cy.get('.calibration-row .col-frequency').invoke('text').should('eq', text.trim())
    })

    // Status
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()
    cy.get('[data-test="filter-status"]').click()
    cy.get('[data-test="status-option-X"]').invoke('text').then(text => {
      cy.get('[data-test="status-option-X"]').click()
      cy.get('.calibration-row .col-status').invoke('text').should('eq', text.trim())
    })
  })

  // CT013.001 - Delete calibrations
  it('Should delete calibrations successfully', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()

    cy.get('[data-test="delete-btn-1"]').click()
    cy.get('[data-test="confirm-delete"]').click()

    cy.get('[data-test="delete-btn-2"]').click()
    cy.get('[data-test="confirm-delete"]').click()

    cy.get('[data-test="delete-btn-3"]').click()
    cy.get('[data-test="confirm-delete"]').click()

    cy.get('[data-test="delete-btn-4"]').click()
    cy.get('[data-test="confirm-delete"]').click()
  })

  it('Should confirm calibrations were deleted', () => {
    cy.visit('/app')
    cy.get('[data-test="nav-calibration"]').click()

    cy.get('.calibration-row:nth-child(2) .col-frequency').should('not.exist')
    cy.get('.calibration-row:nth-child(3) .col-frequency').should('not.exist')
    cy.get('.calibration-row:nth-child(4) .col-frequency').should('not.exist')
    cy.get('.calibration-row:nth-child(5) .col-frequency').should('not.exist')

    cy.get('.calibration-row:nth-child(2) .col-id').should('not.exist')
    cy.get('.calibration-row:nth-child(3) .col-id').should('not.exist')
    cy.get('.calibration-row:nth-child(4) .col-id').should('not.exist')
    cy.get('.calibration-row:nth-child(5) .col-id').should('not.exist')
  })
})
