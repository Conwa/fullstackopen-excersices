const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const newBlog = new Blog(request.body);
  // const formatedBlog = new Blog({
  //   author: newBlog.author,
  //   likes: newBlog.likes,
  //   title: newBlog.title,
  // });
  const returnBlog = await newBlog.save();
  response.status(201).json(returnBlog);
});

module.exports = blogsRouter;
