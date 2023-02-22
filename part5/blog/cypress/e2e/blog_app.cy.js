describe("Blog App", () => {
  beforeEach(function () {
    cy.visit("");
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // const user = {
    //   name: "Matti Luukkainen",
    //   username: "mluukkai",
    //   password: "salainen",
    // };
    // cy.request("POST", "http://localhost:3001/api/users/", user);
  });

  it("shows login by default", function () {
    cy.contains("login to application");
  });
});
