describe("Blog App", () => {
  beforeEach(function () {
    cy.visit("");
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Conrado Del Carlo",
      username: "rootUser",
      passwordHash: "12345",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
  });

  it("shows login by default", function () {
    cy.contains("login to application");
  });
  it("fails on wrong credentials", function () {
    cy.get("#username-input").type("rootUser");
    cy.get("#password-input").type("12345");
    cy.get("#login-button").click();

    cy.contains("Conrado Del Carlo logged in");
  });
});

//Hacer que salga cartel para cuando el login no es correcto
