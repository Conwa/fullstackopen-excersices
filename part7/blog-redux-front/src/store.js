import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./reducers/notificationSlice";

const store = configureStore({
  reducer: { notificationValue: notificationSlice },
});

export default store;
