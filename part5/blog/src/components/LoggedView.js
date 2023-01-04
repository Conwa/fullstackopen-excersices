import CreateBlog from "./CreateBlog";
import Blog from "./Blog";

const LoggedView = (props) => {
  return (
    <>
      <h2>BLOGS</h2>
      <>
        <CreateBlog />
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
      </>
      {props.blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default LoggedView;
