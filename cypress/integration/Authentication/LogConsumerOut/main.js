import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {
  login,
  navigateTo,
  getTokenCookie,
  checkIfLinkIsActive
} from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/common/PersonaType'
import types from '../../../../common/types'

// import '../common/PersonaType'

Given("un {PersonaType} connecté", function (persona) {
  login(persona)
})

When('il se déconnecte', function () {
  navigateTo(types.links.LOGOUT)
})

Then('sa session se ferme', function () {
  cy.wait(1000)
  getTokenCookie().should('not.exist')
})

Then("il est redirigé vers la page d'accueil", function () {
  checkIfLinkIsActive(types.links.HOME)
})
