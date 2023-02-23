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
      //tryed the not user method
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "rootUser",
        password: "12345",
      }).then((response) => {
        localStorage.setItem("loggedUser", JSON.stringify(response.body));
        cy.visit("");
      });
    });

    it("a blog can be created", function () {
      //just testing capabilities of the .contains method
      const message = "cypress test blog";

      cy.get("#button-blog-creator").click();
      cy.get("#title-input").type(`${message}`);
      cy.get("#author-input").type("cypress author");
      cy.get("#url-input").type("testurl.com");
      cy.get("#submit-button").click();

      cy.contains("show details").click();

      cy.get("#notification-message").contains(
        `a new blog "${message}" was succesfully added`
      );
    });

    it("blog created can then be liked", function () {
      cy.createBlog({
        title: "test",
        author: "testAuthor",
        likes: "2",
        url: "testurl.com",
      });

      cy.contains("show details").click();
      cy.contains("increase likes").click();
      cy.contains("Likes: 1");
    });

    it("blog owner can delete blog", function () {
      cy.createBlog({
        title: "blog to delete",
        author: "testAuthor",
        url: "testurl.com",
      });

      cy.contains("show details").click();
      cy.contains("remove blog").click();

      cy.contains("blog to delete").should("not.exist");
    });

    describe.only("when there are multiple blogs", function () {
      it("orders them by most likes first", function () {
        cy.createBlog({
          title: "blog1",
          author: "testAuthor",
          likes: "1",
          url: "testurl.com",
        });
        cy.createBlog({
          title: "blog2",
          author: "testAuthor",
          likes: "2",
          url: "testurl.com",
        });

        cy.get(".blog").eq(0).contains("show details").click();
        cy.get(".blog").eq(0).should("contain", "Likes: 2");

        cy.get(".blog").eq(1).contains("show details").click();
        cy.get(".blog").eq(1).should("contain", "Likes: 1");
      });
    });
  });
});
