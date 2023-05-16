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

  const dispacth = useDispatch();
  const authors = useSelector((state) => state.authors);

  const reduxStoreUser = useSelector((state) => state.userInfo);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    const user = JSON.parse(loggedUserJSON);

    provideUser(user);
    dispacth(isUserLoged());
  }, [dispacth]);

  useEffect(() => {
    provideUser(reduxStoreUser);
  }, [useSelector((state) => state.userInfo)]);

  const handleLogin = (event) => {
    event.preventDefault();
    dispacth(testLogin(username, password));

    setUsername("");
    setPassword("");
  };

  const handleSumLikes = (blogObject) => {
    dispacth(voteForBlog(blogObject));
  };

  const handleDelete = (blogObject) => {
    const message = `Delete ${blogObject.title} by ${blogObject.author}?`;

    if (window.confirm(message)) {
      dispacth(deleteTargetBlog(blogObject));
    }
  };

  return (
    <div className="bg-lime-100 max-w-full h-full">
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
