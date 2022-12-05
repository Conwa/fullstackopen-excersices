const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length !== 0) {
    return blogs.reduce((acc, el) => {
      return acc + el.likes;
    }, 0);
  }
  return 0;
};

const favouriteBlog = (blogs) => {
  if (blogs.length !== 0) {
    let biggestBlog = blogs.reduce((prev, el) => {
      return prev.likes > el.likes ? prev : el;
    });
    let { title, author, likes } = biggestBlog;
    return { title, author, likes };
  }
  return undefined;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
