const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const blog = require("../models/blog");
//function to irrigate test-database
//with data, copy of the example given
//in the notes app

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

//route connection working and returning correct
//number of blogs
describe("get blogs", () => {
  test("api call returns notes", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("length of the blogs database", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("blogs have id property", async () => {
    const response = await api.get("/api/blogs");
    const IDs = response.body.map((blog) => blog.id);

    expect(IDs).toBeDefined();
  });
});

//testing adittion of new blogs according
//to exersice requirements
describe("post blogs", () => {
  test("can add posts", async () => {
    const dummyBlog = {
      title: "dummyBlog test",
      author: "dummy",
      url: "test.com",
      likes: 1,
    };
    await api
      .post("/api/blogs")
      .send(dummyBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInServer();
    const blogsTitles = blogs.map((blog) => blog.title);
    expect(blogsTitles).toContain("dummyBlog test");
  }, 100000);

  test("likes that are undefined equals to 0", async () => {
    const dummyBlog = {
      title: "dummyBlog test with no likes",
      author: "dummy",
      url: "test.com",
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

  test("url or title undefined returns to 400 Bad Request", async () => {
    const interchangeableDummy1 = {
      author: "dummy",
      url: "test.com",
      likes: 1,
    };
    const interchangeableDummy2 = {
      title: "dummyBlog test",
      author: "dummy",
      likes: 1,
    };

    await api.post("/api/blogs").send(interchangeableDummy1).expect(400);

    const blogsUnmodified = await helper.blogsInServer();
    expect(blogsUnmodified).toHaveLength(helper.initialBlogs.length);
  });
});

describe("delete blogs", () => {
  test("post and delete blog", async () => {
    const dummyDeleteBlog = {
      title: "dummyDeleteBlog test",
      author: "dummy",
      url: "test.com",
      likes: 1,
    };

    const postedBLog = await api
      .post("/api/blogs")
      .send(dummyDeleteBlog)
      .expect(201);
    const blogID = postedBLog.body.id;

    await api.delete(`/api/blogs/${blogID}`).expect(204);

    const blogsUnmodified = await helper.blogsInServer();
    expect(blogsUnmodified).toHaveLength(helper.initialBlogs.length);
  });
  test("incorrect or non matching ID result in 400", async () => {
    const dummyDeleteBlog = {
      title: "dummyDeleteBlog test",
      author: "dummy",
      url: "test.com",
      likes: 1,
    };

    const postedBLog = await api
      .post("/api/blogs")
      .send(dummyDeleteBlog)
      .expect(201);
    const fakeID = postedBLog.body.id.concat("a");

    await api.delete(`/api/blogs/${fakeID}`).expect(400);

    const blogsUnmodified = await helper.blogsInServer();
    expect(blogsUnmodified).toHaveLength(helper.initialBlogs.length + 1);
  });
});

describe("update blogs", () => {
  test("post and update blog", async () => {
    const dummyUpdateBlog = {
      title: "dummyUpdateBlog test",
      author: "dummy",
      url: "test.com",
      likes: 1,
    };
    const dummyUpdatedBlog = {
      title: "dummyUpdateBlog test",
      author: "dummy",
      url: "test.com",
      likes: 12,
    };

    await api.post("/api/blogs").send(dummyUpdateBlog).expect(201);

    const blogs = await helper.blogsInServer();
    const blogToBeUpdated = blogs.find(
      (blog) => blog.title === "dummyUpdateBlog test"
    );
    expect(blogToBeUpdated.likes).toBe(1);

    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(dummyUpdatedBlog)
      .expect(200);

    const blogIsUpdated = blogs.find(
      (blog) => blog.title === "dummyUpdateBlog test"
    );
    expect(blogIsUpdated).toBe(12);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
