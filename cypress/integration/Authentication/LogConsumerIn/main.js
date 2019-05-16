import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

import {
  connectWithUserCredentialsViaGui,
  getTokenDuration,
  getTokenCookie
} from '../../../../common/cypress/integration/Authentication/common/Helpers'
import '../../../../common/cypress/integration/Authentication/common/PersonaType'
import '../../../../common/cypress/integration/Authentication/common/SessionDurationType'
import TokenHandler from '../../../../common/cypress/integration/Authentication/common/TokenHandler'
// import { injectResponseFixtureIfFaked } from '../../../../common/cypress/integration/common/fakeServer'


Given('un consommateur non identifié', function () {
  getTokenCookie().should('not.exist')
});

function accessLoginInterface() {
  cy.visit('/login')
}

When('un consommateur s\'identifie avec un e-mail et un mot de passe invalides', function () {
  injectResponseFixtureIfFaked('Authentication/LogConsumerIn/Responses/WrongCredentials')
  accessLoginInterface()
  cy.fixture('Authentication/Credentials/NewConsumer')
    .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
});

When('un consommateur s\'identifie avec un e-mail valide et un mot de passe invalide', function () {
  injectResponseFixtureIfFaked('Authentication/LogConsumerIn/Responses/WrongCredentials')
  accessLoginInterface()
  cy.fixture(`Authentication/Credentials/Consommateur`)
    .then(user => connectWithUserCredentialsViaGui(user.email, user.password + 'a'))
});

When('un {PersonaType} s\'identifie avec un e-mail et un mot de passe valides', function (persona) {
  injectResponseFixtureIfFaked(`Authentication/LogConsumerIn/Responses/${persona}`)
  accessLoginInterface()
  cy.fixture(`Authentication/Credentials/${persona}`)
    .then(user => connectWithUserCredentialsViaGui(user.email, user.password))
});

Then('il obtient un message d\'erreur stipulant que ses identifiants sont incorrects', function () {
  cy.get('@graphql').then(() => {
    cy.get('.incorrectIdentifiers')
      .should('be.visible')
  })
});

Then('sa session s\'ouvre pour {SessionDurationType}', function (expectedDuration) {
  cy.get('@graphql').then(() => {
    const handler = new TokenHandler
    handler.getToken().then(token => {
      const tokenDuration = getTokenDuration(token)
      expect(tokenDuration.asSeconds()).to.equal(expectedDuration.asSeconds())
    })
  })
});