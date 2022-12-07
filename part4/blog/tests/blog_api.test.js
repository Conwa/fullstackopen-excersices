const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
//function to irrigate test-database
//with data, copy of the example given
//in the notes app

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

//testing route connection worked
test("api call returns notes", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

//test for recieving exact number of blogs
test("length of the blogs database", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

//testing try adding new blog post
describe("post", () => {
  test("can add posts", async () => {
    const dummyBlog = { author: "dummy", likes: 1, title: "dummyBlog test" };
    await api
      .post("/api/blogs")
      .send(dummyBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInServer();
    const blogsTitles = blogs.map((blog) => blog.title);
    expect(blogsTitles).toContain("dummyBlog test");
  }, 100000);
  test("likes undefined equals to 0", async () => {
    const dummyBlog = {
      author: "dummy",
      title: "dummyBlog test with no likes",
    };

    await api
      .post("/api/blogs")
      .send(dummyBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const allBlogs = await helper.blogsInServer();
    const targetBlog = await allBlogs.filter(
      (blog) => blog.title === "dummyBlog test with no likes"
    );
    expect(targetBlog[0].likes).toBe(0);
  });
});
