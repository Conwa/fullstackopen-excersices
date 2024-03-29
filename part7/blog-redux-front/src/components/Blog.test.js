import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Blog from "./Blog";

describe("<Blog/>", () => {
  let container;
  const blog = {
    url: "use conditional rendering in the class",
    title: "test green message",
    author: "hope it works",
    user: "{id: '6398c7bb8a962cdb05fe176e', name: 'Conrado', u…}",
    likes: 1,
    id: "63b8977afd3eab643e79c0c8",
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        user={blog.user}
        handleDelete={mockHandler}
        handleSumLikes={mockHandler}
      />
    ).container;
  });

  test("renders minimized content", () => {
    const element = screen.getByText("test green message", {
      exact: false,
    });
    expect(element).toBeDefined();

    //first try of searching by className
    const minifiedVersion = container.querySelector(".minifiedVersion");
    const maxifiedVersion = container.querySelector(".maxifiedVersion");

    expect(minifiedVersion).not.toBeNull();
    expect(maxifiedVersion).toBeNull();

    //alternate practice method of testing via the search of a class
    expect(element).toHaveClass("minifiedVersion");
  });

  test("change of class after user click", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show details");

    const element = screen.getByText("test green message", {
      exact: false,
    });
    expect(element).toBeDefined();

    expect(element).toHaveClass("minifiedVersion");

    await user.click(button);

    expect(element).toHaveClass("maxifiedVersion");

    //screen.debug(element);
  });

  test("two click means two more likes", async () => {
    const user = userEvent.setup();

    const detailsButton = screen.getByText("show details");
    await user.click(detailsButton);

    const likesButton = screen.getByText("increase likes", { exact: false });
    await user.click(likesButton);
    await user.click(likesButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
