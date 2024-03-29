import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import NoteForm from "./NoteForm";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createNote = jest.fn();

  render(<NoteForm createNote={createNote} />);

  const input = screen.getByRole("textbox");
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
