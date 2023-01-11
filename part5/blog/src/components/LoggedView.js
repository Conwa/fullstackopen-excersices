import CreateBlog from "./CreateBlog";
import Blog from "./Blog";
import Togglable from "./Togglable";

const LoggedView = (props) => {
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
      {props.blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default LoggedView;
