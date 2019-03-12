import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

function accessRegistrationInterface() {
  // is /register the correct route?
  cy.visit('/register')
}

// OK
Given("^un utilisateur (?:ayant accédé|accède) au formulaire d'enregistrement$", function () {
  accessRegistrationInterface()
});

// OK
When("^un client inconnu entre son e-mail dans le formulaire d'enregistrement$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    .then(user => fillUserRegistrationGui(user.email))
});

// OK
When("^(?:il|qui a)?\s?accept(?:e|é) la politique relative aux cookies$", function () {
  // 1. check the cookies policy checkbox 
  return 'pending'
});

// OK
When("^les conditions générales d'utilisation$", function () {
  // 1. check the general conditions checkbox
  return 'pending'
});

// OK
When("^il n'accepte plus la politique relative aux cookies$", function () {
  // 1. uncheck the cookies policy checkbox
  return 'pending'
})

// OK
When("^il n'accepte plus les conditions générales$", function () {
  // 1. uncheck the general conditions checkbox
  return 'pending'
})

// OK
When("^fait la demande d'enregistrement$", function () {
  // 1. assert that the register button is enabled
  // 2. click the register button
  return 'pending'
});

// OK
When("^un utilisateur entre l'e-mail d'un compte actif dans le formulaire d'enregistrement$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/Consommateur')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    .then(user => fillUserRegistrationGui(user.email))
  // TODO: click the registration button
  return 'pending'
});

// OK
When("^un utilisateur entre l'e-mail d'un compte inactif dans le formulaire d'enregistrement$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulCustomerCreation')
  accessRegistrationInterface()
  cy.fixture('Authentication/Credentials/InactiveCustomer')
    // you need to provide the fillUserRegistrationGui
    // that method must not be in the common folder
    .then(user => fillUserRegistrationGui(user.email))
  // TODO: click the registration button
  return 'pending'
});

// OK
When("^(?:un|le) client (?:qui)?\s?(?:consulte|a consulté) son lien d'activation de compte$", function () {
  // TODO: visit /activate/uidb64/token <-- get from fixtures
  cy.visit('/activate/uidb64/token')
});

// TODO: refactor the following two steps so that they call the same function (they indeed write the password in the field)
// OK
When("^(?:qui a|il) tap(?:e|é) un mot de passe conforme dans le champ correspondant$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulAccountConfirmation')
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserPasswordGui
    // that method must be in the common folder, as the password can 
    // be reset in both frontend applications
    .then(user => fillUserPasswordGui(user.email))
  // TODO: click the set password button
})

// OK
When("^(?:il|qui a déjà) définit? un mot de passe conforme dans les temps$", function () {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/SuccessfulAccountConfirmation')
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserPasswordGui
    // that method must be in the common folder, as the password can 
    // be reset in both frontend applications
    .then(user => fillUserPasswordGui(user.email))
  // TODO: click the set password button
});

// OK
When("^il rend son mot de passe non conforme$", function () {
  // 1. empty password field
  return 'pending'
})

function newCustomerDefinesValidPasswordWhenLinkExpired() {
  injectResponseFixtureIfFaked('Authentication/RegisterCustomer/Responses/ExpiredAccountConfirmationLink')
  cy.fixture('Authentication/Credentials/NewCustomer')
    // you need to provide the fillUserPasswordGui
    // that method must be in the common folder, as the password can 
    // be reset in both frontend applications
    .then(user => fillUserPasswordGui(user.email))
  // TODO: click the set password button
}

When("^il définit un mot de passe conforme trop tard$", function () {
  newCustomerDefinesValidPasswordWhenLinkExpired()
});

When("^il définit un mot de passe conforme une deuxième fois$", function () {
  newCustomerDefinesValidPasswordWhenLinkExpired()
})

// OK
Then("^il peut consulter la politique relative aux cookies$", function () {
  // assert that the link to the cookies policy exists
  // assert that the link to the cookies policy is working
  return 'pending'
})

// OK
Then("^il peut consulter les conditions générales$", function () {
  // assert that the link to the general conditions exists
  // assert that the link to the general conditions is working
  return 'pending'
})

// TODO: possibly group the following two Then steps together
// OK
Then("^la création de compte est possible$", function () {
  // 1. assert that the registration button is enabled
  return 'pending'
});

// OK
Then("^la création de compte n'est plus possible$", function () {
  // 1. assert that the registration button is disabled
  return 'pending'
})

// OK
Then("^il obtient un message stipulant qu'un e-mail lui a été transmis$", function () {
  // if the graphql query was successful, then the frontend receives the SuccessfulCustomerCreation response, i.e. an answer with no data and no errors
  // upon clicking the registration button, you need to check that the message about the e-mail is displayed
  return 'pending'
});

// OK
Then("^il est redirigé vers une interface où il peut définir son mot de passe$", function () {
  // 1. assert that there is an input field for a password
  return 'pending'
});

// TODO: create a custom type parsing "désactivé" and "activé" which are interpreted as false and true respectively
// upon parsing, the following step can handle both cases
Then("^le bouton d'activation du compte est désactivé$", function () {
  // 1. assert that the form's send button is disabled / enabled
  return 'pending'
})

Then("^il obtient un message stipulant que l'activation du compte a été effectuée avec succès$", function () {
  // the graphql query returns the SuccessfulAccountConfirmation response, i.e. 
  // an answer with no data and no errors
  // TODO: upon clicking the set password button, you need to check that the corresponding message is displayed
  return 'pending'
});

Then("^il n'est pas identifié$", function () {
  // TODO: double-check that the session cookie doesn't contain any token
  return 'pending'
});

Then("^il obtient un message stipulant que le lien a expiré$", function () {
  // the graphql query returns the ExpiredAccountConfirmationLink response, i.e. 
  // an answer with the error "ACCOUNT_CONFIRMATION_LINK_EXPIRED"
  // you need to check that the corresponding error message is displayed
  return 'pending'
})