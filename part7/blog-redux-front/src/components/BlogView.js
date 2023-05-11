const BlogView = ({ handleSumLikes, blog, user }) => {
  const handleLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    handleSumLikes(updatedBlog);
  };

  if (blog === undefined || user === undefined) {
    return null;
  }

  console.log(blog);

  return (
    <>
      <h2>{blog.title} </h2>
      <>
        <a href="#"> {blog.url} </a>
        <>
          <p>
            {" "}
            {blog.likes} likes
            <button onClick={handleLikes}>like blog</button>{" "}
          </p>
        </>
        <>
          {" "}
          <p>Created by: {blog.user.username} </p>{" "}
        </>
      </>
    </>
  );
};

export default BlogView;
