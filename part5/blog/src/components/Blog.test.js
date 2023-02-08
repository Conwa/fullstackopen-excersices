import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";

import Blog from "./Blog";

test("renders minimized content", () => {
  const blog = {
    url: "use conditional rendering in the class",
    title: "test green message",
    author: "hope it works",
    user: "{id: '6398c7bb8a962cdb05fe176e', name: 'Conrado', u…}",
    likes: 1,
    id: "63b8977afd3eab643e79c0c8",
  };

  render(<Blog blog={blog} user={blog.user} />);

  const element = screen.getByText("test green message", { exact: false });
  expect(element).toBeDefined();
});
