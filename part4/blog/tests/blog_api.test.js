const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");

//function to irrigate test-database
//with data

// beforeEach(async () => {
//     await
// })

//testing route connection worked
test("api call returns notes", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
