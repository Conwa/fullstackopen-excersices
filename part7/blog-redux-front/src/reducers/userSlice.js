/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "userInfo",
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    },
    deleteUser(state, action) {
      return (state = null);
    },
  },
});

export const isUserLoged = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedUser");

  const user = JSON.parse(loggedUserJSON);
  if (user !== null) {
    blogService.setToken(user.token);
  }

  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export const testLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(setUser(user));
    } catch (error) {
      const errorMsg = error.response.data.error;
      console.log(errorMsg);
    }
  };
};

export const exitLogin = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUser");
    dispatch(deleteUser());
  };
};

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
