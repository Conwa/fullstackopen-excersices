import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const authors = useSelector((state) => state.authors);

  return (
    <div className="container mx-auto my-4 bg-indigo-300 px-6 py-2 rounded-lg">
      <div className="flex flex-col py-2 gap-2">
        <h2 className=" font-medium cursor-default text-xl">Users Profiles</h2>

        <table className="table-auto py-2.5 font-medium bg-blue-50  rounded-lg text-base w-1/3  max-w-sm">
          <thead className="border-b-2 border-b-gray-500 divide-x-2 divide-stone-950">
            <tr>
              <th className="w-1/2">User</th>
              <th className="w-1/2">Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td className="w-1/2 text-center">
                  <Link to={`/users/${author.id}`} className="w-1/2">
                    {author.username.toUpperCase()}
                  </Link>
                </td>
                <td className="w-1/2 text-center">{author.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
