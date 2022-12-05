const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [
    {
      _id: "638df0fad62ee5fc1524610d",
      title: "test",
      author: "juan",
      url: "sdfdsfs",
      likes: 12312,
      __v: 0,
    },
  ];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
