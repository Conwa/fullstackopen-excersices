const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "638df0fad62ee5fc1524610d",
    title: "test",
    author: "author with most blogs",
    url: "sdfdsfs",
    likes: 12312,
    __v: 0,
  },
  {
    _id: "638df56af31ebbb12e6c1206",
    title: "test2",
    author: "author with most blogs",
    url: "sdfdsfs",
    likes: 12312,
    __v: 0,
  },
  {
    _id: "638dfa39b379b0a9fb796105",
    title: "test after formatting",
    author: "author with most blogs",
    url: "sdfdsfs",
    likes: 12312,
    __v: 0,
  },
  {
    _id: "638e6370d7c39670322dd98e",
    title: "test4",
    author: "author with most likes",
    url: "sdfdsfs",
    likes: 100000,
    __v: 0,
  },
  {
    _id: "638e6379d7c39670322dd990",
    title: "test5",
    author: "author with most likes",
    url: "sdfdsfs",
    likes: 300000,
    __v: 0,
  },
];

describe("most blogs", () => {
  test("no blogs returns undefined", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual(undefined);
  });
  test("given array, returns correct author and number of blogs", () => {
    const result = listHelper.mostBlogs(blogs);
  });
});
