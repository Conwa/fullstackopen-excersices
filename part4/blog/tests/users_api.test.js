const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const blogUsers = helper.initialUsers.map((user) => new User(user));
  const promiseArray = blogUsers.map((user) => user.save());
  await Promise.all(promiseArray);
});

describe("get users", () => {
  test("check for initial users", async () => {
    const users = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const listOfUsers = await helper.initialUsers;
    const firstUser = listOfUsers[0];
    expect(users.body[0].name).toBe(firstUser.name);
  });
  describe("post users", () => {
    test("add user", async () => {
      const dummyUser = {
        username: "dummyUser",
        passwordHash: "12345",
        name: "dummyUser",
      };

      await api
        .post("/api/users")
        .send(dummyUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const listOfUsers = await helper.usersInServer();
      expect(listOfUsers).toHaveLength(helper.initialUsers.length + 1);
    });
    test("wrong user is not submitted", async () => {
      const dummyWrongUser = {
        username: "dummyWrongUser",
        passwordHash: "12",
        name: "dummyWrongUser",
      };

      await api
        .post("/api/users")
        .send(dummyWrongUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const listOfUsers = await helper.usersInServer();
      expect(listOfUsers).toHaveLength(helper.initialUsers.length);
    });
  });
});
