import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

import { useSelector } from "react-redux";

const LoggedView = (props) => {
  const reduxBlogs = useSelector((state) => state.blog);

  console.log(reduxBlogs);

  return (
    <>
      <h2>BLOGS</h2>
      <>
        <h3>{props.user.name} logged in</h3>
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedUser");
            //setUser to trigger useEffect hook
            props.setUser(null);
          }}
        >
          log out
        </button>
        <Togglable buttonLabel="Open Blog Creator">
          {" "}
          <CreateBlog
            user={props.user}
            setBlogs={props.setBlogs}
            blogs={props.blogs}
          />
        </Togglable>
      </>
      {[...reduxBlogs]
        .sort((prevBlog, blog) => console.log(prevBlog.likes, blog.likes))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleSumLikes={props.handleSumLikes}
            handleDelete={props.handleDelete}
            user={props.user}
          />
        ))}
    </>
  );
};

export default LoggedView;
