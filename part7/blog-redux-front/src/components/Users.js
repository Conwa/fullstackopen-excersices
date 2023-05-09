import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const authors = useSelector((state) => state.authors);

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    border: "2px dotted black",
    marginTop: ".5rem",
    marginBottom: "1rem",
  };

  const authorDivStyle = {
    display: "flex",
    gap: ".5rem",
    justifyContent: "space-between",
  };

  const authorStyle = {
    color: "inherit",
  };

  return (
    <>
      <h2>Users</h2>
      <div style={boxStyle}>
        {authors.map((author) => (
          <div key={author.id} style={authorDivStyle}>
            <Link style={authorStyle}>
              {" "}
              <p>{author.username.toUpperCase()}:</p>
            </Link>
            <p> created {author.blogs.length} blogs</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
