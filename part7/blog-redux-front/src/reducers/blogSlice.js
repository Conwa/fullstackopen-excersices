import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispacth) => {
    const anecdotes = await blogService.getAll();
    dispacth(setBlogs(anecdotes));
  };
};

export const createNewBlog = (blog) => {
  return async (dispacth) => {
    const blogToDataBase = await blogService.create(blog);
    dispacth(appendBlog(blogToDataBase));
  };
};

// export const voteForAnecdote = (id) => {
//   return async (dispacth) => {
//     const updatedAnecdote = await blogService.vote(id);
//     dispacth(voteAnecdote(id));
//   };
// };

export const { setBlogs, appendBlog } = blogSlice.actions;

export default blogSlice.reducer;
