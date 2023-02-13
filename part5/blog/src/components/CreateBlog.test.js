import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import CreateBlog from "./CreateBlog";

describe("<CreateBlog/>", () => {
  let container;

  const mockHandler = jest.fn();

  beforeEach(() => {
    container = render(<CreateBlog onSubmit={mockHandler} />).container;
  });

  test("render blog form", async () => {
    let user = userEvent.setup();

    let submitForm = screen.getByText("submit blog", { exact: false });

    let titleInput = container.querySelector("#title-input");
    let authorInput = container.querySelector("#author-input");
    let urlInput = container.querySelector("#url-input");

    screen.debug(titleInput);
    fireEvent.change(titleInput, { target: { value: "test" } });
    fireEvent.change(authorInput, { target: { value: "testing author" } });
    fireEvent.change(urlInput, { target: { value: "urlInput.com" } });

    // fireEvent.submit(submitForm);

    console.log(authorInput.value);
  });
});
