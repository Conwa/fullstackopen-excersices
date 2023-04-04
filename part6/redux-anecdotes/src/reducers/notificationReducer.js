import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { value: "" },
  reducers: {
    // newAnecdoteNotification: (state, action) => {
    //   state.value = `blog ${action.payload} was created`;
    // },
    // voteAnecdoteNotification: (state, action) => {
    //   state.value = `you voted ${action.payload} blog`;
    // },
    setNotification: (state, action) => {
      state.value = action.payload;
    },
    deleteNotification: (state, action) => {
      state.value = "";
    },
  },
});

export const newNotification = (text, timer = 5000) => {
  return async (dispatch) => {
    dispatch(setNotification(text));

    setTimeout(() => {
      dispatch(deleteNotification());
    }, timer);
  };
};

export const { setNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
