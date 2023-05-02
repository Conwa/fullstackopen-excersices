const listHelper = require("../utils/list_helper");

describe("cases:", () => {
  const oneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

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

  test("if empty it returns 0", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("only one blog", () => {
    const result = listHelper.totalLikes(oneBlog);
    expect(result).toBe(5);
  });
  test("else it sum total likes", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(70036);
  });
});
