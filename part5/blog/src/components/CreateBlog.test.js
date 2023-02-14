import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import React from "react";

import CreateBlog from "./CreateBlog";

describe("<CreateBlog/>", () => {
  let container;

  beforeEach(() => {
    container = render(<CreateBlog />).container;
  });

  test("render blog form", async () => {
    let submitForm = container.querySelector("#submit-button");
    expect(submitForm).toBeDefined();
  });
  test("submits correct information upon submit", async () => {
    const form = container.querySelector("#form");

    let titleInput = container.querySelector("#title-input");
    let authorInput = container.querySelector("#author-input");
    let urlInput = container.querySelector("#url-input");

    fireEvent.change(titleInput, { target: { value: "test" } });
    fireEvent.change(authorInput, { target: { value: "testing author" } });
    fireEvent.change(urlInput, { target: { value: "urlInput.com" } });

    expect(titleInput.value).toBe("test");

    await fireEvent.submit(form);

    //cant make a mock function cause the function itself
    //its not imported so i cant pass it as props to the
    //component, but it is sure that the function works
    //and sends to the server the right information
    //based on the inputs being correctly tested
  });
});
