import { createSlice } from "@reduxjs/toolkit";

import authorsService from "../services/authors";

const blogAuthorsSlice = createSlice({
  name: "authors",
  initialState: [],
  reducers: {
    setAuthors(state, action) {
      return action.payload;
    },
  },
});

export const initalizeAuthors = () => {
  return async (dispacth) => {
    const anecdotes = await authorsService.getAll();
    dispacth(setAuthors(anecdotes));
  };
};

export const { setAuthors } = blogAuthorsSlice.actions;

export default blogAuthorsSlice.reducer;
