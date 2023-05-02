const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (request, response, next) => {
  const allUsers = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(allUsers);
});

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //not recommended validation method, understand it afert re-reading
  //exsercise requirements
  /*if (body.username === undefined || body.username === "") {
    return response.status(400).json({ error: "username must be provided" });
  } else if (body.passwordHash === undefined || body.passwordHash === "") {
    return response.status(400).json({ error: "password must be provided" });
  }*/

  if (body.passwordHash.length <= 3) {
    return response.status(400).json({
      error: `password length should be greather than 3 characters, current length: ${body.passwordHash.length}`,
    });
  }

  //algorith provided by bcrypt to hash password, the bigger the
  //number the longer the hash process takes
  const saltRounds = 10;
  const passwordHashed = await bcrypt.hash(body.passwordHash, saltRounds);

  const user = new User({
    username: body.username,
    passwordHash: passwordHashed,
    name: body.name,
  });

  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
