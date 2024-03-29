import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore(
  {
    reducer: {
      anecdote: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

//PREVIOUS IMPLEMENTATION

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
