import { Link } from "react-router-dom";

const User = ({ author }) => {
  if (author === undefined) {
    return null;
  }
  return (
    <div className="container mx-auto my-4 bg-indigo-300 px-6 py-2 rounded-lg">
      <h2 className="font-medium cursor-default text-xl">{author.name} </h2>
      <div className="px-5 py-2.5 font-medium bg-blue-50  rounded-lg text-sm my-4 w-1/3  max-w-sm">
        {author.blogs.length === 0 ? (
          <p>User has no blogs of his own!</p>
        ) : (
          <div>
            <h2 className="font-medium cursor-default text-lg mb-4 border-b-2 border-b-gray-500">
              Added Blogs:
            </h2>
            <ul>
              {" "}
              {author.blogs.map((el) => (
                <li
                  key={el.id}
                  className="w-full border-b-2 border-neutral-500 border-opacity-100 py-1 dark:border-opacity-50"
                >
                  <Link to={`/blogs/${el.id}`}>{el.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
