import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";

import Blog from "./Blog";

describe("<Blog/>", () => {
  let container;

  beforeEach(() => {
    const blog = {
      url: "use conditional rendering in the class",
      title: "test green message",
      author: "hope it works",
      user: "{id: '6398c7bb8a962cdb05fe176e', name: 'Conrado', u…}",
      likes: 1,
      id: "63b8977afd3eab643e79c0c8",
    };
    container = render(<Blog blog={blog} user={blog.user} />).container;
  });

  test("renders minimized content", () => {
    const element = screen.getByText("test green message", { exact: false });
    expect(element).toBeDefined();

    //first try of searching by className
    const minifiedVersion = container.querySelector(".minifiedVersion");
    const maxifiedVersion = document.querySelector(".maxifiedVersion");

    expect(minifiedVersion).not.toBeNull();
    expect(maxifiedVersion).toBeNull();

    //alternate practice method of testing via the search of a class
    expect(element).toHaveClass("minifiedVersion");
  });

  test("change of class after user click", () => {});
});
