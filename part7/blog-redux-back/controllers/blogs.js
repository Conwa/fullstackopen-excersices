const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const { request, response } = require("express");

//give parameter request, it checks for bearer method of authentication
//then, it just return the string given from position 7 to complete, to eliminate
//the bearer and the whitespace, so you get the clean token sended in the request

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.substring(7);
//   }
//   return null;
// };

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  let _id = request.params.id;
  const blog = await Blog.findById(_id);
  response.json(blog);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  // const userList = await User.find({});
  // const firstUser = userList[0];

  // console.log(request.token);

  // const token = request.token;

  // const decodedToken = jwt.verify(token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token missing or invalid" });
  // }
  // const user = await User.findById(decodedToken.id);

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const returnBlog = await blog.save();

    user.blogs = user.blogs.concat(returnBlog._id);
    await user.save();

    response.status(201).json(returnBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  // const token = request.token;

  // const decodedToken = jwt.verify(token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: "token missing or invalid" });
  // }

  const blog = await Blog.findById(request.params.id);
  // const user = await User.findById(decodedToken.id);

  const user = request.user;

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: "id's not matching" });
  }

  //needed to erase empty blogs references before the introduction of
  //the filter method
  // user.blogs.splice(0);

  user.blogs = user.blogs.filter((el) => el.toString() !== blog.id.toString());

  // console.log(user.blogs);

  try {
    await Blog.findByIdAndRemove(blog);
    await user.save();
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
