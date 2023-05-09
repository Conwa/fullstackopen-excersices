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

      return state.map((blog) =>
        blog.id !== targetBlog.id ? blog : targetBlog
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
    const blogs = await blogService.getAll();
    dispacth(setBlogs(blogs));
  };
};

export const createNewBlog = (blog) => {
  return async (dispacth) => {
    const blogToDataBase = await blogService.create(blog);
    dispacth(appendBlog(blogToDataBase));
  };
};

export const voteForBlog = (blog) => {
  return async (dispacth) => {
    const updatedBlog = await blogService.update(blog);
    dispacth(updateBlog(updatedBlog));
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
