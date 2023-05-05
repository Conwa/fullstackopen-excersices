import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";

import { useSelector } from "react-redux";

const LoggedView = (props) => {
  const blogs = useSelector((state) => state.blog);

  console.log("it repaints");

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
          <CreateBlog />
        </Togglable>
      </>
      {[...blogs]
        .sort((prevBlog, nextBlog) => nextBlog.likes - prevBlog.likes)
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
