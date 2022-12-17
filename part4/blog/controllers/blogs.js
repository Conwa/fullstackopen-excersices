const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const userList = await User.find({});
  const firstUser = userList[0];

  const userToken = request.token;

  console.log(userToken);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: firstUser._id,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const returnBlog = await blog.save();

    firstUser.blogs = firstUser.blogs.concat(returnBlog._id);
    await firstUser.save();

    response.status(201).json(returnBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  let _id = request.params.id;
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(_id, blog, {
      new: true,
    });
    response.json(updatedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
