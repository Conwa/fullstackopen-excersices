import { configureStore } from "@reduxjs/toolkit";

import blogSlice from "./reducers/blogSlice";
import notificationSlice from "./reducers/notificationSlice";

const store = configureStore({
  reducer: { notificationValue: notificationSlice, blog: blogSlice },
});

export default store;
