const User = ({ author }) => {
  if (author === undefined) {
    return null;
  }
  return (
    <>
      <h2>{author.name} </h2>
      <>
        {author.blogs.length === 0 ? (
          <p style={{ fontWeight: "bold" }}>User has no blogs of his own!</p>
        ) : (
          <div>
            <p style={{ fontWeight: "bold" }}>Added Blogs:</p>
            <ul>
              {" "}
              {author.blogs.map((el) => (
                <li key={el.id}> {el.title} </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </>
  );
};

export default User;
