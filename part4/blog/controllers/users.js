const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  const allUsers = await User.find({});
  response.json(allUsers);
});

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //algorith provided by bcrypt to hash password, the bigger the
  //number the longer the hash process takes
  const saltRounds = 10;
  const passwordHashed = await bcrypt.hash(body.passwordHash, saltRounds);

  const user = new User({
    username: body.username,
    passwordHash: passwordHashed,
    name: body.name,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
