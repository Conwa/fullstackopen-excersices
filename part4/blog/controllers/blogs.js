const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const newBlog = request.body;

  const formatedBlog = new Blog({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes || 0,
  });
  const returnBlog = await formatedBlog.save();
  response.status(201).json(returnBlog);
});

module.exports = blogsRouter;
