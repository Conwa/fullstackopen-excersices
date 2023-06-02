/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoggedView from "./components/LoggedView";
import LoginView from "./components/LoginView";

import { deleteTargetBlog, voteForBlog } from "./reducers/blogSlice";
import { isUserLoged, testLogin } from "./reducers/userSlice";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, provideUser] = useState(null);

  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors);

  const reduxStoreUser = useSelector((state) => state.userInfo);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    const localStorageUser = JSON.parse(loggedUserJSON);

    provideUser(localStorageUser);
    dispatch(isUserLoged());
  }, [dispatch]);

  useEffect(() => {
    provideUser(reduxStoreUser);
  }, [useSelector((state) => state.userInfo)]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(testLogin(username, password));

    setUsername("");
    setPassword("");
  };

  const handleSumLikes = (blogObject) => {
    dispatch(voteForBlog(blogObject));
  };

  const handleDelete = (blogObject) => {
    const message = `Delete ${blogObject.title} by ${blogObject.author}?`;

    if (window.confirm(message)) {
      dispatch(deleteTargetBlog(blogObject));
    }
  };

  return (
    <div className="bg-lime-100 w-full min-h-screen overflow-x-hidden">
      {user === null ? (
        <LoginView
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <LoggedView
          user={user}
          handleSumLikes={handleSumLikes}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
