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

  it("shows loginView by default", function () {
    cy.contains("login to application");
  });

  describe("Login function", function () {
    it("logs in with correct credentials", function () {
      cy.get("#username-input").type("rootUser");
      cy.get("#password-input").type("12345");
      cy.get("#login-button").click();

      cy.contains("Conrado Del Carlo logged in");
    });
    it("fails to enter with wrong credentials", function () {
      cy.get("#username-input").type("wrongUser");
      cy.get("#password-input").type("123456");
      cy.get("#login-button").click();

      cy.contains("Conrado Del Carlo logged in").should("not.exist");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username-input").type("rootUser");
      cy.get("#password-input").type("12345");
      cy.get("#login-button").click();
    });

    it("a blog can be created", function () {
      //just testing capabilities of the .contains method
      const message = "cypress test blog";

      cy.get("#button-blog-creator").click();
      cy.get("#title-input").type(`${message}`);
      cy.get("#author-input").type("cypress author");
      cy.get("#url-input").type("testurl.com");
      cy.get("#submit-button").click();

      cy.get("#notification-message").contains(
        `a new blog "${message}" was succesfully added`
      );

      //this solves problem where the person that created the blog
      //cant delete it right away althought its the owner, when the page is reloaded
      //it resolves
      // cy.visit("");
    });
  });
});
