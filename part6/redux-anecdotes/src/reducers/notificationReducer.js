import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { value: "" },
  reducers: {
    newAnecdoteNotification: (state, action) => {
      state.value = `blog ${action.payload} was created`;
    },
    voteAnecdoteNotification: (state, action) => {
      state.value = `you voted ${action.payload} blog`;
    },
    deleteNotification: (state, action) => {
      state.value = "";
    },
  },
});

export const {
  newAnecdoteNotification,
  voteAnecdoteNotification,
  deleteNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
