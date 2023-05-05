/* eslint-disable no-unused-vars */
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
    updateBlog(state, action) {
      const targetBlog = action.payload;

      const blogToChange = state.find((el) => el.id === targetBlog.id);

      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };

      return state.map((blog) =>
        blog.id !== targetBlog.id ? blog : changedBlog
      );
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload;
      return state.filter((el) => el.id !== blogToDelete.id);
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

export const voteForBlog = (id) => {
  return async (dispacth) => {
    const updatedBlog = await blogService.update(id);
    dispacth(updateBlog(id));
  };
};

export const deleteTargetBlog = (blog) => {
  return async (dispacth) => {
    const deletedBlog = await blogService.deletion(blog);
    dispacth(deleteBlog(blog));
  };
};

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
