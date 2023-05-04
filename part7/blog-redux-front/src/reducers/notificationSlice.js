import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
