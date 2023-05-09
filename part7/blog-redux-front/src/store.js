import { configureStore } from "@reduxjs/toolkit";

import blogAuthorsSlice from "./reducers/blogAuthorsSlice";
import blogSlice from "./reducers/blogSlice";
import notificationSlice from "./reducers/notificationSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    notificationValue: notificationSlice,
    blogs: blogSlice,
    userInfo: userSlice,
    authors: blogAuthorsSlice,
  },
});

export default store;
