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
});
