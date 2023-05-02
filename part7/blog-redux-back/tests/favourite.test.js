const listHelper = require("../utils/list_helper");

describe("most liked:", () => {
  const blogs = [
    {
      _id: "638df0fad62ee5fc1524610d",
      title: "test",
      author: "juan",
      url: "sdfdsfs",
      likes: 12312,
      __v: 0,
    },
    {
      _id: "638df56af31ebbb12e6c1206",
      title: "test2",
      author: "juan",
      url: "sdfdsfs",
      likes: 12312,
      __v: 0,
    },
    {
      _id: "638dfa39b379b0a9fb796105",
      title: "test after formatting",
      author: "juan",
      url: "sdfdsfs",
      likes: 12312,
      __v: 0,
    },
    {
      _id: "638e6370d7c39670322dd98e",
      title: "test4",
      author: "juan",
      url: "sdfdsfs",
      likes: 15100,
      __v: 0,
    },
    {
      _id: "638e6379d7c39670322dd990",
      title: "test5",
      author: "juan",
      url: "sdfdsfs",
      likes: 18000,
      __v: 0,
    },
  ];

  test("no blogs returns undefined", () => {
    const result = listHelper.favouriteBlog([]);
    expect(result).toEqual(undefined);
  });

  test("many blogs returns the most liked", () => {
    const result = listHelper.favouriteBlog(blogs);
    expect(result).toEqual({ author: "juan", likes: 18000, title: "test5" });
  });
});
